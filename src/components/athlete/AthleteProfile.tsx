
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
import { optimizeImage } from '@/utils/imageOptimizer';

interface AthleteProfileProps {
  athleteId?: string;
}

const AthleteProfile = ({ athleteId }: AthleteProfileProps) => {
  const [profile, setProfile] = useState(mockAthleteProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  
  // In a real app, we would fetch the athlete data based on the athleteId
  // For now, we're using the mock data with optimized images
  useEffect(() => {
    if (athleteId) {
      console.log(`Would fetch profile data for athlete: ${athleteId}`);
      // Simulate loading state briefly
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 500);
    }
  }, [athleteId]);
  
  // Optimize profile images for better performance
  const optimizedProfile = useMemo(() => {
    // Deep clone to avoid mutating the original object
    const optimized = JSON.parse(JSON.stringify(profile));
    
    // Optimize highlight thumbnails
    if (optimized.highlights && Array.isArray(optimized.highlights)) {
      optimized.highlights = optimized.highlights.map(highlight => ({
        ...highlight,
        thumbnail: optimizeImage(highlight.thumbnail, 400, 75)
      }));
    }
    
    return optimized;
  }, [profile]);

  const handleProfileVisibilityChange = () => {
    setProfile(prev => ({ ...prev, isPublic: !prev.isPublic }));
    // In a real app, this would be saved to the backend
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-highlyt-blue"></div>
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
        <div className="lg:col-span-1">
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
