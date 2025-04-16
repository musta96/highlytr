
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/auth';
import { Loader2 } from 'lucide-react';

const RequireProfileSetup = () => {
  const { user, loading, profileCompleted, accountType } = useAuth();
  const location = useLocation();

  // If we're still checking auth state, show loading
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p>Loading your account...</p>
      </div>
    );
  }

  // If user is not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is logged in but hasn't completed their profile, redirect to profile setup
  // Unless they're already on the profile setup page
  if (!profileCompleted && !accountType && location.pathname !== '/profile-setup') {
    return <Navigate to="/profile-setup" replace />;
  }

  // If user is logged in and has completed their profile, allow access to protected routes
  return <Outlet />;
};

export default RequireProfileSetup;
