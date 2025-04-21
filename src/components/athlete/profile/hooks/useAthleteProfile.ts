
import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { mockAthleteProfile } from '../ProfileData';
import { optimizeImage } from '@/utils/imageOptimizer';
import { ProfileData } from '@/types/profile';

export const useAthleteProfile = (athleteId?: string) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      
      try {
        let profileData;
        
        if (athleteId) {
          console.log(`Fetching profile data for athlete: ${athleteId}`);
          // For demo, use mock data
          setTimeout(() => {
            setProfile(mockAthleteProfile);
            setIsLoading(false);
          }, 500);
          return;
        } else if (user) {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
            
          if (error) throw error;
          
          const statsFromLocalStorage = localStorage.getItem(`athlete-stats-${user.id}`);
          let athlete_stats = {};
          
          if (statsFromLocalStorage) {
            try {
              const statsArray = JSON.parse(statsFromLocalStorage);
              statsArray.forEach((stat: any) => {
                athlete_stats[stat.id] = {
                  label: stat.label,
                  value: stat.value,
                  change: stat.change,
                  isPositive: stat.isPositive,
                  category: stat.category
                };
              });
            } catch (err) {
              console.error('Error parsing stats from localStorage', err);
            }
          }
          
          profileData = {
            ...data,
            isPublic: true,
            bio: '',
            achievements: [],
            physicalAttributes: {
              height: '',
              weight: '',
            },
            education: {
              school: '',
              graduationYear: new Date().getFullYear() + 4,
              gpa: 0,
            },
            stats: {},
            athlete_stats: athlete_stats || {},
            highlights: []
          };
          
          setProfile(profileData);
        } else {
          setProfile(mockAthleteProfile);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        setProfile(mockAthleteProfile);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfile();
  }, [athleteId, user]);

  const optimizedProfile = useMemo(() => {
    if (!profile) return null;
    
    const optimized = JSON.parse(JSON.stringify(profile));
    
    if (optimized.highlights && Array.isArray(optimized.highlights)) {
      optimized.highlights = optimized.highlights.map((highlight: any) => ({
        ...highlight,
        thumbnail: highlight.thumbnail ? optimizeImage(highlight.thumbnail, 400, 75) : ''
      }));
    }
    
    return optimized;
  }, [profile]);

  const handleProfileVisibilityChange = () => {
    if (!profile) return;
    setProfile((prev: any) => ({ ...prev, isPublic: !prev.isPublic }));
  };

  return {
    profile: optimizedProfile,
    isLoading,
    isEditing,
    setIsEditing,
    setProfile,
    handleProfileVisibilityChange
  };
};
