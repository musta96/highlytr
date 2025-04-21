
import React, { useState } from 'react';
import { useAthleteProfile } from './profile/hooks/useAthleteProfile';
import { ProfileLoading } from './profile/components/ProfileLoading';
import { ProfileError } from './profile/components/ProfileError';
import { ProfileContent } from './profile/components/ProfileContent';
import ProfileHeader from './profile/ProfileHeader';

interface AthleteProfileProps {
  athleteId?: string;
}

const AthleteProfile = ({ athleteId }: AthleteProfileProps) => {
  const {
    profile,
    isLoading,
    isEditing,
    setIsEditing,
    setProfile,
    handleProfileVisibilityChange
  } = useAthleteProfile(athleteId);
  const [activeTab, setActiveTab] = useState('overview');

  if (isLoading) {
    return <ProfileLoading />;
  }

  if (!profile) {
    return <ProfileError />;
  }

  return (
    <div className="space-y-6">
      <ProfileHeader 
        profile={profile}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleProfileVisibilityChange={handleProfileVisibilityChange}
      />

      <ProfileContent
        profile={profile}
        isEditing={isEditing}
        setProfile={setProfile}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        athleteId={athleteId}
      />
    </div>
  );
};

export default AthleteProfile;
