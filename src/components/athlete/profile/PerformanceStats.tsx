
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PerformanceStatsProps {
  profile: any;
  isEditing: boolean;
}

const PerformanceStats = ({ profile, isEditing }: PerformanceStatsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {profile.stats.map((stat: any, index: number) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-highlyt-blue">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
        {isEditing && (
          <Button variant="outline" className="mt-6 w-full">
            Edit Statistics
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default PerformanceStats;
