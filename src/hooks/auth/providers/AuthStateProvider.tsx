
import React, { useState, useEffect, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { AuthContext } from '../AuthContext';
import { useAuthMethods } from '../hooks/useAuthMethods';
import { fetchAccountInfo, checkUserMetadata } from '../utils/profileUtils';
import { AccountType } from '@/components/auth/types';

export const AuthStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [accountType, setAccountType] = useState<AccountType | null>(null);
  const [initAttempts, setInitAttempts] = useState(0);
  
  const { signIn, signUp, signOut } = useAuthMethods({
    setUser,
    setSession,
    setProfileCompleted,
    setAccountType
  });

  // Function to check user metadata as fallback
  const handleUserMetadata = useCallback((currentUser: User) => {
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
      let success = await fetchAccountInfo(currentUser.id, setAccountType, setProfileCompleted);
      
      if (!success) {
        console.log('[AuthProvider] No profile found, checking metadata');
        success = handleUserMetadata(currentUser);
        
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
  }, [initAttempts, handleUserMetadata]);
  
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

  // Set up auth state listener
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
          let success = await fetchAccountInfo(currentUser.id, setAccountType, setProfileCompleted);
          
          // If that fails, try to get it from user metadata
          if (!success) {
            success = handleUserMetadata(currentUser);
            
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
  }, [initAuth, handleUserMetadata, initAttempts, user]);

  // Function imported from utils - directly embedded here for simplicity when refactoring
  const checkProfileStatus = async (userId: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('profile_completed')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile status:', error);
        return false;
      }
      
      // Handle the case where profile_completed might be null
      return data?.profile_completed === true;
    } catch (error) {
      console.error('Error in profile status check:', error);
      return false;
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
