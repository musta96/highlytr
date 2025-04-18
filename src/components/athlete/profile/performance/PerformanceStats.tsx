
import React, { useState } from 'react';
import { StatCard } from './StatCard';
import { StatDialog } from './StatDialog';
import { PerformanceStatsProps } from './types';

const PerformanceStats = ({ profile, isEditing }: PerformanceStatsProps) => {
  const [isStatDialogOpen, setIsStatDialogOpen] = useState(false);
  
  const handleAddStat = (data: any) => {
    // Here you would typically update the profile's stats
    console.log('Adding stat:', data);
  };

  // Ensure we have a valid Record<string, any> for stats
  const stats = profile.athlete_stats && typeof profile.athlete_stats === 'object' && !Array.isArray(profile.athlete_stats)
    ? profile.athlete_stats as Record<string, any>
    : {};

  return (
    <div className="space-y-6">
      <StatCard
        title="Sport Statistics"
        stats={stats}
        isEditing={isEditing}
        onAddStat={() => setIsStatDialogOpen(true)}
      />

      <StatDialog
        isOpen={isStatDialogOpen}
        onClose={() => setIsStatDialogOpen(false)}
        onAddStat={handleAddStat}
        primarySport={profile.primary_sport || undefined}
        primaryPosition={profile.primary_position || undefined}
      />
    </div>
  );
};

export default PerformanceStats;
