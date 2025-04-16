
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, PlusCircle, Users, BarChart2, MessageSquare, School, ArrowUpRight } from 'lucide-react';
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

const AgencyDashboard = () => {
  const { user } = useAuth();
  const agencyName = user?.user_metadata?.orgName || 'Agency';
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">{agencyName} Dashboard</h1>
          <p className="text-muted-foreground">Manage your athlete representation and placements</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Athlete
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
            <CardTitle>Agency Overview</CardTitle>
            <CardDescription>Your athlete representation and activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
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
              
              <div className="pt-3 mt-2 border-t">
                <div className="p-4 bg-muted/30 rounded-lg text-center">
                  <p className="text-sm mb-3">Get started by adding your first athlete</p>
                  <Button asChild>
                    <Link to="/dashboard/represented">Add Your First Athlete</Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Placement Funnel</CardTitle>
            <CardDescription>Track your athlete placement progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center p-2 border rounded-md">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium">1</span>
                  </div>
                  <span>Initial Contact</span>
                </div>
                <Badge variant="outline">0</Badge>
              </div>
              
              <div className="flex justify-between items-center p-2 border rounded-md">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium">2</span>
                  </div>
                  <span>In Discussions</span>
                </div>
                <Badge variant="outline">0</Badge>
              </div>
              
              <div className="flex justify-between items-center p-2 border rounded-md">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium">3</span>
                  </div>
                  <span>Offers Made</span>
                </div>
                <Badge variant="outline">0</Badge>
              </div>
              
              <div className="flex justify-between items-center p-2 border rounded-md bg-muted/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium">4</span>
                  </div>
                  <span>Successfully Placed</span>
                </div>
                <Badge variant="outline">0</Badge>
              </div>
            </div>
            
            <Button variant="outline" className="w-full" asChild>
              <Link to="/dashboard/placements">
                <BarChart2 className="mr-2 h-4 w-4" />
                View Full Placement Analytics
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <h2 className="text-xl font-bold mt-4">Recommended Colleges</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <div className="h-32 bg-muted relative">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                College Logo {i}
              </div>
            </div>
            <CardContent className="p-4">
              <div>
                <h3 className="font-semibold">University {String.fromCharCode(64 + i)}</h3>
                <p className="text-sm text-muted-foreground">Division I • Looking for Guards</p>
                <p className="text-xs mt-1 text-muted-foreground">Basketball, Soccer, Swimming</p>
              </div>
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="outline" className="w-full">Details</Button>
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

export default AgencyDashboard;
