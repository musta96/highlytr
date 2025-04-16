
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Edit, Users, PlusCircle, BarChart2, MessageSquare, ArrowUpRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';

const CollegeDashboard = () => {
  const { user } = useAuth();
  const collegeName = user?.user_metadata?.orgName || 'University';
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">{collegeName} Dashboard</h1>
          <p className="text-muted-foreground">Manage your recruiting pipeline and team needs</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create List
          </Button>
          <Button size="sm">
            <Search className="mr-2 h-4 w-4" />
            Find Athletes
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Recruiting Summary</CardTitle>
            <CardDescription>Current recruiting activity and pipeline</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Total Scouting Lists</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Viewed Athletes</span>
                <span className="font-medium">27</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Unanswered Messages</span>
                <span className="font-medium text-amber-600">4</span>
              </div>
              
              <div className="pt-3 flex justify-between items-center">
                <span className="font-medium">Recent Activity</span>
                <Badge variant="outline">Last 7 days</Badge>
              </div>
              
              <div className="space-y-2">
                <div className="bg-muted/30 p-2 rounded-md text-sm">
                  <div className="flex justify-between">
                    <span>John Smith viewed your profile</span>
                    <span className="text-xs text-muted-foreground">2h ago</span>
                  </div>
                </div>
                <div className="bg-muted/30 p-2 rounded-md text-sm">
                  <div className="flex justify-between">
                    <span>Emma Johnson sent you a message</span>
                    <span className="text-xs text-muted-foreground">Yesterday</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Roster Needs</CardTitle>
            <CardDescription>Fill gaps in your roster with targeted recruiting</CardDescription>
          </CardHeader>
          <CardContent>
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
              
              <div className="mt-4 space-y-3">
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Manage Teams</p>
                      <p className="text-xs text-muted-foreground">Update roster needs</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/dashboard/teams">View</Link>
                  </Button>
                </div>
                
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <BarChart2 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Analytics</p>
                      <p className="text-xs text-muted-foreground">Recruiting insights</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/dashboard/insights">View</Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <h2 className="text-xl font-bold mt-4">Suggested Athletes</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <div className="h-32 bg-muted relative">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                Athlete Photo {i}
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">Player {i}</h3>
                  <p className="text-sm text-muted-foreground">Point Guard, 6'2"</p>
                </div>
                <Badge variant="secondary" className="text-xs">96% Match</Badge>
              </div>
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="outline" className="w-full">Profile</Button>
                <Button size="sm" className="w-full">Contact</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-center mt-2">
        <Button variant="ghost" asChild>
          <Link to="/dashboard/athletes/search">
            View More Athletes
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default CollegeDashboard;
