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

  // Skip redirection on auth-related URLs even if user is logged in
  const isAuthRelated = ['/login', '/register', '/forgot-password', '/reset-password'].includes(location.pathname);

  // Don't redirect while still checking auth status
  if (loading) {
    return <Outlet />;
  }

  // If user is authenticated and not on an auth page, redirect to dashboard
  if (user && !isAuthRelated) {
    // If they have an account type, go to the dashboard
    if (accountType) {
      return <Navigate to="/dashboard" replace />;
    }
    // If no account type yet, they need to complete profile setup
    return <Navigate to="/profile-setup" replace />;
  }

  // Otherwise, render the public route
  return <Outlet />;
};

export default PublicRoute;
