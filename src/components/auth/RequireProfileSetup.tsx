
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const RequireProfileSetup = () => {
  const { user, loading, profileCompleted } = useAuth();
  const location = useLocation();

  // If we're still checking auth state, show nothing
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // If user is not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is logged in but hasn't completed their profile, redirect to profile setup
  // Unless they're already on the profile setup page
  if (!profileCompleted && location.pathname !== '/profile-setup') {
    return <Navigate to="/profile-setup" replace />;
  }

  // If user is logged in and has completed their profile, allow access to protected routes
  return <Outlet />;
};

export default RequireProfileSetup;
