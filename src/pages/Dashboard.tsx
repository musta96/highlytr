
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import DashboardRoutes from '@/components/dashboard/DashboardRoutes';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

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
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  // If user is not authenticated, redirect to login
  if (!user) {
    console.log('No user found, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // If user doesn't have account type but we're not redirecting yet, show loading
  // Add a timeout to avoid endless loading
  if (!accountType && user) {
    console.log('User has no account type, showing loading state');
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2 mb-4" />
        <p>Loading profile information...</p>
        <p className="text-sm text-gray-500 mt-2">If this takes too long, try logging out and back in</p>
      </div>
    );
  }

  // If user has a specific account type, show the appropriate dashboard
  console.log('Rendering dashboard for', accountType);
  return <DashboardRoutes />;
};

export default Dashboard;
