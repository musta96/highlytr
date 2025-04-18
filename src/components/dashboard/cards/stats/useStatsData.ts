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
    const { user } = useAuth();
    const userId = user?.id;
    const userSpecificKey = userId ? `athlete-stats-${userId}` : 'athlete-stats';
    const savedStats = localStorage.getItem(userSpecificKey);
    
    if (savedStats) {
      return JSON.parse(savedStats);
    }
    
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

  useEffect(() => {
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

    const newStat: Stat = {
      id: Date.now().toString(),
      category,
      label,
      value,
      change: change || undefined,
      isPositive: change ? isPositive : undefined
    };

    setStats([...stats, newStat]);
    toast.success(`Added ${label} to your ${category} stats`);
  };

  const handleDeleteStat = (id: string) => {
    setStats(stats.filter(stat => stat.id !== id));
    toast.success('Stat removed successfully');
  };

  const filteredStats = (category: string) => {
    return stats.filter(stat => stat.category === category);
  };

  return {
    stats,
    handleAddStat,
    handleDeleteStat,
    filteredStats
  };
};
