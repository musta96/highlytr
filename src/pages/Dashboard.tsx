import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/auth';
import DashboardRoutes from '@/components/dashboard/DashboardRoutes';
import DashboardOverview from '@/components/dashboard/DashboardOverview';

const Dashboard = () => {
  const { accountType } = useAuth();

  // If user has a specific account type, redirect to that dashboard type
  if (accountType) {
    return <Navigate to={`/dashboard/${accountType.toLowerCase()}`} replace />;
  }

  // Otherwise, show the general dashboard overview
  return <DashboardRoutes />;
};

export default Dashboard;
