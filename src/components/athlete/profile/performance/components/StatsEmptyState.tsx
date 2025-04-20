
import React from 'react';
import { AlertCircle, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StatsEmptyStateProps {
  isEditing: boolean;
  onAddStat: () => void;
}

export const StatsEmptyState: React.FC<StatsEmptyStateProps> = ({ isEditing, onAddStat }) => {
  return (
    <div className="text-center py-8 border-2 border-dashed rounded-lg">
      <AlertCircle className="h-8 w-8 mx-auto text-gray-400 mb-2" />
      <p className="text-gray-600 font-medium">No Statistics Available</p>
      <p className="text-sm text-gray-500 mt-1 mb-4">
        Add your performance statistics to showcase your abilities
      </p>
      {isEditing && (
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-1"
          onClick={onAddStat}
        >
          <Plus className="h-4 w-4" /> Add Your First Stat
        </Button>
      )}
    </div>
  );
};
