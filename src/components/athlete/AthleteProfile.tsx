
import React, { useState, useEffect, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockAthleteProfile } from './profile/ProfileData';
import ProfileHeader from './profile/ProfileHeader';
import AthleteBio from './profile/AthleteBio';
import AcademicInfo from './profile/AcademicInfo';
import Achievements from './profile/Achievements';
import PhysicalAttributes from './profile/PhysicalAttributes';
import HighlightReels from './profile/HighlightReels';
import PerformanceStats from './profile/PerformanceStats';
import ProfileCompletionCard from '@/components/profile/ProfileCompletionCard';
import { optimizeImage } from '@/utils/imageOptimizer';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { ProfileData } from '@/types/profile';

interface AthleteProfileProps {
  athleteId?: string;
}

const AthleteProfile = ({ athleteId }: AthleteProfileProps) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch the athlete data based on the athleteId or use the current user's profile
  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      
      try {
        let profileData;
        
        if (athleteId) {
          // Fetch specific athlete profile
          console.log(`Fetching profile data for athlete: ${athleteId}`);
          // In a real app, implement API call to get athlete by ID
          
          // For demo, use mock data
          setTimeout(() => {
            setProfile(mockAthleteProfile);
            setIsLoading(false);
          }, 500);
          return;
        } else if (user) {
          // Fetch current user's profile
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
            
          if (error) throw error;
          
          // Convert database profile to athlete profile format
          // This ensures compatibility with the components expecting AthleteProfileData
          const statsFromLocalStorage = localStorage.getItem(`athlete-stats-${user.id}`);
          let athlete_stats = {};
          
          if (statsFromLocalStorage) {
            try {
              // Convert array format from localStorage to object format
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
          // No user or athleteId, use mock data
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
  
  // Optimize profile images for better performance
  const optimizedProfile = useMemo(() => {
    if (!profile) return null;
    
    // Deep clone to avoid mutating the original object
    const optimized = JSON.parse(JSON.stringify(profile));
    
    // Optimize highlight thumbnails if they exist
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
    // In a real app, this would be saved to the backend
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-highlyt-blue"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">Profile Not Found</h2>
          <p className="text-gray-500 mt-2">The requested profile could not be loaded.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProfileHeader 
        profile={optimizedProfile}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleProfileVisibilityChange={handleProfileVisibilityChange}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-lg border shadow-sm p-6">
            <AthleteBio 
              profile={optimizedProfile} 
              isEditing={isEditing} 
              setProfile={setProfile} 
            />
            
            <AcademicInfo
              profile={optimizedProfile}
              isEditing={isEditing}
              setProfile={setProfile}
            />
          </div>
          
          {/* Show the completion card when user is viewing their own profile and not a specific athlete */}
          {!athleteId && user && (
            <ProfileCompletionCard profileData={profile as ProfileData} />
          )}
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" onValueChange={setActiveTab} value={activeTab}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="highlights">Highlights</TabsTrigger>
              <TabsTrigger value="stats">Stats</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <Achievements 
                profile={optimizedProfile} 
                isEditing={isEditing} 
                setProfile={setProfile}
              />
              
              <PhysicalAttributes
                profile={optimizedProfile}
                isEditing={isEditing}
                setProfile={setProfile}
              />
            </TabsContent>
            
            <TabsContent value="highlights" className="space-y-6">
              <HighlightReels 
                profile={optimizedProfile} 
                isEditing={isEditing} 
                setProfile={setProfile}
              />
            </TabsContent>
            
            <TabsContent value="stats" className="space-y-6">
              <PerformanceStats 
                profile={optimizedProfile} 
                isEditing={isEditing}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AthleteProfile;
