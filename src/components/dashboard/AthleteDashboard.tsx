
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Video, 
  Search, 
  Edit, 
  MessageSquare,
  Medal,
  BarChart2,
  ArrowUpRight
} from 'lucide-react';
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

const AthleteDashboard = () => {
  const { user } = useAuth();
  const firstName = user?.user_metadata?.firstName || 'Athlete';
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {firstName}</h1>
          <p className="text-muted-foreground">Here's what's happening with your recruiting journey</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Video className="mr-2 h-4 w-4" />
            Upload Video
          </Button>
          <Button size="sm">
            <Search className="mr-2 h-4 w-4" />
            Find Colleges
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Profile Completion</CardTitle>
            <CardDescription>Complete your profile to increase visibility</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Overall Progress</span>
                  <span className="font-medium">33%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-1/3" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="border rounded-md p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Highlight Videos</span>
                    <Badge variant="outline">0/3</Badge>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full">
                    <div className="bg-primary h-full w-0" />
                  </div>
                </div>
                
                <div className="border rounded-md p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Academics</span>
                    <Badge variant="outline">1/3</Badge>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full">
                    <div className="bg-primary h-full w-1/3" />
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full" asChild>
                <Link to="/dashboard/profile">
                  <Edit className="mr-2 h-4 w-4" />
                  Complete Your Profile
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Your activity from the past 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 text-center">
                <p className="text-3xl font-bold">42</p>
                <p className="text-sm text-muted-foreground">Profile Views</p>
                <span className="text-xs inline-flex items-center text-green-600">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  12% from last week
                </span>
              </div>
              <div className="border rounded-lg p-4 text-center">
                <p className="text-3xl font-bold">5</p>
                <p className="text-sm text-muted-foreground">College Saves</p>
                <span className="text-xs inline-flex items-center text-green-600">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  3 new
                </span>
              </div>
            </div>
            
            <div className="mt-4 space-y-3">
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-md">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New Messages</p>
                    <p className="text-xs text-muted-foreground">3 coaches messaged you</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/dashboard/messages">View</Link>
                </Button>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-md">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Medal className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Leaderboard Position</p>
                    <p className="text-xs text-muted-foreground">You're in the top 20%</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/dashboard/leaderboard">View</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <h2 className="text-xl font-bold mt-4">Colleges You May Like</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <div className="h-32 bg-muted relative">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                University Logo {i}
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">University {String.fromCharCode(64 + i)}</h3>
                  <p className="text-sm text-muted-foreground">Basketball, Division I</p>
                </div>
                <Badge variant="secondary">98% Match</Badge>
              </div>
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="outline" className="w-full">View</Button>
                <Button size="sm" className="w-full">Connect</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-center mt-2">
        <Button variant="ghost" asChild>
          <Link to="/dashboard/colleges/search">
            View More Colleges
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default AthleteDashboard;
