
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockAthleteProfile } from './profile/ProfileData';
import ProfileHeader from './profile/ProfileHeader';
import AthleteBio from './profile/AthleteBio';
import AcademicInfo from './profile/AcademicInfo';
import Achievements from './profile/Achievements';
import PhysicalAttributes from './profile/PhysicalAttributes';
import HighlightReels from './profile/HighlightReels';
import PerformanceStats from './profile/PerformanceStats';

interface AthleteProfileProps {
  athleteId?: string;
}

const AthleteProfile = ({ athleteId }: AthleteProfileProps) => {
  const [profile, setProfile] = useState(mockAthleteProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  // In a real app, we would fetch the athlete data based on the athleteId
  // For now, we're using the mock data
  
  const handleProfileVisibilityChange = () => {
    setProfile(prev => ({ ...prev, isPublic: !prev.isPublic }));
    // In a real app, this would be saved to the backend
  };

  return (
    <div className="space-y-6">
      <ProfileHeader 
        profile={profile}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleProfileVisibilityChange={handleProfileVisibilityChange}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info Card */}
        <div className="lg:col-span-1">
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
    </div>
  );
};

export default AthleteProfile;
