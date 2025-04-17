
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import DashboardRoutes from '@/components/dashboard/DashboardRoutes';
import { Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { user, accountType, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Clear any existing console logs for debugging
    console.log('Dashboard mount - Auth state:', { 
      user: !!user, 
      userId: user?.id,
      accountType, 
      loading,
      metadata: user?.user_metadata
    });
    
    // If user is logged in but doesn't have an account type, redirect to profile setup
    if (user && !loading && !accountType) {
      console.log('User logged in but no account type, redirecting to profile setup');
      toast.info('Please complete your profile setup');
      navigate('/profile-setup', { replace: true });
    }
  }, [user, loading, accountType, navigate]);

  // Show loading state if auth is still being checked
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  // If user is not authenticated, redirect to login
  if (!user) {
    console.log('No user found, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // If user doesn't have account type but we're not redirecting yet, show error state with recovery options
  if (!accountType && user) {
    console.log('User has no account type, showing error state');
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Account Type Missing</h2>
        <p className="text-gray-500 text-center mb-6">
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
            onClick={() => {
              // Force reload the page to retry loading account data
              window.location.reload();
            }} 
            variant="outline"
          >
            Retry Loading
          </Button>
        </div>
      </div>
    );
  }

  // If user has a specific account type, show the appropriate dashboard
  console.log('Rendering dashboard for', accountType);
  return <DashboardRoutes />;
};

export default Dashboard;
