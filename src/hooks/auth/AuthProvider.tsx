
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
    // Set up listener for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('Auth state changed:', event, currentSession);
        setSession(currentSession);
        const currentUser = currentSession?.user ?? null;
        setUser(currentUser);
        
        // Check profile completion status when user authenticates
        if (currentUser) {
          const isCompleted = await checkProfileStatus(currentUser.id);
          setProfileCompleted(isCompleted);
          
          // Get user's account type from metadata
          const userType = currentUser.user_metadata?.accountType as AccountType | undefined;
          setAccountType(userType || null);
          console.log('Account type from metadata:', userType);
        } else {
          setProfileCompleted(false);
          setAccountType(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      console.log('Retrieved session:', currentSession);
      setSession(currentSession);
      const currentUser = currentSession?.user ?? null;
      setUser(currentUser);
      
      // Check profile completion status
      if (currentUser) {
        const isCompleted = await checkProfileStatus(currentUser.id);
        setProfileCompleted(isCompleted);
        
        // Get user's account type from metadata
        const userType = currentUser.user_metadata?.accountType as AccountType | undefined;
        setAccountType(userType || null);
        console.log('Account type from metadata:', userType);
      }
      
      setLoading(false);
    });

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async ({ email, password }: SignInCredentials): Promise<SignInResponse> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      // Check profile completion status after sign in
      if (data.user) {
        const isCompleted = await checkProfileStatus(data.user.id);
        setProfileCompleted(isCompleted);
      }
      
      return { error: null };
    } catch (error: any) {
      console.error('Sign in error:', error);
      return { error: { message: error.message } };
    }
  };

  const signUp = async ({ email, password, firstName, lastName, accountType }: SignUpCredentials): Promise<SignUpResponse> => {
    try {
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

      // Show helpful information about email verification
      toast.info(
        "We've sent a verification email. Please check your inbox and click the link to verify your account.", 
        { duration: 8000 }
      );
      
      return { error: null };
    } catch (error: any) {
      return { error: { message: error.message } };
    }
  };
  
  // Implementing the missing signOut function
  const signOut = async (): Promise<void> => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setProfileCompleted(false);
      setAccountType(null);
    } catch (error: any) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
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
