
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/hooks/auth/AuthContext';
import { toast } from 'sonner';

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  
  // Validate that we're using this within an AuthProvider
  useEffect(() => {
    if (authContext === undefined) {
      console.error('useAuth must be used within an AuthProvider');
      toast.error('Authentication error', {
        description: 'Authentication system failed to initialize properly.',
        duration: 5000
      });
    }
  }, [authContext]);
  
  return authContext;
};
