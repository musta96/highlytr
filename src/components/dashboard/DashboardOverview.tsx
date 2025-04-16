
import React from 'react';
import { Card } from "@/components/ui/card";
import { useAuth } from '@/hooks/useAuth';
import XPBar from './XPBar';
import LeaderboardPreview from './LeaderboardPreview';
import ProfileViewsCard from './cards/ProfileViewsCard';
import MessagesCard from './cards/MessagesCard';
import QuickActionsCard from './cards/QuickActionsCard';
import EventsCard from './cards/EventsCard';
import ProfileCompletionCard from './cards/ProfileCompletionCard';
import { profileViewsData, sampleLeaderboardData, sampleBadges } from './data/dashboardData';

const DashboardOverview = () => {
  const { user, accountType } = useAuth();
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Dashboard Overview</h2>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your profile.
        </p>
      </div>
      
      {/* Main dashboard cards - now more responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {accountType === 'athlete' && (
          <Card className="col-span-full sm:col-span-2 lg:col-span-1 order-first lg:order-none">
            <XPBar 
              currentXP={650} 
              maxXP={1000} 
              level={3} 
              badges={sampleBadges}
            />
            
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded bg-muted/30">
                <p className="text-lg font-bold">42</p>
                <p className="text-xs text-muted-foreground">Profile Views</p>
              </div>
              <div className="p-2 rounded bg-muted/30">
                <p className="text-lg font-bold">5</p>
                <p className="text-xs text-muted-foreground">Videos</p>
              </div>
              <div className="p-2 rounded bg-muted/30">
                <p className="text-lg font-bold">8</p>
                <p className="text-xs text-muted-foreground">College Saves</p>
              </div>
            </div>
          </Card>
        )}
        
        <ProfileViewsCard profileViewsData={profileViewsData} />
        <MessagesCard />
        <QuickActionsCard accountType={accountType} />
      </div>
      
      {/* Secondary content - better organized for mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Leaderboard preview - only shown for athletes */}
        {accountType === 'athlete' && (
          <div>
            <LeaderboardPreview 
              users={sampleLeaderboardData}
              currentUserId="current-user"
            />
          </div>
        )}
        
        {accountType === 'athlete' && <EventsCard />}
        
        {/* Show profile completion card for athletes */}
        {accountType === 'athlete' && (
          <div className={accountType === 'athlete' ? "md:col-span-2" : ""}>
            <ProfileCompletionCard />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardOverview;
