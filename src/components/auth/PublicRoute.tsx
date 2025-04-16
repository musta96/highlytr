import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/auth';

/**
 * PublicRoute component redirects authenticated users to their dashboard
 * while allowing non-authenticated users to access public routes
 */
const PublicRoute = () => {
  const { user, accountType, loading } = useAuth();
  const location = useLocation();

  // Don't redirect while still checking auth status
  if (loading) {
    return <Outlet />;
  }

  // If user is authenticated, redirect to dashboard based on account type
  if (user) {
    // If they have an account type, go to the type-specific dashboard
    if (accountType) {
      return <Navigate to={`/dashboard/${accountType.toLowerCase()}`} replace />;
    }
    // If no account type yet, they need to complete profile setup
    return <Navigate to="/profile-setup" replace />;
  }

  // Otherwise, render the public route
  return <Outlet />;
};

export default PublicRoute;
