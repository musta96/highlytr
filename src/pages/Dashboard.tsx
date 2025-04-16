
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/auth';
import DashboardRoutes from '@/components/dashboard/DashboardRoutes';

const Dashboard = () => {
  const { user, accountType } = useAuth();

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
