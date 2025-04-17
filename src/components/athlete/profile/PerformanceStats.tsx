
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChartIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface PerformanceStatsProps {
  profile: any;
  isEditing: boolean;
}

const PerformanceStats = ({ profile, isEditing }: PerformanceStatsProps) => {
  // Safely access stats - ensure it's always an object we can map over
  const stats = profile?.stats || {};
  
  // Handle loading state if profile is undefined
  if (!profile) {
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
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-50 p-3 rounded-lg text-center">
                <Skeleton className="h-8 w-16 mx-auto mb-2" />
                <Skeleton className="h-4 w-12 mx-auto" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-xl">
          <BarChartIcon className="h-5 w-5 mr-2" />
          Performance Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        {Object.keys(stats).length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {Object.entries(stats).map(([key, stat]: [string, any]) => (
              <div 
                key={key} 
                className="bg-gray-50 p-3 rounded-lg text-center transition-all hover:bg-gray-100"
              >
                <p className="text-2xl sm:text-3xl font-bold text-highlyt-blue">{stat?.value}</p>
                <p className="text-xs sm:text-sm text-gray-600">{stat?.label || key}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500">
            No statistics available yet
          </div>
        )}
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
