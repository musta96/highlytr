
import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import ProfileSetupForm from '@/components/profile/ProfileSetupForm';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Loader2, RefreshCw, AlertCircle, Users, Trophy, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

const ProfileSetup = () => {
  const { user, loading, profileCompleted, accountType } = useAuth();
  const navigate = useNavigate();
  const [localLoading, setLocalLoading] = useState(true);
  const [showRetryButton, setShowRetryButton] = useState(false);
  const [forceRender, setForceRender] = useState(false);
  
  // Log the current state for detailed debugging
  useEffect(() => {
    console.log('[ProfileSetup]', {
      hasUser: !!user,
      userId: user?.id,
      loading,
      profileCompleted,
      accountType,
      userMetadata: user?.user_metadata,
      localLoading,
      forceRender
    });

    // If user exists, force render after a short delay regardless of other states
    if (user && !forceRender) {
      const forceRenderTimer = setTimeout(() => {
        setForceRender(true);
        setLocalLoading(false);
      }, 300); // Reduced delay for faster rendering
      return () => clearTimeout(forceRenderTimer);
    }
    
    // Only redirect if profile is completed and we have all required data
    // IMPORTANT: This check runs on every render to ensure immediate redirect once data is available
    if (!loading && user && profileCompleted === true) {
      console.log('[ProfileSetup] Profile already completed, redirecting to dashboard');
      toast.success('Your profile is already set up!');
      navigate('/dashboard', { replace: true });
      return;
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
  }, [loading, user, profileCompleted, accountType, navigate, forceRender]);

  // Function to manually retry loading
  const handleRetry = () => {
    setLocalLoading(true);
    window.location.reload();
  };
  
  // IMPORTANT: Always render the layout with meaningful content
  return (
    <Layout>
      <div className="container py-8 max-w-4xl mx-auto min-h-[70vh]">
        {/* If user exists, don't wait for other states, show the form */}
        {user && (forceRender || !localLoading) ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Complete Your Profile</h1>
              <p className="text-muted-foreground">
                Join the HighLytr community and connect with top colleges and recruiters. Your profile helps us match you with the perfect opportunities.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Join Community</h3>
                    <p className="text-xs text-muted-foreground">Connect with other athletes</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Trophy className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Get Discovered</h3>
                    <p className="text-xs text-muted-foreground">By coaches and recruiters</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-100">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="bg-amber-100 p-2 rounded-full">
                    <Star className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Track Progress</h3>
                    <p className="text-xs text-muted-foreground">Monitor your career growth</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <ProfileSetupForm />
          </div>
        ) : (loading || localLoading) ? (
          <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
            <div className="bg-primary/5 p-6 rounded-full mb-6">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
            <h2 className="text-xl font-medium mb-2">Loading your account</h2>
            <p className="mb-6 text-muted-foreground text-center max-w-md">
              We're preparing your profile setup experience. This should only take a moment.
            </p>
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
          <div className="flex flex-col items-center justify-center py-12">
            <div className="bg-amber-50 p-6 rounded-full mb-6">
              <AlertCircle className="h-10 w-10 text-amber-500" />
            </div>
            <h2 className="text-xl font-medium mb-2">Login Required</h2>
            <p className="mb-6 text-muted-foreground text-center max-w-md">
              You need to be logged in to access this page. Please log in to continue with your profile setup.
            </p>
            <Button 
              onClick={() => navigate('/login')}
              variant="default"
              className="min-w-40"
            >
              Go to Login
            </Button>
          </div>
        ) : (
          // Fallback content to ensure something is always shown
          <div className="animate-fade-in">
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
