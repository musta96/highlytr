
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AthleteBio from '../AthleteBio';
import AcademicInfo from '../AcademicInfo';
import Achievements from '../Achievements';
import PhysicalAttributes from '../PhysicalAttributes';
import HighlightReels from '../HighlightReels';
import PerformanceStats from '../performance/PerformanceStats';
import ProfileCompletionCard from '@/components/profile/ProfileCompletionCard';
import { ProfileData } from '@/types/profile';
import { useAuth } from '@/hooks/useAuth';

interface ProfileContentProps {
  profile: any;
  isEditing: boolean;
  setProfile: (profile: any) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  athleteId?: string;
}

export const ProfileContent = ({
  profile,
  isEditing,
  setProfile,
  activeTab,
  setActiveTab,
  athleteId
}: ProfileContentProps) => {
  const { user } = useAuth();
  
  // Create a new profile object with setProfile function
  const profileWithSetter = {
    ...profile,
    setProfile: (updateFn: (prev: any) => any) => {
      const updatedProfile = updateFn(profile);
      setProfile(updatedProfile);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <AthleteBio 
            profile={profileWithSetter} 
            isEditing={isEditing} 
            setProfile={setProfile} 
          />
          
          <AcademicInfo
            profile={profileWithSetter}
            isEditing={isEditing}
            setProfile={setProfile}
          />
        </div>
        
        {!athleteId && user && (
          <ProfileCompletionCard profileData={profile as ProfileData} />
        )}
      </div>

      <div className="lg:col-span-2">
        <Tabs defaultValue="overview" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="highlights">Highlights</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <Achievements 
              profile={profileWithSetter} 
              isEditing={isEditing} 
              setProfile={setProfile}
            />
            
            <PhysicalAttributes
              profile={profileWithSetter}
              isEditing={isEditing}
              setProfile={setProfile}
            />
          </TabsContent>
          
          <TabsContent value="highlights" className="space-y-6">
            <HighlightReels 
              profile={profileWithSetter} 
              isEditing={isEditing} 
              setProfile={setProfile}
            />
          </TabsContent>
          
          <TabsContent value="stats" className="space-y-6">
            <PerformanceStats 
              profile={profileWithSetter} 
              isEditing={isEditing}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
