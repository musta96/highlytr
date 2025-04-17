
import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import ProfileSetupForm from '@/components/profile/ProfileSetupForm';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ProfileSetup = () => {
  const { user, loading, profileCompleted, accountType } = useAuth();
  const navigate = useNavigate();
  const [showRetryButton, setShowRetryButton] = useState(false);

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

    // Handle case where profile is already completed
    if (!loading && user && profileCompleted && accountType) {
      console.log('[ProfileSetup] Profile already completed, redirecting to dashboard');
      navigate('/dashboard');
    }

    // Show retry button if still loading after 3 seconds
    const timer = setTimeout(() => {
      if (loading) {
        setShowRetryButton(true);
      }
    }, 3000);

    // Force reload after 10 seconds if still loading
    const forceReloadTimer = setTimeout(() => {
      if (loading) {
        console.log('[ProfileSetup] Still loading after timeout, forcing reload');
        window.location.reload();
      }
    }, 10000);

    return () => {
      clearTimeout(timer);
      clearTimeout(forceReloadTimer);
    };
  }, [loading, user, profileCompleted, accountType, navigate]);

  // Function to manually retry loading
  const handleRetry = () => {
    console.log('[ProfileSetup] Manual retry triggered');
    window.location.reload();
  };
  
  // Show loading state while checking auth
  if (loading) {
    return (
      <Layout>
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
      </Layout>
    );
  }

  // Show login redirect if no user
  if (!user) {
    console.log('[ProfileSetup] No user, redirecting to login');
    toast.error('Please log in to set up your profile');
    // Use setTimeout to prevent potential navigation loops
    setTimeout(() => {
      navigate('/login', { replace: true });
    }, 100);
    
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p>Please log in to set up your profile...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Complete Your Profile</h1>
        <p className="text-gray-600 mb-8">
          Welcome to HighLytr! Please provide some information about yourself to complete your profile.
        </p>
        <ProfileSetupForm />
      </div>
    </Layout>
  );
};

export default ProfileSetup;
