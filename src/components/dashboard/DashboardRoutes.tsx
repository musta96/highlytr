
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import DashboardOverview from './DashboardOverview';
import AthleteDashboard from './AthleteDashboard';
import CollegeDashboard from './CollegeDashboard';
import AgencyDashboard from './AgencyDashboard';
import AthleteProfile from '@/components/athlete/AthleteProfile';
import SearchPage from '@/components/search/SearchPage';
import ConnectionsPage from '@/components/connections/ConnectionsPage';
import MessagesPage from '@/components/messaging/MessagesPage';
import NotificationsPage from '@/components/notifications/NotificationsPage';
import SettingsPage from '@/components/settings/SettingsPage';
import CollegeProfile from '@/components/college/CollegeProfile';
import AgencyProfile from '@/components/agency/AgencyProfile';
import NotFound from '@/pages/NotFound';

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        {/* Default route based on account type is handled in the Dashboard component */}
        <Route index element={<Navigate to="/dashboard" replace />} />
        
        {/* Type-specific dashboards */}
        <Route path="athlete" element={<AthleteDashboard />} />
        <Route path="college" element={<CollegeDashboard />} />
        <Route path="agency" element={<AgencyDashboard />} />
        
        {/* Common routes */}
        <Route path="profile" element={<AthleteProfile />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="connections" element={<ConnectionsPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="search" element={<SearchPage type="athletes" />} />
        <Route path="athletes/search" element={<SearchPage type="athletes" />} />
        <Route path="colleges/search" element={<SearchPage type="colleges" />} />
        
        {/* Profile routes */}
        <Route path="college-profile" element={<CollegeProfile />} />
        <Route path="agency-profile" element={<AgencyProfile />} />
        
        {/* Simple placeholder routes */}
        <Route path="academics" element={<div className="p-4">Academic Info Page</div>} />
        <Route path="highlights" element={<div className="p-4">Highlights Page</div>} />
        <Route path="events" element={<div className="p-4">Events Page</div>} />
        <Route path="staff" element={<div className="p-4">Staff Management Page</div>} />
        <Route path="coaches" element={<div className="p-4">Coaches Management Page</div>} />
        <Route path="teams" element={<div className="p-4">Teams Management Page</div>} />
        <Route path="represented" element={<div className="p-4">Represented Athletes Page</div>} />
        <Route path="saved" element={<div className="p-4">Saved Items Page</div>} />
        
        {/* Catch-all route for unmatched dashboard paths */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;
