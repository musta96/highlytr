
import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    console.log('[ProtectedRoute]', { 
      user: !!user, 
      userId: user?.id,
      loading,
      path: location.pathname 
    });
  }, [user, loading, location.pathname]);

  // If we're still checking auth state, show loading
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p>Loading your account...</p>
      </div>
    );
  }

  if (!user) {
    // Redirect to login if not authenticated, but save the attempted location
    // so we can redirect back after successful login
    console.log('[ProtectedRoute] No user, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the child routes
  console.log('[ProtectedRoute] User authenticated, rendering outlet');
  return <Outlet />;
};

export default ProtectedRoute;
