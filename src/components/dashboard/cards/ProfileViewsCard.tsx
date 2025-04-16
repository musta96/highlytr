
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface ProfileViewsCardProps {
  profileViewsData: {
    name: string;
    views: number;
  }[];
}

const ProfileViewsCard = ({ profileViewsData }: ProfileViewsCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
        <CardDescription>Last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">55</div>
        <p className="text-xs text-muted-foreground">
          +12% from last week
        </p>
        <div className="h-[120px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={profileViewsData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name" 
                tickLine={false} 
                axisLine={false}
                tick={{ fontSize: 10 }}
              />
              <YAxis 
                hide 
                domain={[0, 'dataMax + 2']}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                contentStyle={{ borderRadius: '8px', fontSize: '12px' }}
              />
              <Bar 
                dataKey="views" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]}
                barSize={25}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileViewsCard;
