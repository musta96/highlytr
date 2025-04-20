
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatsGrid } from '../components/StatsGrid';
import { StatsEmptyState } from '../components/StatsEmptyState';

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
  onAddStat
}) => {
  // Filter stats by category
  const sportStats = Object.entries(stats)
    .filter(([_, stat]) => stat.category === 'sport' || !stat.category)
    .reduce((acc, [key, stat]) => ({ ...acc, [key]: stat }), {});
  
  const physicalStats = Object.entries(stats)
    .filter(([_, stat]) => stat.category === 'physical')
    .reduce((acc, [key, stat]) => ({ ...acc, [key]: stat }), {});
  
  const academicStats = Object.entries(stats)
    .filter(([_, stat]) => stat.category === 'academic')
    .reduce((acc, [key, stat]) => ({ ...acc, [key]: stat }), {});

  const hasStats = Object.keys(stats).length > 0;
  
  return (
    <div>
      {hasStats ? (
        <Tabs defaultValue="sport" className="space-y-4">
          <TabsList>
            <TabsTrigger value="sport">Sport</TabsTrigger>
            <TabsTrigger value="physical">Physical</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sport">
            {Object.keys(sportStats).length > 0 ? (
              <StatsGrid 
                stats={sportStats} 
                isEditing={isEditing} 
                onUpdate={onUpdate}
              />
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                No sport statistics available
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="physical">
            {Object.keys(physicalStats).length > 0 ? (
              <StatsGrid 
                stats={physicalStats} 
                isEditing={isEditing}
                onUpdate={onUpdate}
              />
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                No physical statistics available
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="academic">
            {Object.keys(academicStats).length > 0 ? (
              <StatsGrid 
                stats={academicStats} 
                isEditing={isEditing}
                onUpdate={onUpdate}
              />
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                No academic statistics available
              </div>
            )}
          </TabsContent>
        </Tabs>
      ) : (
        <StatsEmptyState isEditing={isEditing} onAddStat={onAddStat} />
      )}
    </div>
  );
};
