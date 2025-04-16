
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { getTrendData } from '@/services/analyticsService';

interface RecruitmentOverviewProps {
  dateRange: '7d' | '30d' | '90d' | '1y';
}

const RecruitmentOverview = ({ dateRange }: RecruitmentOverviewProps) => {
  const recruitmentData = getTrendData(dateRange, 'recruitment');
  const stageData = [
    { name: 'Initial Contact', value: 34 },
    { name: 'Profile Views', value: 28 },
    { name: 'Messages', value: 16 },
    { name: 'Video Views', value: 22 },
    { name: 'Offers', value: 8 },
    { name: 'Commitments', value: 3 }
  ];
  
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Recruitment Activity</CardTitle>
          <CardDescription>
            Summary of your recruitment interactions over the {dateRange} period
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={recruitmentData}
                margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
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
                  cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                  contentStyle={{ 
                    borderRadius: '8px', 
                    fontSize: '12px',
                    border: '1px solid #e2e8f0'
                  }}
                />
                <Bar 
                  dataKey="profileViews" 
                  name="Profile Views" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="messages" 
                  name="Messages" 
                  fill="hsl(var(--primary) / 0.8)" 
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="videoViews" 
                  name="Video Views" 
                  fill="hsl(var(--primary) / 0.6)" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Recruiting Funnel</CardTitle>
          <CardDescription>
            Breakdown of your recruitment pipeline stages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stageData}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 50, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" axisLine={false} tickLine={false} />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                  contentStyle={{ 
                    borderRadius: '8px', 
                    fontSize: '12px',
                    border: '1px solid #e2e8f0'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="hsl(var(--primary))" 
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Key Metrics</CardTitle>
          <CardDescription>
            Performance indicators for your recruitment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Profile Completion</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold">87%</p>
                <p className="text-xs text-green-600">+12%</p>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="bg-primary h-full" style={{ width: '87%' }} />
              </div>
            </div>
            
            <div className="space-y-2 border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Response Rate</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold">72%</p>
                <p className="text-xs text-green-600">+8%</p>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="bg-primary h-full" style={{ width: '72%' }} />
              </div>
            </div>
            
            <div className="space-y-2 border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">College Interest</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold">16</p>
                <p className="text-xs text-green-600">+3</p>
              </div>
            </div>
            
            <div className="space-y-2 border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Avg. Message Time</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold">1.4h</p>
                <p className="text-xs text-red-600">+0.2h</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecruitmentOverview;
