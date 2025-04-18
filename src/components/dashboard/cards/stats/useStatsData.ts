
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Stat {
  id: string;
  category: string;
  label: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
}

export const useStatsData = () => {
  const [stats, setStats] = useState<Stat[]>(() => {
    try {
      // We need to move useAuth() outside this initialization function
      // as hooks can't be used inside other hooks or callbacks
      const savedStats = localStorage.getItem('athlete-stats');
      
      if (savedStats) {
        return JSON.parse(savedStats);
      }
    } catch (error) {
      console.error('Error loading initial stats data:', error);
    }
    
    // Default fallback data if localStorage fails or is empty
    return [
      { id: '1', category: 'sports', label: 'Games Played', value: 28 },
      { id: '2', category: 'sports', label: 'Goals', value: 15, change: '3', isPositive: true },
      { id: '3', category: 'sports', label: 'Assists', value: 12, change: '2', isPositive: true },
      { id: '4', category: 'sports', label: 'Minutes Played', value: '2,340' },
      { id: '5', category: 'sports', label: 'Pass Accuracy', value: '89%', change: '2%', isPositive: true },
      { id: '6', category: 'sports', label: 'Shot Accuracy', value: '76%' },
      { id: '7', category: 'sports', label: 'Total Games', value: 82 },
      { id: '8', category: 'sports', label: 'Total Goals', value: 42 },
      { id: '9', category: 'sports', label: 'Total Assists', value: 35 },
      
      { id: '10', category: 'academic', label: 'GPA', value: '3.8', change: '0.2', isPositive: true },
      { id: '11', category: 'academic', label: 'SAT Score', value: '1450' },
      { id: '12', category: 'academic', label: 'Class Rank', value: 'Top 5%' },
      { id: '13', category: 'academic', label: 'AP Classes', value: 4 },
      { id: '14', category: 'academic', label: 'Honor Roll', value: 'Yes' },
      { id: '15', category: 'academic', label: 'Academic Awards', value: 3 },
      
      { id: '16', category: 'physical', label: 'Height', value: "6'2\"" },
      { id: '17', category: 'physical', label: 'Weight', value: '175 lbs' },
      { id: '18', category: 'physical', label: 'Vertical Jump', value: '32"', change: '2', isPositive: true },
      { id: '19', category: 'physical', label: '40-yard Dash', value: '4.5s', change: '0.1s', isPositive: true },
      { id: '20', category: 'physical', label: 'Agility Score', value: '8.5/10' },
      { id: '21', category: 'physical', label: 'Endurance', value: '92%' },
    ];
  });

  const { user } = useAuth();

  // Load user-specific stats after component mounts
  useEffect(() => {
    if (user?.id) {
      try {
        const userSpecificKey = `athlete-stats-${user.id}`;
        const savedStats = localStorage.getItem(userSpecificKey);
        
        if (savedStats) {
          setStats(JSON.parse(savedStats));
        }
      } catch (error) {
        console.error('Error loading user-specific stats:', error);
      }
    }
  }, [user]);

  // Save stats whenever they change
  useEffect(() => {
    try {
      if (!stats) return;
      
      if (user?.id) {
        localStorage.setItem(`athlete-stats-${user.id}`, JSON.stringify(stats));
        
        const updateProfileStats = async () => {
          try {
            const statsObject: Record<string, any> = {};
            
            stats.forEach(stat => {
              statsObject[stat.id] = {
                label: stat.label,
                value: stat.value,
                change: stat.change,
                isPositive: stat.isPositive,
                category: stat.category
              };
            });
            
            const { error } = await supabase
              .from('profiles')
              .update({
                athlete_stats: statsObject
              })
              .eq('id', user.id);
              
            if (error) {
              console.error('Error updating stats in profile:', error);
            }
          } catch (err) {
            console.error('Failed to update profile stats:', err);
          }
        };
        
        updateProfileStats();
      } else {
        localStorage.setItem('athlete-stats', JSON.stringify(stats));
      }
    } catch (error) {
      console.error('Error saving stats data:', error);
    }
  }, [stats, user]);

  const handleAddStat = (
    category: string,
    label: string,
    value: string,
    change?: string,
    isPositive?: boolean
  ) => {
    if (!label.trim() || !value.trim()) {
      toast.error('Please provide both a label and value for the stat');
      return;
    }

    try {
      const newStat: Stat = {
        id: Date.now().toString(),
        category,
        label,
        value,
        change: change || undefined,
        isPositive: change ? isPositive : undefined
      };

      setStats(prevStats => [...(prevStats || []), newStat]);
      toast.success(`Added ${label} to your ${category} stats`);
    } catch (error) {
      console.error('Error adding stat:', error);
      toast.error('Failed to add stat. Please try again.');
    }
  };

  const handleDeleteStat = (id: string) => {
    try {
      setStats(prevStats => {
        if (!prevStats) return [];
        return prevStats.filter(stat => stat.id !== id);
      });
      toast.success('Stat removed successfully');
    } catch (error) {
      console.error('Error deleting stat:', error);
      toast.error('Failed to remove stat. Please try again.');
    }
  };

  const filteredStats = (category: string): Stat[] => {
    try {
      if (!stats || !Array.isArray(stats)) {
        return [];
      }
      return stats.filter(stat => stat.category === category);
    } catch (error) {
      console.error('Error filtering stats:', error);
      return [];
    }
  };

  return {
    stats,
    handleAddStat,
    handleDeleteStat,
    filteredStats
  };
};
