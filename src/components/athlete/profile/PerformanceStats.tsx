
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  TrendingUp, 
  AlertCircle,
  Plus,
  ChevronRight
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatStatValue, getStatColor } from '@/utils/statsFormatter';

interface PerformanceStatsProps {
  profile: any;
  isEditing: boolean;
}

const PerformanceStats = ({ profile, isEditing }: PerformanceStatsProps) => {
  const stats = profile?.stats || {};
  
  if (!profile) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-xl">
            <BarChart className="h-5 w-5 mr-2" />
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
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center text-xl">
            <BarChart className="h-5 w-5 mr-2" />
            Performance Statistics
          </CardTitle>
          {isEditing && (
            <Button variant="ghost" size="sm" className="text-xs">
              <Plus className="h-4 w-4 mr-1" /> Add Stat
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {Object.keys(stats).length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {Object.entries(stats).map(([key, stat]: [string, any]) => (
              <TooltipProvider key={key}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="bg-gray-50 p-4 rounded-lg text-center transition-all hover:shadow-md hover:bg-gray-100 cursor-pointer group">
                      <div className="flex items-center justify-center mb-1">
                        <p className={`text-2xl sm:text-3xl font-bold ${getStatColor(stat.value)}`}>
                          {formatStatValue(stat.value)}
                        </p>
                        {stat.trend && (
                          <TrendingUp className="h-4 w-4 ml-1 text-green-500" />
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-800">
                        {stat.label || key}
                      </p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="text-sm">
                      <p className="font-semibold">{stat.label || key}</p>
                      {stat.description && (
                        <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border-2 border-dashed rounded-lg">
            <AlertCircle className="h-8 w-8 mx-auto text-gray-400 mb-2" />
            <p className="text-gray-600 font-medium">No Statistics Available</p>
            <p className="text-sm text-gray-500 mt-1 mb-4">
              Add your performance statistics to showcase your abilities
            </p>
            {isEditing && (
              <Button variant="outline" size="sm" className="gap-1">
                <Plus className="h-4 w-4" /> Add Your First Stat
              </Button>
            )}
          </div>
        )}
        
        {!isEditing && Object.keys(stats).length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full mt-4 text-gray-600 hover:text-gray-800"
          >
            View Detailed Statistics <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default PerformanceStats;
