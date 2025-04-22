
import { useState } from 'react';
import { ProfileData } from '@/types/profile';
import { StatDetailItem, AddStatData } from '../types';

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

  const handleAddStat = (newStat: AddStatData) => {
    if (profile.setProfile) {
      console.log('Adding new stat:', newStat);
      
      // Generate a unique key for the stat based on the label
      const statKey = newStat.label
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[^a-z0-9_]/g, '')
        + '_' + Date.now().toString().slice(-4);
      
      profile.setProfile((prev: any) => ({
        ...prev,
        athlete_stats: {
          ...(prev.athlete_stats && typeof prev.athlete_stats === 'object' ? prev.athlete_stats : {}),
          [statKey]: {
            label: newStat.label,
            value: newStat.value,
            change: newStat.change || undefined,
            isPositive: newStat.change ? newStat.isPositive : undefined,
            details: newStat.details || [],
            category: newStat.category || 'sport'
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
