
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Medal, ArrowUpRight, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils";

interface StatsOverviewCardProps {
  className?: string;
}

const StatsOverviewCard = ({ className }: StatsOverviewCardProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-500" /> 
          Quick Stats
        </CardTitle>
        <CardDescription>Your activity from the past 30 days</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-100 dark:border-blue-800">
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">42</p>
            <p className="text-sm text-blue-600/80 dark:text-blue-400/80">Profile Views</p>
            <span className="text-xs inline-flex items-center text-green-600 dark:text-green-400 mt-2">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              12% from last week
            </span>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-100 dark:border-purple-800">
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">5</p>
            <p className="text-sm text-purple-600/80 dark:text-purple-400/80">College Saves</p>
            <span className="text-xs inline-flex items-center text-green-600 dark:text-green-400 mt-2">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              3 new
            </span>
          </div>
        </div>
        
        <div className="mt-4 space-y-3">
          <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-blue-600 dark:text-blue-400" />
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
          
          <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center">
                <Medal className="h-4 w-4 text-amber-600 dark:text-amber-400" />
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
