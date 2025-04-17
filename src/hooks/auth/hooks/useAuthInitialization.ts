
import { useState, useCallback, useRef } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { AccountType } from '@/components/auth/types';
import { fetchAccountInfo, checkUserMetadata } from '../utils/profileUtils';

interface UseAuthInitializationProps {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
  setProfileCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  setAccountType: React.Dispatch<React.SetStateAction<AccountType | null>>;
}

interface UseAuthInitializationResult {
  initAuth: () => Promise<void>;
  hasInitialized: boolean;
  initAttempts: number;
  setInitAttempts: React.Dispatch<React.SetStateAction<number>>;
}

export const useAuthInitialization = ({
  setUser,
  setSession,
  setProfileCompleted,
  setAccountType
}: UseAuthInitializationProps): UseAuthInitializationResult => {
  const [hasInitialized, setHasInitialized] = useState(false);
  const [initAttempts, setInitAttempts] = useState(0);
  const isInitializingRef = useRef(false);

  const initAuth = useCallback(async () => {
    if (hasInitialized || isInitializingRef.current) return;
    
    try {
      isInitializingRef.current = true;
      console.log(`[AuthStateProvider] Initializing auth (attempt ${initAttempts + 1})...`);
      
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
        isInitializingRef.current = false;
        return;
      }
      
      console.log('[AuthStateProvider] Current session:', currentSession?.user?.id ? 'Active' : 'None');
      
      if (!currentSession) {
        setUser(null);
        setSession(null);
        setAccountType(null);
        setProfileCompleted(false);
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
              accountType: 'loaded', 
              profileCompleted: 'loaded' 
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
      isInitializingRef.current = false;
      console.log('[AuthStateProvider] Auth initialization complete');
    }
  }, [initAttempts, setUser, setSession, setAccountType, setProfileCompleted, hasInitialized]);

  return {
    initAuth,
    hasInitialized,
    initAttempts,
    setInitAttempts
  };
};
