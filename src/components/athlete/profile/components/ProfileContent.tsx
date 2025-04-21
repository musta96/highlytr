
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AthleteBio from '../AthleteBio';
import AcademicInfo from '../AcademicInfo';
import Achievements from '../Achievements';
import PhysicalAttributes from '../PhysicalAttributes';
import HighlightReels from '../HighlightReels';
import PerformanceStats from '../PerformanceStats';
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <AthleteBio 
            profile={profile} 
            isEditing={isEditing} 
            setProfile={setProfile} 
          />
          
          <AcademicInfo
            profile={profile}
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
              profile={profile} 
              isEditing={isEditing} 
              setProfile={setProfile}
            />
            
            <PhysicalAttributes
              profile={profile}
              isEditing={isEditing}
              setProfile={setProfile}
            />
          </TabsContent>
          
          <TabsContent value="highlights" className="space-y-6">
            <HighlightReels 
              profile={profile} 
              isEditing={isEditing} 
              setProfile={setProfile}
            />
          </TabsContent>
          
          <TabsContent value="stats" className="space-y-6">
            <PerformanceStats 
              profile={profile} 
              isEditing={isEditing}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
