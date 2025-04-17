
import { useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { toast } from 'sonner';

interface UseAuthRecoveryProps {
  user: User | null;
  loading: boolean;
  initAttempts: number;
  setInitAttempts: React.Dispatch<React.SetStateAction<number>>;
  hasInitialized: boolean;
  isInitializingRef?: React.MutableRefObject<boolean>;
  initAuth: () => Promise<void>;
}

export const useAuthRecovery = ({
  user,
  loading,
  initAttempts,
  setInitAttempts,
  hasInitialized,
  isInitializingRef,
  initAuth
}: UseAuthRecoveryProps) => {
  // Add a recovery mechanism when initialization fails with faster retries
  useEffect(() => {
    const isInitializing = isInitializingRef?.current || false;
    
    if (!user && !loading && initAttempts < 3 && !hasInitialized && !isInitializing) {
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
  }, [user, loading, initAttempts, initAuth, hasInitialized, isInitializingRef, setInitAttempts]);
};
