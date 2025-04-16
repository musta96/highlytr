
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Medal, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';

const StatsOverviewCard = () => {
  return (
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
  );
};

export default StatsOverviewCard;
