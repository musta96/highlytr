
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
import { Eye, MessageCircle, Bell, Users, ArrowRight } from 'lucide-react';

const profileViewsData = [
  { name: 'Mon', views: 4 },
  { name: 'Tue', views: 7 },
  { name: 'Wed', views: 5 },
  { name: 'Thu', views: 8 },
  { name: 'Fri', views: 12 },
  { name: 'Sat', views: 10 },
  { name: 'Sun', views: 9 },
];

const DashboardOverview = () => {
  // This would come from user authentication in a real app
  // Define userType as a generic string to avoid type comparison issues
  const userType: string = 'athlete';
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="h3 mb-2">Dashboard Overview</h2>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your profile.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            
            <Link to="/messages">
              <Button variant="ghost" size="sm" className="w-full mt-4">
                View All Messages
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
            <CardDescription>What you can do now</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {userType === 'athlete' && (
              <>
                <Link to="/profile/edit">
                  <Button variant="outline" className="w-full justify-start">
                    <Eye className="mr-2 h-4 w-4" />
                    Update Profile
                  </Button>
                </Link>
                <Link to="/videos/upload">
                  <Button variant="outline" className="w-full justify-start">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2 h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    Upload Video
                  </Button>
                </Link>
                <Link to="/colleges/search">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Find Colleges
                  </Button>
                </Link>
              </>
            )}
            
            {userType === 'college' && (
              <>
                <Link to="/athletes/search">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Find Athletes
                  </Button>
                </Link>
                <Link to="/college/edit">
                  <Button variant="outline" className="w-full justify-start">
                    <Eye className="mr-2 h-4 w-4" />
                    Update College Profile
                  </Button>
                </Link>
                <Link to="/staff/manage">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Manage Staff Accounts
                  </Button>
                </Link>
              </>
            )}
          </CardContent>
        </Card>
      </div>
      
      {userType === 'athlete' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          
          <Card>
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
                
                <Link to="/profile/edit">
                  <Button variant="outline" size="sm" className="w-full text-left justify-start">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2 h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Add Academic Records
                  </Button>
                </Link>
                
                <Link to="/videos/upload">
                  <Button variant="outline" size="sm" className="w-full text-left justify-start">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2 h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Upload Game Footage
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DashboardOverview;
