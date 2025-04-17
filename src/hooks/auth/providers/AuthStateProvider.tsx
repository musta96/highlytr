
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { AuthContext } from '../AuthContext';
import { useAuthMethods } from '../hooks/useAuthMethods';
import { fetchAccountInfo, checkUserMetadata } from '../utils/profileUtils';
import { AccountType } from '@/components/auth/types';
import { toast } from 'sonner';

export const AuthStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [accountType, setAccountType] = useState<AccountType | null>(null);
  const [initAttempts, setInitAttempts] = useState(0);
  const [hasInitialized, setHasInitialized] = useState(false);
  
  // Use a ref to track auth listener to avoid duplicates
  const authListenerRef = useRef<{ subscription?: { unsubscribe: () => void } }>({}); 
  const isInitializingRef = useRef(false);
  
  const { signIn, signUp, signOut } = useAuthMethods({
    setUser,
    setSession,
    setProfileCompleted,
    setAccountType
  });

  // Clean up function to remove any previous listeners
  const cleanupListener = useCallback(() => {
    if (authListenerRef.current.subscription) {
      console.log('[AuthStateProvider] Cleaning up previous auth listener');
      authListenerRef.current.subscription.unsubscribe();
      authListenerRef.current.subscription = undefined;
    }
  }, []);

  // Initialize auth state with faster timeouts
  const initAuth = useCallback(async () => {
    if (hasInitialized || isInitializingRef.current) return;
    
    try {
      isInitializingRef.current = true;
      console.log(`[AuthStateProvider] Initializing auth (attempt ${initAttempts + 1})...`);
      setLoading(true);
      
      // Use a timeout to ensure we don't hang indefinitely
      const authPromise = supabase.auth.getSession();
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Auth session timeout')), 5000)
      );
      
      const { data: { session: currentSession }, error } = await Promise.race([
        authPromise,
        timeoutPromise.then(() => {
          throw new Error('Auth session timeout');
        })
      ]) as Awaited<ReturnType<typeof supabase.auth.getSession>>;
      
      if (error) {
        console.error('[AuthStateProvider] Error getting session:', error);
        toast.error('Authentication error', { 
          description: 'There was a problem connecting to the authentication service. Please refresh the page.',
          duration: 5000
        });
        setLoading(false);
        isInitializingRef.current = false;
        return;
      }
      
      console.log('[AuthStateProvider] Current session:', currentSession?.user?.id ? 'Active' : 'None');
      
      if (!currentSession) {
        setUser(null);
        setSession(null);
        setAccountType(null);
        setProfileCompleted(false);
        setLoading(false);
        setHasInitialized(true);
        isInitializingRef.current = false;
        return;
      }
      
      setSession(currentSession);
      setUser(currentSession.user);
      
      // Check for account information
      if (currentSession.user) {
        console.log('[AuthStateProvider] Checking account info for user:', currentSession.user.id);
        try {
          // Set a shorter timeout for account info fetch to prevent long waits
          const timeoutPromise = new Promise<boolean>((_, reject) => 
            setTimeout(() => reject(new Error('Timeout fetching account info')), 3000)
          );
          
          const fetchPromise = Promise.race([
            fetchAccountInfo(currentSession.user.id, setAccountType, setProfileCompleted),
            timeoutPromise
          ]).catch(err => {
            console.warn('[AuthStateProvider] Error or timeout fetching account info:', err.message);
            return false;
          });
          
          let success = await fetchPromise;
          
          // If DB fetch failed, try metadata as fallback
          if (!success) {
            success = checkUserMetadata(currentSession.user, setAccountType);
          }
          
          if (!success) {
            console.warn('[AuthStateProvider] User has no account type in profile or metadata');
            // Use 'athlete' as the default account type in this case
            setAccountType('athlete');
            setProfileCompleted(false);
          } else {
            console.log('[AuthStateProvider] Successfully loaded account info:', { 
              accountType, 
              profileCompleted 
            });
          }
        } catch (error) {
          console.error('[AuthStateProvider] Error checking account info:', error);
          // Set a default account type to prevent blank screens
          setAccountType('athlete');
        }
      }
      
      setHasInitialized(true);
    } catch (error) {
      console.error('[AuthStateProvider] Error during auth initialization:', error);
      toast.error('Authentication error', { 
        description: 'Failed to initialize authentication. Please refresh the page.',
        duration: 5000
      });
    } finally {
      setLoading(false);
      isInitializingRef.current = false;
      console.log('[AuthStateProvider] Auth initialization complete');
    }
  }, [initAttempts, accountType, profileCompleted]);

  // Set up auth state listener only once with improved error handling
  useEffect(() => {
    console.log('[AuthStateProvider] Setting up auth state listener...');
    
    // First, clean up any existing listener
    cleanupListener();
    
    // First, initialize auth state
    initAuth();
    
    // Set up listener for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log('[AuthStateProvider] Auth state changed:', event, currentSession?.user?.id);
        
        // Update session and user state
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // If user has logged out, reset states
        if (!currentSession?.user) {
          setAccountType(null);
          setProfileCompleted(false);
          setLoading(false);
          return;
        }
        
        // For important auth events, process account info
        if (['SIGNED_IN', 'TOKEN_REFRESHED', 'USER_UPDATED'].includes(event)) {
          // Use setTimeout to prevent potential deadlocks with Supabase auth
          setTimeout(() => {
            try {
              setLoading(true);
              
              // Process the account info in a non-blocking way
              fetchAccountInfo(
                currentSession.user.id, 
                setAccountType, 
                setProfileCompleted
              ).then(success => {
                if (!success) {
                  return checkUserMetadata(currentSession.user, setAccountType);
                }
                return true;
              }).then(success => {
                if (!success) {
                  console.warn('[AuthStateProvider] User has no account type in profile or metadata');
                  // Use 'athlete' as default account type to prevent blank screens
                  setAccountType('athlete');
                  setProfileCompleted(false);
                } else {
                  console.log('[AuthStateProvider] User account data loaded on event:', event, { 
                    accountType, 
                    profileCompleted 
                  });
                }
              }).catch(error => {
                console.error('[AuthStateProvider] Error processing auth event data:', error);
                // Set a default account type
                setAccountType('athlete');
              }).finally(() => {
                setLoading(false);
              });
              
            } catch (error) {
              console.error('[AuthStateProvider] Error in deferred profile processing:', error);
              setLoading(false);
              // Set a default account type
              setAccountType('athlete');
            }
          }, 0);
        }
      }
    );

    // Store the subscription for cleanup
    authListenerRef.current.subscription = subscription;

    // Clean up subscription
    return cleanupListener;
  }, [cleanupListener, initAuth]);

  // Add a recovery mechanism when initialization fails with faster retries
  useEffect(() => {
    if (!user && !loading && initAttempts < 3 && !hasInitialized && !isInitializingRef.current) {
      const timer = setTimeout(() => {
        console.log(`[AuthStateProvider] Retrying initialization (attempt ${initAttempts + 1})...`);
        setInitAttempts(prev => prev + 1);
        initAuth();
      }, 1000); // Retry faster, every 1 second up to 3 times
      
      return () => clearTimeout(timer);
    }
    
    // If we've tried 3 times and still have issues, show message to user
    if (initAttempts >= 3 && !user && !loading && !hasInitialized) {
      console.error('[AuthStateProvider] Failed to initialize auth after multiple attempts');
      toast.error('Authentication error', {
        description: 'We\'re having trouble connecting to the authentication service. Please refresh the page or try again later.',
        duration: 8000
      });
    }
  }, [user, loading, initAttempts, initAuth, hasInitialized]);

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
