
import React, { useState, useEffect, useRef } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { AuthContext } from '../AuthContext';
import { useAuthMethods } from '../hooks/useAuthMethods';
import { AccountType } from '@/components/auth/types';
import { useAuthInitialization } from '../hooks/useAuthInitialization';
import { useAuthListener } from '../hooks/useAuthListener';
import { useAuthRecovery } from '../hooks/useAuthRecovery';

export const AuthStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [accountType, setAccountType] = useState<AccountType | null>(null);
  const isInitializingRef = useRef(false);
  
  const { signIn, signUp, signOut } = useAuthMethods({
    setUser,
    setSession,
    setProfileCompleted,
    setAccountType
  });

  const { 
    initAuth, 
    hasInitialized, 
    initAttempts, 
    setInitAttempts 
  } = useAuthInitialization({
    setUser,
    setSession,
    setProfileCompleted,
    setAccountType
  });

  const { setupAuthListener } = useAuthListener({
    setUser,
    setSession,
    setProfileCompleted,
    setAccountType,
    setLoading
  });

  useAuthRecovery({
    user,
    loading,
    initAttempts,
    setInitAttempts,
    hasInitialized,
    isInitializingRef,
    initAuth
  });

  // Set up auth state listener only once with improved error handling
  useEffect(() => {
    // First, initialize auth state
    initAuth();
    
    // Set up listener for auth state changes
    const cleanupFunction = setupAuthListener();
    
    // Clean up subscription on unmount
    return cleanupFunction;
  }, [initAuth, setupAuthListener]);

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
