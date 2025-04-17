
import React, { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { AuthContext } from './AuthContext';
import { checkProfileStatus } from './utils';
import { SignInCredentials, SignUpCredentials, SignInResponse, SignUpResponse } from './types';
import { AccountType } from '@/components/auth/types';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [accountType, setAccountType] = useState<AccountType | null>(null);

  useEffect(() => {
    console.log('[AuthProvider] Setting up auth state listener...');
    
    // Set up listener for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('[AuthProvider] Auth state changed:', event, currentSession?.user?.id);
        
        // Update session and user state
        setSession(currentSession);
        const currentUser = currentSession?.user ?? null;
        setUser(currentUser);
        
        // Check profile completion status when user authenticates
        if (currentUser) {
          try {
            // Check if profile exists in the profiles table
            const { data: profile, error } = await supabase
              .from('profiles')
              .select('account_type')
              .eq('id', currentUser.id)
              .single();
            
            if (error) {
              console.error('[AuthProvider] Error fetching profile:', error);
              // Don't set loading to false here as we'll try metadata as fallback
            } else {
              console.log('[AuthProvider] Profile data from DB:', profile);
              // If we have a profile in the DB, use that account type
              if (profile && profile.account_type) {
                setAccountType(profile.account_type as AccountType);
                setProfileCompleted(true);
              }
            }
            
            // As a fallback, check user metadata
            const userType = currentUser.user_metadata?.accountType as AccountType | undefined;
            console.log('[AuthProvider] Account type from metadata:', userType, currentUser.user_metadata);
            
            // Only use metadata if we didn't get a valid account type from the profile table
            if ((!profile || !profile.account_type) && userType) {
              setAccountType(userType);
              
              // If account type exists but no profile info, check if profile is completed
              const isCompleted = await checkProfileStatus(currentUser.id);
              setProfileCompleted(isCompleted);
            }
          } catch (error) {
            console.error('[AuthProvider] Error checking profile status:', error);
          }
        } else {
          // Reset states when logged out
          setProfileCompleted(false);
          setAccountType(null);
        }
        
        // Always finish by setting loading to false
        setLoading(false);
      }
    );

    // Check for existing session on app load
    const checkExistingSession = async () => {
      try {
        console.log('[AuthProvider] Checking for existing session...');
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        console.log('[AuthProvider] Retrieved session on load:', currentSession?.user?.id);
        
        if (currentSession?.user) {
          setSession(currentSession);
          setUser(currentSession.user);
          
          try {
            // Check if profile exists in the profiles table
            const { data: profile, error } = await supabase
              .from('profiles')
              .select('account_type, profile_completed')
              .eq('id', currentSession.user.id)
              .single();
            
            if (error) {
              console.error('[AuthProvider] Error fetching profile on session load:', error);
            } else {
              console.log('[AuthProvider] Profile data from DB on load:', profile);
              // If we have a profile in the DB, use that account type
              if (profile && profile.account_type) {
                setAccountType(profile.account_type as AccountType);
                setProfileCompleted(profile.profile_completed || false);
              }
            }
            
            // As a fallback, check user metadata
            const userType = currentSession.user.user_metadata?.accountType as AccountType | undefined;
            console.log('[AuthProvider] Account type from metadata on load:', userType, currentSession.user.user_metadata);
            
            // Only use metadata if we didn't get a valid account type from the profile table
            if ((!profile || !profile.account_type) && userType) {
              setAccountType(userType);
              
              // Check profile completion status
              const isCompleted = await checkProfileStatus(currentSession.user.id);
              setProfileCompleted(isCompleted);
            }
          } catch (error) {
            console.error('[AuthProvider] Error checking profile status on load:', error);
          }
        }
      } catch (error) {
        console.error('[AuthProvider] Error getting session:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkExistingSession();

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async ({ email, password }: SignInCredentials): Promise<SignInResponse> => {
    try {
      console.log('[AuthProvider] Signing in with:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('[AuthProvider] Sign in error:', error);
        return { error: error };
      }
      
      console.log('[AuthProvider] Sign in successful:', data.user?.id, 'Session:', data.session?.access_token ? 'Valid' : 'Invalid');
      
      // We don't need to manually set the user/session here as the onAuthStateChange handler will do it
      return { error: null };
    } catch (error: any) {
      console.error('[AuthProvider] Sign in exception:', error);
      return { error: { message: error.message } };
    }
  };

  const signUp = async ({ email, password, firstName, lastName, accountType }: SignUpCredentials): Promise<SignUpResponse> => {
    try {
      console.log('[AuthProvider] Signing up with:', email, 'account type:', accountType);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            firstName,
            lastName,
            accountType
          }
        }
      });
      
      if (error) throw error;

      console.log('[AuthProvider] Sign up successful:', data);

      // Show helpful information about email verification
      toast.info(
        "We've sent a verification email. Please check your inbox and click the link to verify your account.", 
        { duration: 8000 }
      );
      
      return { error: null };
    } catch (error: any) {
      console.error('[AuthProvider] Sign up error:', error);
      return { error: { message: error.message } };
    }
  };
  
  const signOut = async (): Promise<void> => {
    try {
      console.log('[AuthProvider] Signing out...');
      
      // First, clear all local state
      setUser(null);
      setSession(null);
      setProfileCompleted(false);
      setAccountType(null);
      
      // Then, call Supabase to sign out and clear auth data from storage
      const { error } = await supabase.auth.signOut({
        scope: 'global' // This ensures all devices are signed out
      });
      
      if (error) {
        throw error;
      }
      
      console.log('[AuthProvider] Sign out successful - all state reset');
    } catch (error: any) {
      console.error('[AuthProvider] Error signing out:', error);
      toast.error('Failed to sign out: ' + error.message);
      throw error; // Re-throw to let components handle it
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      signIn, 
      signUp, 
      signOut, 
      loading,
      profileCompleted,
      accountType
    }}>
      {children}
    </AuthContext.Provider>
  );
};
