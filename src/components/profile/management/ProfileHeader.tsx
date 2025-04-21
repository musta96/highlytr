
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Loader2 } from 'lucide-react';

interface ProfileHeaderProps {
  isSaving: boolean;
  handleSaveProfile: () => void;
}

const ProfileHeader = ({ isSaving, handleSaveProfile }: ProfileHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Edit Profile</h1>
      <Button 
        onClick={handleSaveProfile} 
        disabled={isSaving}
        className="flex items-center gap-2"
      >
        {isSaving ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Save className="h-4 w-4" />
        )}
        {isSaving ? 'Saving...' : 'Save Changes'}
      </Button>
    </div>
  );
};

export default ProfileHeader;
