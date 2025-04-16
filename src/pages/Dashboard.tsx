
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/auth';
import DashboardRoutes from '@/components/dashboard/DashboardRoutes';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
  const { user, accountType, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If user is logged in but doesn't have an account type, redirect to profile setup
    if (user && !loading && !accountType) {
      navigate('/profile-setup', { replace: true });
    }
  }, [user, loading, accountType, navigate]);

  // Show loading state if auth is still being checked
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // If user is not authenticated, redirect to login
  if (!user && !loading) {
    return <Navigate to="/login" replace />;
  }

  // If user doesn't have account type, let the useEffect handle redirection
  if (!accountType && user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2">Redirecting to profile setup...</p>
      </div>
    );
  }

  // If user has a specific account type, show the appropriate dashboard
  if (accountType) {
    return <DashboardRoutes />;
  }

  // Fallback - should not reach this if proper auth checks are in place
  return <Navigate to="/login" replace />;
};

export default Dashboard;
