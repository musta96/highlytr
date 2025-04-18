
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Stat } from '@/types/stats';
import { formatStatValue, getStatColor } from '@/utils/statsFormatter';

interface StatCardProps {
  title: string;
  stats: Record<string, any>;
  isEditing: boolean;
  onAddStat: () => void;
}

export const StatCard = ({ title, stats, isEditing, onAddStat }: StatCardProps) => {
  const statsArray = Object.entries(stats).map(([key, data]) => ({
    id: key,
    ...data
  }));

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">{title}</CardTitle>
          {isEditing && (
            <Button variant="ghost" size="sm" onClick={onAddStat}>
              <Plus className="h-4 w-4 mr-1" /> Add Stat
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {statsArray.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {statsArray.map((stat: any) => (
              <div 
                key={stat.id}
                className="bg-gray-50 p-4 rounded-lg text-center transition-all hover:shadow-md hover:bg-gray-100 cursor-pointer group"
              >
                <div className="flex items-center justify-center mb-1">
                  <p className={`text-2xl sm:text-3xl font-bold ${getStatColor(stat.value)}`}>
                    {formatStatValue(stat.value)}
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-800">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            No stats added yet.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
