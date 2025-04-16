
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChartIcon } from 'lucide-react';

interface PerformanceStatsProps {
  profile: any;
  isEditing: boolean;
}

const PerformanceStats = ({ profile, isEditing }: PerformanceStatsProps) => {
  // Safely access stats - ensure it's always an object we can map over
  const stats = profile?.stats || {};
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChartIcon className="h-5 w-5 mr-2" />
          Performance Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {Object.entries(stats).map(([key, stat]: [string, any]) => (
            <div key={key} className="bg-gray-50 p-4 rounded-lg text-center">
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
