
import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import ProfileSetupForm from '@/components/profile/ProfileSetupForm';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Loader2, RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ProfileSetup = () => {
  const { user, loading, profileCompleted, accountType } = useAuth();
  const navigate = useNavigate();
  const [showRetryButton, setShowRetryButton] = useState(false);
  const [localLoading, setLocalLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stableRender, setStableRender] = useState(false);

  // Log the current state for detailed debugging
  useEffect(() => {
    console.log('[ProfileSetup]', {
      hasUser: !!user,
      userId: user?.id,
      loading,
      profileCompleted,
      accountType,
      userMetadata: user?.user_metadata
    });

    // Set a local loading state for initial render
    const timer = setTimeout(() => {
      setLocalLoading(false);
    }, 1000);
    
    // Ensure stable rendering regardless of auth state
    const stableTimer = setTimeout(() => {
      setStableRender(true);
    }, 1500);

    // Only redirect if profile is completed AND we have stable rendering
    if (!loading && user && profileCompleted && accountType && stableRender) {
      console.log('[ProfileSetup] Profile already completed, redirecting to dashboard');
      navigate('/dashboard');
    }

    // Show retry button if still loading after 5 seconds
    const retryTimer = setTimeout(() => {
      if (loading) {
        setShowRetryButton(true);
      }
    }, 5000);

    // Force reload after 15 seconds if still loading
    const forceReloadTimer = setTimeout(() => {
      if (loading) {
        console.log('[ProfileSetup] Still loading after timeout, forcing reload');
        setError('Loading timed out. Please try reloading the page.');
      }
    }, 15000);

    return () => {
      clearTimeout(timer);
      clearTimeout(stableTimer);
      clearTimeout(retryTimer);
      clearTimeout(forceReloadTimer);
    };
  }, [loading, user, profileCompleted, accountType, navigate, stableRender]);

  // Function to manually retry loading
  const handleRetry = () => {
    console.log('[ProfileSetup] Manual retry triggered');
    setLocalLoading(true);
    setError(null);
    window.location.reload();
  };
  
  // Always render the layout to prevent blank screen
  return (
    <Layout>
      {(loading || localLoading) ? (
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="mb-6">Loading your account information...</p>
          {showRetryButton && (
            <Button 
              onClick={handleRetry}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Retry Loading
            </Button>
          )}
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <AlertCircle className="h-8 w-8 text-destructive mb-4" />
          <p className="mb-6 text-destructive">{error}</p>
          <Button 
            onClick={handleRetry}
            variant="default"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Reload Page
          </Button>
        </div>
      ) : !user ? (
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <AlertCircle className="h-8 w-8 text-amber-500 mb-4" />
          <p className="mb-6">You need to be logged in to access this page</p>
          <Button 
            onClick={() => navigate('/login')}
            variant="default"
          >
            Go to Login
          </Button>
        </div>
      ) : (
        <div className="container py-8 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Complete Your Profile</h1>
          <p className="text-gray-600 mb-8">
            Welcome to HighLytr! Please provide some information about yourself to complete your profile.
          </p>
          <ProfileSetupForm />
        </div>
      )}
    </Layout>
  );
};

export default ProfileSetup;
