
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
  const [contentVisible, setContentVisible] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const [localLoading, setLocalLoading] = useState(true);
  const [showRetryButton, setShowRetryButton] = useState(false);
  const [forceContentRender, setForceContentRender] = useState(false);
  
  // Log the current state for detailed debugging
  useEffect(() => {
    console.log('[ProfileSetup]', {
      hasUser: !!user,
      userId: user?.id,
      loading,
      profileCompleted,
      accountType,
      userMetadata: user?.user_metadata,
      contentVisible,
      retryCount,
      localLoading,
      forceContentRender
    });

    // Always ensure content is visible
    setContentVisible(true);
    
    // If user exists, force content render after a short delay regardless of other states
    if (user && !forceContentRender) {
      const forceRenderTimer = setTimeout(() => {
        setForceContentRender(true);
        setLocalLoading(false);
      }, 500);
      return () => clearTimeout(forceRenderTimer);
    }
    
    // Only redirect if profile is completed and we have all required data
    if (!loading && user && profileCompleted && accountType) {
      console.log('[ProfileSetup] Profile already completed, redirecting to dashboard');
      toast.success('Your profile is already set up!');
      navigate('/dashboard');
    }
    
    // Show retry button after a short delay
    const showRetryTimer = setTimeout(() => {
      if (loading || !user) {
        setShowRetryButton(true);
      }
    }, 2000);
    
    // Local loading state with a minimum display time to prevent flashing
    const loadingTimer = setTimeout(() => {
      setLocalLoading(false);
    }, 500);
    
    return () => {
      clearTimeout(showRetryTimer);
      clearTimeout(loadingTimer);
    };
  }, [loading, user, profileCompleted, accountType, navigate, retryCount, forceContentRender]);

  // Function to manually retry loading
  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    setLocalLoading(true);
    window.location.reload();
  };
  
  // If we have a user but form isn't showing yet, force it to render
  useEffect(() => {
    if (user && !loading && !localLoading && !contentVisible) {
      console.log('[ProfileSetup] Forcing content to be visible');
      setContentVisible(true);
    }
  }, [user, loading, localLoading, contentVisible]);
  
  // IMPORTANT: Always render the layout with meaningful content
  return (
    <Layout>
      <div className="container py-8 max-w-3xl mx-auto min-h-[60vh] flex flex-col">
        {/* If user exists but we're technically still loading, show the form anyway */}
        {user && (forceContentRender || !localLoading) ? (
          <div className="flex-grow">
            <h1 className="text-3xl font-bold mb-6">Complete Your Profile</h1>
            <p className="text-gray-600 mb-8">
              Welcome to HighLytr! Please provide some information about yourself to complete your profile.
            </p>
            <ProfileSetupForm />
          </div>
        ) : (loading || localLoading) ? (
          <div className="flex flex-col items-center justify-center flex-grow py-12">
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
        ) : !user ? (
          <div className="flex flex-col items-center justify-center flex-grow py-12">
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
          <div className="flex-grow">
            <h1 className="text-3xl font-bold mb-6">Complete Your Profile</h1>
            <p className="text-gray-600 mb-8">
              Welcome to HighLytr! Please provide some information about yourself to complete your profile.
            </p>
            <ProfileSetupForm />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProfileSetup;
