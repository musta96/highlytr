
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import AthleteProfile from '@/components/athlete/AthleteProfile';
import EnhancedAthleteProfile from '@/components/athlete/EnhancedAthleteProfile';
import SearchPage from '@/components/search/SearchPage';
import ConnectionsPage from '@/components/connections/ConnectionsPage';
import MessagesPage from '@/components/messaging/MessagesPage';
import NotificationsPage from '@/components/notifications/NotificationsPage';
import SettingsPage from '@/components/settings/SettingsPage';
import CollegeProfile from '@/components/college/CollegeProfile';
import AgencyProfile from '@/components/agency/AgencyProfile';

// Import placeholder for pages we haven't built yet
import NotFound from './NotFound';

const Dashboard = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<DashboardOverview />} />
        <Route path="profile" element={<EnhancedAthleteProfile />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="connections" element={<ConnectionsPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="athletes/search" element={<SearchPage type="athletes" />} />
        <Route path="colleges/search" element={<SearchPage type="colleges" />} />
        
        {/* College profile */}
        <Route path="college-profile" element={<CollegeProfile />} />
        
        {/* Agency profile */}
        <Route path="agency-profile" element={<AgencyProfile />} />
        
        {/* These would be implemented with actual components */}
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

export default Dashboard;
