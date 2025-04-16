
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/auth';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // If we're still checking auth state, show loading
  if (loading) {
    console.log('[ProtectedRoute] Still loading auth state...');
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    // Redirect to login if not authenticated
    console.log('[ProtectedRoute] User not authenticated, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the child routes
  console.log('[ProtectedRoute] User authenticated, rendering protected route');
  return <Outlet />;
};

export default ProtectedRoute;
