
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import AthleteDashboard from './AthleteDashboard';
import CollegeDashboard from './CollegeDashboard';
import AgencyDashboard from './AgencyDashboard';
import HomeView from './HomeView';
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
        {/* Default route shows the social feed HomeView */}
        <Route index element={<HomeView />} />
        
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
        
        {/* Discovery routes */}
        <Route path="search" element={<SearchPage type="athletes" />} />
        <Route path="athletes/search" element={<SearchPage type="athletes" />} />
        <Route path="colleges/search" element={<SearchPage type="colleges" />} />
        
        {/* Profile routes */}
        <Route path="college-profile" element={<CollegeProfile />} />
        <Route path="agency-profile" element={<AgencyProfile />} />
        
        {/* Role-specific feature routes */}
        <Route path="academics" element={<div className="p-4 space-y-4">
          <h1 className="text-2xl font-bold">Academic Information</h1>
          <p>Track and showcase your academic achievements, GPA, and coursework.</p>
        </div>} />
        <Route path="highlights" element={<div className="p-4 space-y-4">
          <h1 className="text-2xl font-bold">Highlights</h1>
          <p>Upload and manage your highlight videos to showcase your skills.</p>
        </div>} />
        <Route path="events" element={<div className="p-4 space-y-4">
          <h1 className="text-2xl font-bold">Events</h1>
          <p>Keep track of upcoming games, tournaments, and recruiting events.</p>
        </div>} />
        <Route path="staff" element={<div className="p-4 space-y-4">
          <h1 className="text-2xl font-bold">Staff Management</h1>
          <p>Manage your coaching and support staff within your organization.</p>
        </div>} />
        <Route path="coaches" element={<div className="p-4 space-y-4">
          <h1 className="text-2xl font-bold">Coaches Management</h1>
          <p>Manage your coaching staff and their roles within your program.</p>
        </div>} />
        <Route path="teams" element={<div className="p-4 space-y-4">
          <h1 className="text-2xl font-bold">Teams Management</h1>
          <p>Manage your sports teams, roster spots, and positions.</p>
        </div>} />
        <Route path="represented" element={<div className="p-4 space-y-4">
          <h1 className="text-2xl font-bold">Represented Athletes</h1>
          <p>Manage the athletes you represent and track their recruitment progress.</p>
        </div>} />
        <Route path="saved" element={<div className="p-4 space-y-4">
          <h1 className="text-2xl font-bold">Saved Items</h1>
          <p>Access your saved colleges, athletes, and other content.</p>
        </div>} />
        <Route path="leaderboard" element={<div className="p-4 space-y-4">
          <h1 className="text-2xl font-bold">Leaderboard</h1>
          <p>See top athletes ranked by performance, engagement, and recruitment activity.</p>
        </div>} />
        <Route path="insights" element={<div className="p-4 space-y-4">
          <h1 className="text-2xl font-bold">Insights & Analytics</h1>
          <p>View detailed analytics on your recruiting efforts and athlete engagement.</p>
          <div className="p-4 bg-muted/50 rounded-lg border border-muted">
            <p className="text-muted-foreground">Premium Feature - Coming Soon</p>
          </div>
        </div>} />
        <Route path="placements" element={<div className="p-4 space-y-4">
          <h1 className="text-2xl font-bold">Placement Tracking</h1>
          <p>Track your athlete placements and recruitment pipeline.</p>
        </div>} />
        
        {/* Catch-all route for unmatched dashboard paths */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;
