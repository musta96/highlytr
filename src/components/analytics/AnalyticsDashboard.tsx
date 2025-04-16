
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RecruitmentOverview from '@/components/analytics/RecruitmentOverview';
import EngagementMetrics from '@/components/analytics/EngagementMetrics';
import CollegeInterestChart from '@/components/analytics/CollegeInterestChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, LineChart, BarChart2, PieChart } from 'lucide-react';
import RecruiterActivity from './RecruiterActivity';
import TimelineView from './TimelineView';

const AnalyticsDashboard = () => {
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Track your recruitment progress and engagement</p>
        </div>
        
        <div className="inline-flex items-center rounded-md border border-input bg-background p-1">
          {['7d', '30d', '90d', '1y'].map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range as '7d' | '30d' | '90d' | '1y')}
              className={`px-3 py-1.5 text-sm transition-colors ${
                dateRange === range
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              } rounded-sm`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="engagement" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            Engagement
          </TabsTrigger>
          <TabsTrigger value="colleges" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            College Interest
          </TabsTrigger>
          <TabsTrigger value="timeline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Timeline
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <RecruitmentOverview dateRange={dateRange} />
        </TabsContent>
        
        <TabsContent value="engagement" className="space-y-6">
          <EngagementMetrics dateRange={dateRange} />
          <RecruiterActivity dateRange={dateRange} />
        </TabsContent>
        
        <TabsContent value="colleges" className="space-y-6">
          <CollegeInterestChart dateRange={dateRange} />
        </TabsContent>
        
        <TabsContent value="timeline" className="space-y-6">
          <TimelineView dateRange={dateRange} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;
