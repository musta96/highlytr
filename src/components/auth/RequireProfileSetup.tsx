
import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/auth';

const RequireProfileSetup = () => {
  const { user, loading, profileCompleted, accountType } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Handle redirection based on account type when profiles are completed
    if (!loading && user && profileCompleted && accountType) {
      const dashboardPath = `/dashboard/${accountType.toLowerCase()}`;
      
      // Only redirect if we're not already on the correct dashboard path
      if (!location.pathname.startsWith(dashboardPath)) {
        console.log(`Redirecting to ${dashboardPath}`);
        navigate(dashboardPath);
      }
    }
  }, [user, loading, profileCompleted, accountType, location.pathname, navigate]);

  // If we're still checking auth state, show loading
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
