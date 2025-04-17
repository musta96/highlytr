
import { useCallback, useRef } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { AccountType } from '@/components/auth/types';
import { fetchAccountInfo, checkUserMetadata } from '../utils';

interface UseAuthListenerProps {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
  setProfileCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  setAccountType: React.Dispatch<React.SetStateAction<AccountType | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useAuthListener = ({
  setUser,
  setSession,
  setAccountType,
  setProfileCompleted,
  setLoading
}: UseAuthListenerProps) => {
  // Use a ref to track auth listener to avoid duplicates
  const authListenerRef = useRef<{ subscription?: { unsubscribe: () => void } }>({});

  // Clean up function to remove any previous listeners
  const cleanupListener = useCallback(() => {
    if (authListenerRef.current.subscription) {
      console.log('[AuthStateProvider] Cleaning up previous auth listener');
      authListenerRef.current.subscription.unsubscribe();
      authListenerRef.current.subscription = undefined;
    }
  }, []);

  // Set up auth state listener
  const setupAuthListener = useCallback(() => {
    console.log('[AuthStateProvider] Setting up auth state listener...');
    
    // First, clean up any existing listener
    cleanupListener();
    
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
    
    return cleanupListener;
  }, [cleanupListener, setUser, setSession, setAccountType, setProfileCompleted, setLoading]);

  return {
    setupAuthListener,
    cleanupListener
  };
};
