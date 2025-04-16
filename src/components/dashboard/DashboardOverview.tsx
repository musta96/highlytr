
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { 
  Eye, 
  MessageCircle, 
  Bell, 
  Users, 
  ArrowRight, 
  Video, 
  Edit, 
  Search, 
  BookOpen,
  Trophy,
  Medal
} from 'lucide-react';
import XPBar from './XPBar';
import LeaderboardPreview from './LeaderboardPreview';
import { useAuth } from '@/hooks/useAuth';

const profileViewsData = [
  { name: 'Mon', views: 4 },
  { name: 'Tue', views: 7 },
  { name: 'Wed', views: 5 },
  { name: 'Thu', views: 8 },
  { name: 'Fri', views: 12 },
  { name: 'Sat', views: 10 },
  { name: 'Sun', views: 9 },
];

// Sample leaderboard data
const sampleLeaderboardData = [
  { id: '1', name: 'Maria S.', rank: 1, score: 345, change: 0 },
  { id: '2', name: 'James T.', rank: 2, score: 312, change: 2 },
  { id: 'current-user', name: 'Alex D.', rank: 3, score: 298, change: 5 },
  { id: '4', name: 'Sarah M.', rank: 4, score: 276, change: -2 },
  { id: '5', name: 'Kevin P.', rank: 5, score: 254, change: -1 },
];

// Sample badges
const sampleBadges = [
  { name: 'Rising Star', icon: 'Star', description: 'Improved profile views by 50% in one week' },
  { name: 'Recruiter Favorite', icon: 'Award', description: 'Added to 5+ college lists' },
];

const DashboardOverview = () => {
  const { user, accountType } = useAuth();
  
  // Define quick links based on account type
  const getQuickLinks = () => {
    if (accountType === 'athlete') {
      return (
        <>
          <Link to="/profile/edit">
            <Button variant="outline" className="w-full justify-start">
              <Edit className="mr-2 h-4 w-4" />
              Update Profile
            </Button>
          </Link>
          <Link to="/videos/upload">
            <Button variant="outline" className="w-full justify-start">
              <Video className="mr-2 h-4 w-4" />
              Upload Video
            </Button>
          </Link>
          <Link to="/dashboard/colleges/search">
            <Button variant="outline" className="w-full justify-start">
              <Search className="mr-2 h-4 w-4" />
              Find Colleges
            </Button>
          </Link>
          <Link to="/dashboard/analytics">
            <Button variant="outline" className="w-full justify-start">
              <BarChart className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
          </Link>
        </>
      );
    } else if (accountType === 'college') {
      return (
        <>
          <Link to="/dashboard/athletes/search">
            <Button variant="outline" className="w-full justify-start">
              <Search className="mr-2 h-4 w-4" />
              Find Athletes
            </Button>
          </Link>
          <Link to="/college/edit">
            <Button variant="outline" className="w-full justify-start">
              <Edit className="mr-2 h-4 w-4" />
              Update College Profile
            </Button>
          </Link>
          <Link to="/staff/manage">
            <Button variant="outline" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Manage Staff Accounts
            </Button>
          </Link>
          <Link to="/dashboard/analytics">
            <Button variant="outline" className="w-full justify-start">
              <BarChart className="mr-2 h-4 w-4" />
              Recruiting Analytics
            </Button>
          </Link>
        </>
      );
    } else if (accountType === 'agency') {
      return (
        <>
          <Link to="/dashboard/represented">
            <Button variant="outline" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Manage Athletes
            </Button>
          </Link>
          <Link to="/dashboard/colleges/search">
            <Button variant="outline" className="w-full justify-start">
              <Search className="mr-2 h-4 w-4" />
              Find Colleges
            </Button>
          </Link>
          <Link to="/agency/edit">
            <Button variant="outline" className="w-full justify-start">
              <Edit className="mr-2 h-4 w-4" />
              Update Agency Profile
            </Button>
          </Link>
          <Link to="/dashboard/placements">
            <Button variant="outline" className="w-full justify-start">
              <Medal className="mr-2 h-4 w-4" />
              View Placements
            </Button>
          </Link>
        </>
      );
    }
    
    return null;
  };
  
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
            <CardHeader className="pb-2">
              <CardTitle>My Progress</CardTitle>
              <CardDescription>Level up your recruiting journey</CardDescription>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        )}
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
            <CardDescription>Last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">55</div>
            <p className="text-xs text-muted-foreground">
              +12% from last week
            </p>
            <div className="h-[120px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={profileViewsData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    tickLine={false} 
                    axisLine={false}
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis 
                    hide 
                    domain={[0, 'dataMax + 2']}
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                    contentStyle={{ borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Bar 
                    dataKey="views" 
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]}
                    barSize={25}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">New Messages</CardTitle>
            <CardDescription>Unread conversations</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col h-full">
            <div className="text-2xl font-bold mb-1">3</div>
            <div className="space-y-4 mt-4 flex-grow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Coach Smith</p>
                    <p className="text-xs text-gray-500">Stanford University</p>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-highlyt-blue"></div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Coach Johnson</p>
                    <p className="text-xs text-gray-500">UCLA</p>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-highlyt-blue"></div>
              </div>
            </div>
            
            <Link to="/dashboard/messages">
              <Button variant="ghost" size="sm" className="w-full mt-4">
                View All Messages
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="sm:col-span-2 lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
            <CardDescription>What you can do now</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {getQuickLinks()}
          </CardContent>
        </Card>
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
        
        {accountType === 'athlete' && (
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Virtual Recruiting Meet</h4>
                      <p className="text-sm text-gray-600">Stanford University</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">May 15, 2025</p>
                      <p className="text-xs text-gray-600">3:00 PM CET</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Q&A with Coach Williams</h4>
                      <p className="text-sm text-gray-600">UCLA</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">May 22, 2025</p>
                      <p className="text-xs text-gray-600">5:00 PM CET</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Show profile completion card for athletes */}
        {accountType === 'athlete' && (
          <Card className={accountType === 'athlete' ? "md:col-span-2" : ""}>
            <CardHeader>
              <CardTitle>Profile Completion</CardTitle>
              <CardDescription>Complete your profile to get noticed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-highlyt-blue h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Link to="/profile/academic">
                    <Button variant="outline" size="sm" className="w-full text-left justify-start">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Add Academic Records
                    </Button>
                  </Link>
                  
                  <Link to="/videos/upload">
                    <Button variant="outline" size="sm" className="w-full text-left justify-start">
                      <Video className="mr-2 h-4 w-4" />
                      Upload Game Footage
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DashboardOverview;
