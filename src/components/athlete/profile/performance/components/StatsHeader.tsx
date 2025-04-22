
import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Plus } from 'lucide-react';
import { StatsHeaderProps } from '../types';

export const StatsHeader = ({ isEditing, onAddStat }: StatsHeaderProps) => {
  return (
    <CardHeader className="pb-3">
      <div className="flex justify-between items-center">
        <CardTitle className="flex items-center text-xl">
          <BarChart className="h-5 w-5 mr-2" />
          Performance Statistics
        </CardTitle>
        
        {isEditing && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs flex items-center gap-1"
            onClick={onAddStat}
          >
            <Plus className="h-4 w-4" /> Add Stat
          </Button>
        )}
      </div>
    </CardHeader>
  );
};
