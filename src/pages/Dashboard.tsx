
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import DashboardRoutes from '@/components/dashboard/DashboardRoutes';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { user, accountType, loading } = useAuth();
  const navigate = useNavigate();
  const [retryCount, setRetryCount] = useState(0);
  const [showRetryButton, setShowRetryButton] = useState(false);
  const [isPageMounted, setIsPageMounted] = useState(true);
  const [localLoading, setLocalLoading] = useState(true);
  
  useEffect(() => {
    setIsPageMounted(true);
    
    // Set minimum load time to avoid flashing
    const loadTimer = setTimeout(() => {
      if (isPageMounted) {
        setLocalLoading(false);
      }
    }, 800);
    
    // Clear any existing console logs for debugging
    console.log('[Dashboard] Auth state:', { 
      user: !!user, 
      userId: user?.id,
      accountType, 
      loading,
      metadata: user?.user_metadata,
      retryCount,
      showRetryButton,
      localLoading
    });
    
    // If user is logged in but doesn't have an account type, redirect to profile setup
    if (user && !loading && !accountType) {
      console.log('[Dashboard] User logged in but no account type, redirecting to profile setup');
      toast.info('Please complete your profile setup');
      navigate('/profile-setup', { replace: true });
    }

    // Show retry button after a delay - 10 seconds instead of 3
    const timer = setTimeout(() => {
      if ((loading || localLoading) && isPageMounted) {
        setShowRetryButton(true);
      }
    }, 10000);

    // Remove the automatic force-reload after 10 seconds
    // This was causing the page to refresh automatically

    return () => {
      setIsPageMounted(false);
      clearTimeout(timer);
      clearTimeout(loadTimer);
    };
  }, [user, loading, accountType, navigate, retryCount]);

  // Function to retry loading the dashboard
  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    setShowRetryButton(false);
    setLocalLoading(true);
    console.log('[Dashboard] Manual retry triggered');
    toast.info('Reloading dashboard...');
    window.location.reload();
  };

  // Show loading state if auth is still being checked
  if (loading || localLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4 bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="mb-6 text-foreground">Loading your dashboard...</p>
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
    );
  }

  // If user is not authenticated, redirect to login
  if (!user) {
    console.log('[Dashboard] No user found, redirecting to login');
    toast.error('You must be logged in to view the dashboard');
    return <Navigate to="/login" replace />;
  }

  // If user doesn't have account type but we're not redirecting yet, show error state with recovery options
  if (!accountType && user) {
    console.log('[Dashboard] User has no account type, showing error state');
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4 bg-background">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2 text-foreground">Account Type Missing</h2>
        <p className="text-muted-foreground text-center mb-6 max-w-md">
          We couldn't determine your account type. This is needed to show you the right dashboard.
        </p>
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <Button 
            onClick={() => navigate('/profile-setup', { replace: true })} 
            variant="default"
          >
            Complete Profile Setup
          </Button>
          <Button 
            onClick={handleRetry} 
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Retry Loading
          </Button>
        </div>
      </div>
    );
  }

  // If user has a specific account type, show the appropriate dashboard
  console.log('[Dashboard] Rendering dashboard for', accountType);
  return <DashboardRoutes />;
};

export default Dashboard;
