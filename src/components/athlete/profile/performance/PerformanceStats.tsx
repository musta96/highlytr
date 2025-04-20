import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, ChevronRight, Plus } from 'lucide-react';
import { StatDialog } from './StatDialog';
import { StatsEmptyState } from './components/StatsEmptyState';
import { StatsGrid } from './components/StatsGrid';
import { PerformanceStatsProps } from './types';

const PerformanceStats = ({ profile, isEditing }: PerformanceStatsProps) => {
  const [isAddStatDialogOpen, setIsAddStatDialogOpen] = useState(false);
  
  // Safely handle athlete_stats by ensuring it's an object or default to empty object
  const stats = profile?.athlete_stats ? 
    (typeof profile.athlete_stats === 'object' && profile.athlete_stats !== null ? 
      profile.athlete_stats as Record<string, any> : 
      {}) : 
    {};

  const handleStatUpdate = (key: string, newValue: any) => {
    if (profile.setProfile) {
      profile.setProfile((prev: any) => ({
        ...prev,
        athlete_stats: {
          ...(prev.athlete_stats && typeof prev.athlete_stats === 'object' ? prev.athlete_stats : {}),
          [key]: newValue
        }
      }));
    }
  };

  const handleAddStat = () => {
    setIsAddStatDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center text-xl">
            <BarChart className="h-5 w-5 mr-2" />
            Performance Statistics
          </CardTitle>
          {isEditing && (
            <Button variant="ghost" size="sm" onClick={handleAddStat}>
              <Plus className="h-4 w-4 mr-1" /> Add Stat
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {Object.keys(stats).length > 0 ? (
          <>
            <StatsGrid 
              stats={stats} 
              isEditing={isEditing} 
              onUpdate={handleStatUpdate}
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
          <StatsEmptyState isEditing={isEditing} onAddStat={handleAddStat} />
        )}
      </CardContent>

      {isEditing && (
        <StatDialog
          isOpen={isAddStatDialogOpen}
          onClose={() => setIsAddStatDialogOpen(false)}
          onAddStat={(newStat) => {
            if (profile.setProfile) {
              profile.setProfile((prev: any) => ({
                ...prev,
                athlete_stats: {
                  ...(prev.athlete_stats && typeof prev.athlete_stats === 'object' ? prev.athlete_stats : {}),
                  [newStat.label]: {
                    value: newStat.value,
                    label: newStat.label,
                    change: newStat.change,
                    isPositive: newStat.isPositive
                  }
                }
              }));
            }
            setIsAddStatDialogOpen(false);
          }}
          primarySport={profile?.primary_sport}
          primaryPosition={profile?.primary_position}
        />
      )}
    </Card>
  );
};

export default PerformanceStats;
