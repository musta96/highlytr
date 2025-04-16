
import React from 'react';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin } from 'lucide-react';

interface AthleteBioProps {
  profile: any;
  isEditing: boolean;
  setProfile: (profile: any) => void;
}

const AthleteBio = ({ profile, isEditing, setProfile }: AthleteBioProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-4">
        <div className="h-32 w-32 rounded-full overflow-hidden">
          <img 
            src={profile.profileImage} 
            alt={profile.name} 
            className="h-full w-full object-cover"
          />
        </div>
        {isEditing && (
          <Button 
            size="icon" 
            variant="secondary" 
            className="absolute bottom-0 right-0 rounded-full" 
            title="Change Photo"
          >
            <Camera className="h-4 w-4" />
          </Button>
        )}
      </div>
      <h2 className="text-2xl font-bold mb-1">{profile.name}</h2>
      <div className="flex items-center text-gray-600 mb-2">
        <MapPin className="h-4 w-4 mr-1" />
        <span>{profile.location}</span>
      </div>
      <div className="bg-highlyt-blue/10 text-highlyt-blue px-3 py-1 rounded-full text-sm font-medium mb-4">
        {profile.sport} • {profile.position}
      </div>

      {!isEditing ? (
        <div className="text-center">
          <p className="text-gray-600">{profile.bio}</p>
        </div>
      ) : (
        <div className="w-full">
          <Label htmlFor="bio">Bio</Label>
          <Textarea 
            id="bio"
            value={profile.bio}
            onChange={(e) => setProfile({...profile, bio: e.target.value})}
            className="mt-1"
            placeholder="Tell coaches about yourself..."
          />
        </div>
      )}
    </div>
  );
};

export default AthleteBio;
