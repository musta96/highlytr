
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart2, LineChart, PieChart, Calendar } from 'lucide-react';
import RecruitmentOverview from '@/components/analytics/RecruitmentOverview';
import EngagementMetrics from '@/components/analytics/EngagementMetrics';
import CollegeInterestChart from '@/components/analytics/CollegeInterestChart';
import RecruiterActivity from './RecruiterActivity';
import TimelineView from './TimelineView';

interface AnalyticsTabsProps {
  dateRange: '7d' | '30d' | '90d' | '1y';
}

const AnalyticsTabs = ({ dateRange }: AnalyticsTabsProps) => {
  return (
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
  );
};

export default AnalyticsTabs;
