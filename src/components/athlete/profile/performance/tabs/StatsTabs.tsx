
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronRight } from 'lucide-react';
import { StatsGrid } from '../components/StatsGrid';
import { StatsEmptyState } from '../components/StatsEmptyState';
import { ProfileData } from '@/types/profile';

interface StatsTabsProps {
  stats: Record<string, any>;
  isEditing: boolean;
  onUpdate: (key: string, newValue: any) => void;
  onAddStat: () => void;
}

export const StatsTabs: React.FC<StatsTabsProps> = ({
  stats,
  isEditing,
  onUpdate,
  onAddStat,
}) => {
  return (
    <>
      {Object.keys(stats).length > 0 ? (
        <>
          <StatsGrid 
            stats={stats} 
            isEditing={isEditing} 
            onUpdate={onUpdate}
          />
          {!isEditing && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full mt-4 text-gray-600 hover:text-gray-800"
            >
              View Detailed Statistics <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </>
      ) : (
        <StatsEmptyState isEditing={isEditing} onAddStat={onAddStat} />
      )}
    </>
  );
};
