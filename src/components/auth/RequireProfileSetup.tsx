
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

const RequireProfileSetup = () => {
  const { user, loading, profileCompleted, accountType } = useAuth();
  const location = useLocation();

  // Add more detailed console logging to help debug issues
  console.log('[RequireProfileSetup]', {
    isLoading: loading,
    hasUser: !!user,
    profileCompleted,
    accountType,
    path: location.pathname
  });

  // If we're still checking auth state, show loading
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p>Loading your account information...</p>
      </div>
    );
  }

  // If user is not logged in, redirect to login
  if (!user) {
    console.log('[RequireProfileSetup] No user, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is logged in but hasn't completed their profile or doesn't have an account type,
  // redirect to profile setup unless they're already on the profile setup page
  if ((!profileCompleted || !accountType) && location.pathname !== '/profile-setup') {
    console.log('[RequireProfileSetup] User missing profile/account type, redirecting to setup');
    return <Navigate to="/profile-setup" replace />;
  }

  // If user is logged in and has completed their profile, allow access to protected routes
  console.log('[RequireProfileSetup] Profile requirements satisfied, rendering outlet');
  return <Outlet />;
};

export default RequireProfileSetup;
