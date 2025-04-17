import React, { useState, useEffect, useCallback } from 'react';
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
  const [initAttempts, setInitAttempts] = useState(0);

  // Function to fetch and set account information
  const fetchAccountInfo = useCallback(async (userId: string) => {
    console.log('[AuthProvider] Fetching account info for user:', userId);
    try {
      // First try to get account type from profiles table
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('account_type, profile_completed')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('[AuthProvider] Error fetching profile:', error);
        return false;
      }
      
      console.log('[AuthProvider] Profile data from DB:', profile);
      
      // If we have a profile with account type, use it
      if (profile && profile.account_type) {
        setAccountType(profile.account_type as AccountType);
        setProfileCompleted(profile.profile_completed || false);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('[AuthProvider] Error in fetchAccountInfo:', error);
      return false;
    }
  }, []);

  // Function to check user metadata as fallback
  const checkUserMetadata = useCallback((currentUser: User) => {
    if (!currentUser?.user_metadata) return false;
    
    const userType = currentUser.user_metadata?.accountType as AccountType | undefined;
    console.log('[AuthProvider] Account type from metadata:', userType, currentUser.user_metadata);
    
    if (userType) {
      setAccountType(userType);
      return true;
    }
    
    return false;
  }, []);

  // Initialize auth state
  const initAuth = useCallback(async () => {
    try {
      console.log(`[AuthProvider] Initializing auth (attempt ${initAttempts + 1})...`);
      setLoading(true);
      
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      console.log('[AuthProvider] Current session:', currentSession?.user?.id ? 'Active' : 'None');
      
      setSession(currentSession);
      const currentUser = currentSession?.user ?? null;
      setUser(currentUser);
      
      if (!currentUser) {
        console.log('[AuthProvider] No user found, finishing init');
        setAccountType(null);
        setProfileCompleted(false);
        setLoading(false);
        return;
      }
      
      // Check for account information
      console.log('[AuthProvider] Checking account info for user:', currentUser.id);
      let success = await fetchAccountInfo(currentUser.id);
      
      if (!success) {
        console.log('[AuthProvider] No profile found, checking metadata');
        success = checkUserMetadata(currentUser);
        
        if (success) {
          const isCompleted = await checkProfileStatus(currentUser.id);
          setProfileCompleted(isCompleted);
        }
      }
      
      if (!success) {
        console.warn('[AuthProvider] User has no account type in profile or metadata');
        setAccountType(null);
        setProfileCompleted(false);
      }
      
    } catch (error) {
      console.error('[AuthProvider] Error during auth initialization:', error);
    } finally {
      setLoading(false);
      console.log('[AuthProvider] Auth initialization complete');
    }
  }, [initAttempts, fetchAccountInfo, checkUserMetadata]);
  
  // Retry initialization if it fails
  useEffect(() => {
    if (initAttempts > 0 && initAttempts < 3) {
      const timer = setTimeout(() => {
        console.log(`[AuthProvider] Retrying initialization (attempt ${initAttempts + 1})...`);
        initAuth();
      }, 2000); // Wait 2 seconds before retrying
      
      return () => clearTimeout(timer);
    }
  }, [initAttempts, initAuth]);

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
        
        // If user has logged out, reset states
        if (!currentUser) {
          setAccountType(null);
          setProfileCompleted(false);
          setLoading(false);
          return;
        }
        
        // Check for account information when user is authenticated
        try {
          setLoading(true);
          // First try to get account type from profiles table
          let success = await fetchAccountInfo(currentUser.id);
          
          // If that fails, try to get it from user metadata
          if (!success) {
            success = checkUserMetadata(currentUser);
            
            if (success) {
              // If we found account type in metadata but not in profile,
              // check if profile is completed
              const isCompleted = await checkProfileStatus(currentUser.id);
              setProfileCompleted(isCompleted);
            }
          }
          
          // If neither approach worked, user probably needs to complete profile setup
          if (!success) {
            console.warn('[AuthProvider] User has no account type in profile or metadata');
            setAccountType(null);
            setProfileCompleted(false);
          }
        } catch (error) {
          console.error('[AuthProvider] Error checking profile status:', error);
        } finally {
          setLoading(false);
        }
      }
    );

    // Initialize auth state
    initAuth().then(() => {
      // If initialization fails or results in no user, increment attempts
      if (!user && initAttempts < 3) {
        setInitAttempts(prev => prev + 1);
      }
    });

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [initAuth, fetchAccountInfo, checkUserMetadata, initAttempts, user]);

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
      
      // Force a hard navigation to ensure all state is reset
      window.location.href = '/';
    } catch (error: any) {
      console.error('[AuthProvider] Error signing out:', error);
      toast.error('Failed to sign out: ' + error.message);
      
      // Even if there's an error, try to force a reset
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
      
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
