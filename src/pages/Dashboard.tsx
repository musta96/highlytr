
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/auth';
import DashboardRoutes from '@/components/dashboard/DashboardRoutes';

const Dashboard = () => {
  const { user, accountType, loading } = useAuth();
  
  // Show loading state if auth is still being checked
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // If user doesn't have account type, redirect to profile setup
  if (!accountType && user) {
    return <Navigate to="/profile-setup" replace />;
  }

  // If user has a specific account type, redirect to that dashboard type
  if (accountType) {
    return <Navigate to={`/dashboard/${accountType.toLowerCase()}`} replace />;
  }

  // Fallback - should not reach this if proper auth checks are in place
  return <DashboardRoutes />;
};

export default Dashboard;
