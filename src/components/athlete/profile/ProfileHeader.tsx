
import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface ProfileHeaderProps {
  profile: any;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  handleProfileVisibilityChange: () => void;
}

const ProfileHeader = ({ 
  profile, 
  isEditing, 
  setIsEditing, 
  handleProfileVisibilityChange 
}: ProfileHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">My Profile</h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center space-x-2">
          <Switch 
            id="profile-visibility" 
            checked={profile.isPublic}
            onCheckedChange={handleProfileVisibilityChange}
          />
          <Label htmlFor="profile-visibility">
            {profile.isPublic ? 'Public Profile' : 'Private Profile'}
          </Label>
        </div>
        <Button 
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "default" : "outline"}
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>
    </div>
  );
};

export default ProfileHeader;
