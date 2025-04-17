
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
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-xl">
          <BarChartIcon className="h-5 w-5 mr-2" />
          Performance Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {Object.entries(stats).map(([key, stat]: [string, any]) => (
            <div 
              key={key} 
              className="bg-gray-50 p-3 rounded-lg text-center transition-all hover:bg-gray-100"
            >
              <p className="text-2xl sm:text-3xl font-bold text-highlyt-blue">{stat.value}</p>
              <p className="text-xs sm:text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
        {isEditing && (
          <Button variant="outline" className="mt-4 w-full text-sm">
            Edit Statistics
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default PerformanceStats;
