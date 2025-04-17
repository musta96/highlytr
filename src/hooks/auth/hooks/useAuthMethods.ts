
import { useState } from 'react';
import { toast } from 'sonner';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { SignInCredentials, SignUpCredentials, SignInResponse, SignUpResponse } from '../types';
import { AccountType } from '@/components/auth/types';

interface AuthMethodsProps {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
  setProfileCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  setAccountType: React.Dispatch<React.SetStateAction<AccountType | null>>;
}

export const useAuthMethods = ({
  setUser,
  setSession,
  setProfileCompleted,
  setAccountType
}: AuthMethodsProps) => {
  const signIn = async ({ email, password }: SignInCredentials): Promise<SignInResponse> => {
    try {
      console.log('[AuthProvider] Signing in with:', email);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      clearTimeout(timeoutId);
      
      if (error) {
        console.error('[AuthProvider] Sign in error:', error);
        return { error: error };
      }
      
      console.log('[AuthProvider] Sign in successful:', data.user?.id, 'Session:', data.session?.access_token ? 'Valid' : 'Invalid');
      
      // Update state immediately to ensure UI updates even if onAuthStateChange is delayed
      if (data.user && data.session) {
        setUser(data.user);
        setSession(data.session);
      }
      
      return { error: null };
    } catch (error: any) {
      console.error('[AuthProvider] Sign in exception:', error);
      
      // Handle AbortController timeout
      if (error.name === 'AbortError') {
        return { error: { message: 'Login request timed out. Please try again.' } };
      }
      
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

  return { signIn, signUp, signOut };
};
