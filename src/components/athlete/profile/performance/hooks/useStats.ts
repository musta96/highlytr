
import { useState } from 'react';
import { ProfileData } from '@/types/profile';

export const useStats = (profile: ProfileData & { setProfile?: (updateFn: (prev: any) => any) => void }) => {
  const [isAddStatDialogOpen, setIsAddStatDialogOpen] = useState(false);
  
  const stats = profile?.athlete_stats ? 
    (typeof profile.athlete_stats === 'object' && profile.athlete_stats !== null ? 
      profile.athlete_stats as Record<string, any> : 
      {}) : 
    {};

  const handleStatUpdate = (key: string, newValue: any) => {
    if (profile.setProfile) {
      console.log('Updating stat:', key, newValue);
      profile.setProfile((prev: any) => ({
        ...prev,
        athlete_stats: {
          ...(prev.athlete_stats && typeof prev.athlete_stats === 'object' ? prev.athlete_stats : {}),
          [key]: newValue
        }
      }));
    }
  };

  const handleAddStat = (newStat: any) => {
    if (profile.setProfile) {
      console.log('Adding new stat:', newStat);
      profile.setProfile((prev: any) => ({
        ...prev,
        athlete_stats: {
          ...(prev.athlete_stats && typeof prev.athlete_stats === 'object' ? prev.athlete_stats : {}),
          [newStat.label]: {
            value: newStat.value,
            label: newStat.label,
            change: newStat.change,
            isPositive: newStat.isPositive,
            details: newStat.details || []
          }
        }
      }));
    }
    setIsAddStatDialogOpen(false);
  };

  return {
    stats,
    isAddStatDialogOpen,
    setIsAddStatDialogOpen,
    handleStatUpdate,
    handleAddStat
  };
};
