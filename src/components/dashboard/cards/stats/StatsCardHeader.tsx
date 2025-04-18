
import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface StatsCardHeaderProps {
  isEditing: boolean;
  onOpenDialog: () => void;
}

export const StatsCardHeader = ({ isEditing, onOpenDialog }: StatsCardHeaderProps) => {
  return (
    <CardHeader>
      <div className="flex justify-between items-center">
        <CardTitle>Performance Statistics</CardTitle>
        <div className="flex gap-2">
          {isEditing && (
            <Button variant="default" size="sm" onClick={onOpenDialog}>
              <Plus className="h-4 w-4 mr-1" /> Add Stat
            </Button>
          )}
        </div>
      </div>
    </CardHeader>
  );
};
