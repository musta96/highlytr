
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getTrendData } from '@/services/analyticsService';

interface EngagementMetricsProps {
  dateRange: '7d' | '30d' | '90d' | '1y';
}

const EngagementMetrics = ({ dateRange }: EngagementMetricsProps) => {
  const engagementData = getTrendData(dateRange, 'engagement');
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Engagement Trends</CardTitle>
        <CardDescription>
          Track how coaches and recruiters engage with your profile
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={engagementData}
              margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '8px', 
                  fontSize: '12px',
                  border: '1px solid #e2e8f0'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="profileViews" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                activeDot={{ r: 6 }}
                name="Profile Views"
              />
              <Line 
                type="monotone" 
                dataKey="videoViews" 
                stroke="rgba(234, 88, 12, 0.8)" 
                strokeWidth={2}
                activeDot={{ r: 6 }}
                name="Video Views"
              />
              <Line 
                type="monotone" 
                dataKey="messages" 
                stroke="rgba(22, 163, 74, 0.8)" 
                strokeWidth={2}
                activeDot={{ r: 6 }}
                name="Messages"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default EngagementMetrics;
