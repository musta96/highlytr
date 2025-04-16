
import React from 'react';
import SocialFeed from '../feed/SocialFeed';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/auth';
import { ArrowRight, Bell, Calendar, Users } from 'lucide-react';

const HomeView = () => {
  const { user, accountType } = useAuth();
  
  const firstName = user?.user_metadata?.firstName || 'there';

  return (
    <div className="grid md:grid-cols-7 gap-6">
      {/* Main content - Social feed */}
      <div className="md:col-span-5">
        <h1 className="text-3xl font-bold mb-6">Welcome back, {firstName}!</h1>
        
        <SocialFeed />
      </div>
      
      {/* Sidebar */}
      <div className="md:col-span-2 space-y-4">
        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-4 w-4" /> 
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-md">
                <p className="font-medium">Recruitment Webinar</p>
                <p className="text-xs text-muted-foreground">May 2, 4:00 PM</p>
              </div>
              <div className="p-3 bg-muted rounded-md">
                <p className="font-medium">Summer Showcase</p>
                <p className="text-xs text-muted-foreground">June 15, All day</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="mt-4 w-full">
              View All Events
            </Button>
          </CardContent>
        </Card>
        
        {/* Connections/Network */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-4 w-4" />
              {accountType === 'Athlete' ? 'College Matches' : 'Recommended Connections'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {accountType === 'Athlete' ? (
                <>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center">UC</div>
                    <div>
                      <p className="font-medium">UCLA</p>
                      <p className="text-xs text-muted-foreground">98% match</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center">SC</div>
                    <div>
                      <p className="font-medium">Stanford</p>
                      <p className="text-xs text-muted-foreground">94% match</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">JD</div>
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-xs text-muted-foreground">Basketball • Point Guard</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">AS</div>
                    <div>
                      <p className="font-medium">Amy Smith</p>
                      <p className="text-xs text-muted-foreground">Soccer • Forward</p>
                    </div>
                  </div>
                </>
              )}
            </div>
            <Button variant="ghost" size="sm" className="mt-4 w-full flex items-center justify-center gap-1">
              View All <ArrowRight className="h-3 w-3" />
            </Button>
          </CardContent>
        </Card>
        
        {/* Recent Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Recent Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border-l-2 border-primary">
                <p className="text-sm">Your highlight reel received 20 views</p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
              <div className="p-3 border-l-2 border-primary">
                <p className="text-sm">Coach Wilson viewed your profile</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="mt-4 w-full">
              View All Notifications
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomeView;
