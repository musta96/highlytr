
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
import { useAuth } from '@/hooks/auth';

// Import placeholder for pages we haven't built yet
import NotFound from './NotFound';

// Dashboard type-specific components
const AthleteDashboard = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold">Athlete Dashboard</h1>
    
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-lg border bg-card shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Welcome to your Athlete Dashboard</h2>
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
          <div className="bg-primary h-full w-1/3" />
        </div>
        <p className="text-muted-foreground mt-2">Complete your profile to increase visibility (33%)</p>
        <button className="mt-4 inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2">
          Complete Your Profile
        </button>
      </div>
      
      <div className="rounded-lg border bg-card shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center p-3 border rounded-md">
            <span className="text-2xl font-bold">0</span>
            <span className="text-muted-foreground text-sm">Profile Views</span>
          </div>
          <div className="flex flex-col items-center p-3 border rounded-md">
            <span className="text-2xl font-bold">0</span>
            <span className="text-muted-foreground text-sm">College Saves</span>
          </div>
        </div>
      </div>
    </div>
    
    <h2 className="text-xl font-bold mt-8">Colleges You May Like</h2>
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-lg border p-4">
        <div className="h-32 bg-muted rounded-md mb-3"></div>
        <h3 className="font-semibold">University A</h3>
        <p className="text-sm text-muted-foreground">Basketball, Division I</p>
      </div>
      <div className="rounded-lg border p-4">
        <div className="h-32 bg-muted rounded-md mb-3"></div>
        <h3 className="font-semibold">College B</h3>
        <p className="text-sm text-muted-foreground">Basketball, Division II</p>
      </div>
      <div className="rounded-lg border p-4">
        <div className="h-32 bg-muted rounded-md mb-3"></div>
        <h3 className="font-semibold">University C</h3>
        <p className="text-sm text-muted-foreground">Basketball, Division I</p>
      </div>
    </div>
    
    <h2 className="text-xl font-bold mt-8">Quick Actions</h2>
    <div className="grid gap-4 md:grid-cols-4">
      <button className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-accent">
        <svg className="h-8 w-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        <span className="text-sm">Upload Video</span>
      </button>
      <button className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-accent">
        <svg className="h-8 w-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
        <span className="text-sm">Edit Profile</span>
      </button>
      <button className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-accent">
        <svg className="h-8 w-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="text-sm">Search Colleges</span>
      </button>
      <button className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-accent">
        <svg className="h-8 w-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <span className="text-sm">Messages</span>
      </button>
    </div>
  </div>
);

const CollegeDashboard = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold">College Dashboard</h1>
    
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-lg border bg-card shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Recruiting Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span>Scouting Lists</span>
            <span className="font-medium">0</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Viewed Athletes</span>
            <span className="font-medium">0</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Unanswered Messages</span>
            <span className="font-medium">0</span>
          </div>
        </div>
      </div>
      
      <div className="rounded-lg border bg-card shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Roster Needs Progress</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Guards</span>
              <span>1/3</span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div className="bg-primary h-full w-1/3" />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Forwards</span>
              <span>0/2</span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div className="bg-primary h-full w-0" />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Centers</span>
              <span>0/1</span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div className="bg-primary h-full w-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <h2 className="text-xl font-bold mt-8">Suggested Athletes</h2>
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-lg border p-4">
        <div className="h-32 bg-muted rounded-md mb-3"></div>
        <h3 className="font-semibold">John Doe</h3>
        <p className="text-sm text-muted-foreground">Point Guard, 6'2"</p>
      </div>
      <div className="rounded-lg border p-4">
        <div className="h-32 bg-muted rounded-md mb-3"></div>
        <h3 className="font-semibold">Jane Smith</h3>
        <p className="text-sm text-muted-foreground">Shooting Guard, 5'11"</p>
      </div>
      <div className="rounded-lg border p-4">
        <div className="h-32 bg-muted rounded-md mb-3"></div>
        <h3 className="font-semibold">Mike Johnson</h3>
        <p className="text-sm text-muted-foreground">Forward, 6'7"</p>
      </div>
    </div>
    
    <h2 className="text-xl font-bold mt-8">Quick Actions</h2>
    <div className="grid gap-4 md:grid-cols-4">
      <button className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-accent">
        <svg className="h-8 w-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="text-sm">Search Athletes</span>
      </button>
      <button className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-accent">
        <svg className="h-8 w-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span className="text-sm">Create List</span>
      </button>
      <button className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-accent">
        <svg className="h-8 w-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <span className="text-sm">Inbox</span>
      </button>
      <button className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-accent">
        <svg className="h-8 w-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
        <span className="text-sm">Edit Profile</span>
      </button>
    </div>
  </div>
);

const AgencyDashboard = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold">Agency Dashboard</h1>
    
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-lg border bg-card shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Agency Overview</h2>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span>Athletes Represented</span>
            <span className="font-medium">0</span>
          </div>
          <div className="flex justify-between items-center">
            <span>College Conversations</span>
            <span className="font-medium">0</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Pending Placements</span>
            <span className="font-medium">0</span>
          </div>
        </div>
      </div>
      
      <div className="rounded-lg border bg-card shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Placement Funnel</h2>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span>Initial Contact</span>
            <span className="font-medium">0</span>
          </div>
          <div className="flex justify-between items-center">
            <span>In Discussions</span>
            <span className="font-medium">0</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Offers Made</span>
            <span className="font-medium">0</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Placed</span>
            <span className="font-medium">0</span>
          </div>
        </div>
      </div>
    </div>
    
    <h2 className="text-xl font-bold mt-8">Your Athletes</h2>
    <p className="text-muted-foreground">You don't have any athletes yet. Add athletes to get started.</p>
    
    <h2 className="text-xl font-bold mt-8">Quick Actions</h2>
    <div className="grid gap-4 md:grid-cols-4">
      <button className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-accent">
        <svg className="h-8 w-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
        <span className="text-sm">Add Athlete</span>
      </button>
      <button className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-accent">
        <svg className="h-8 w-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
        <span className="text-sm">Edit Profiles</span>
      </button>
      <button className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-accent">
        <svg className="h-8 w-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="text-sm">Search Colleges</span>
      </button>
      <button className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-accent">
        <svg className="h-8 w-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <span className="text-sm">Messages</span>
      </button>
    </div>
  </div>
);

const Dashboard = () => {
  const { accountType } = useAuth();

  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        {/* Default route - redirect to specific type dashboard based on account type */}
        <Route index element={
          accountType ? <Navigate to={`/dashboard/${accountType}`} replace /> : <DashboardOverview />
        } />
        
        {/* Type-specific dashboards */}
        <Route path="athlete" element={<AthleteDashboard />} />
        <Route path="college" element={<CollegeDashboard />} />
        <Route path="agency" element={<AgencyDashboard />} />
        
        {/* Common routes */}
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
