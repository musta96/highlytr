
import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Plus } from 'lucide-react';

interface StatsHeaderProps {
  isEditing: boolean;
  onAddStat: () => void;
}

export const StatsHeader: React.FC<StatsHeaderProps> = ({ isEditing, onAddStat }) => {
  return (
    <CardHeader className="pb-3">
      <div className="flex justify-between items-center">
        <CardTitle className="flex items-center text-xl">
          <BarChart className="h-5 w-5 mr-2" />
          Performance Statistics
        </CardTitle>
        {isEditing && (
          <Button variant="ghost" size="sm" onClick={onAddStat}>
            <Plus className="h-4 w-4 mr-1" /> Add Stat
          </Button>
        )}
      </div>
    </CardHeader>
  );
};
