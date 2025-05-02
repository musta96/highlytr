
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { StatDialog } from './StatDialog';
import { StatsHeader } from './components/StatsHeader';
import { StatsTabs } from './tabs/StatsTabs';
import { useStats } from './hooks/useStats';
import { PerformanceStatsProps } from './types';

const PerformanceStats = ({ profile, isEditing }: PerformanceStatsProps) => {
  const {
    stats,
    isAddStatDialogOpen,
    setIsAddStatDialogOpen,
    handleStatUpdate,
    handleAddStat
  } = useStats(profile);

  const handleAddStatClick = () => {
    setIsAddStatDialogOpen(true);
  };

  console.log("PerformanceStats rendering with stats:", stats);
  console.log("Profile contains setProfile:", !!profile.setProfile);

  return (
    <Card>
      <StatsHeader 
        isEditing={isEditing} 
        onAddStat={handleAddStatClick} 
      />
      <CardContent>
        <StatsTabs
          stats={stats}
          isEditing={isEditing}
          onUpdate={handleStatUpdate}
          onAddStat={handleAddStatClick}
        />
      </CardContent>

      {isEditing && (
        <StatDialog
          isOpen={isAddStatDialogOpen}
          onClose={() => setIsAddStatDialogOpen(false)}
          onAddStat={handleAddStat}
          primarySport={profile?.primary_sport}
          primaryPosition={profile?.primary_position}
        />
      )}
    </Card>
  );
};

export default PerformanceStats;
