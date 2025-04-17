
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, MapPin, User } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AthleteProfileData } from './ProfileData';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

interface AthleteBioProps {
  profile: AthleteProfileData;
  isEditing: boolean;
  setProfile: (profile: AthleteProfileData) => void;
}

const defaultAvatars = [
  'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=400',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400',
  'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=400',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400',
];

const AthleteBio = ({ profile, isEditing, setProfile }: AthleteBioProps) => {
  const [avatarDialogOpen, setAvatarDialogOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  // Create the display name from first_name and last_name
  const displayName = `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'Your Name';
  
  // Format location from place_of_birth or empty state
  const location = profile.place_of_birth || '';
  
  // Default to no image
  const profileImage = profile.avatar_url || '';
  
  // Sport and position display
  const sportPositionDisplay = profile.primary_sport && profile.primary_position 
    ? `${profile.primary_sport} • ${profile.primary_position}` 
    : '';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // In a real app, you would upload this file to a storage service
      // and then update the profile with the URL
      const imageUrl = URL.createObjectURL(file);
      setProfile({ ...profile, avatar_url: imageUrl });
      setAvatarDialogOpen(false);
      toast.success('Profile photo updated');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      // In a real app, you would upload this file to a storage service
      const imageUrl = URL.createObjectURL(file);
      setProfile({ ...profile, avatar_url: imageUrl });
      setAvatarDialogOpen(false);
      toast.success('Profile photo updated');
    }
  };

  const selectDefaultAvatar = (avatar: string) => {
    setProfile({ ...profile, avatar_url: avatar });
    setAvatarDialogOpen(false);
    toast.success('Profile photo updated');
  };

  const getInitials = () => {
    const first = profile.first_name?.charAt(0) || '';
    const last = profile.last_name?.charAt(0) || '';
    return (first + last).toUpperCase() || 'U';
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-4">
        <Dialog open={avatarDialogOpen} onOpenChange={setAvatarDialogOpen}>
          <DialogTrigger asChild>
            <div className="h-32 w-32 rounded-full overflow-hidden cursor-pointer relative group">
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt={displayName} 
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="bg-gradient-to-br from-blue-400 to-indigo-500 h-full w-full flex items-center justify-center">
                  <span className="text-white text-3xl font-semibold">{getInitials()}</span>
                </div>
              )}
              {isEditing && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="h-8 w-8 text-white" />
                </div>
              )}
            </div>
          </DialogTrigger>
          
          {isEditing && (
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Update profile picture</DialogTitle>
              </DialogHeader>
              
              <div 
                className={`border-2 border-dashed rounded-lg p-6 mt-4 transition-colors ${dragActive ? 'border-primary bg-primary/5' : 'border-gray-300'}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center justify-center space-y-2 text-center">
                  <Camera className="h-8 w-8 text-gray-400" />
                  <div className="text-sm">
                    <label htmlFor="file-upload" className="text-primary hover:underline cursor-pointer">
                      Click to upload
                    </label>
                    <span> or drag and drop</span>
                  </div>
                  <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max. 2MB)</p>
                  <input 
                    id="file-upload" 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-3">Or choose an avatar</h3>
                <div className="grid grid-cols-3 gap-3">
                  {defaultAvatars.map((avatar, index) => (
                    <Avatar 
                      key={index}
                      className="h-16 w-16 cursor-pointer hover:ring-2 hover:ring-primary"
                      onClick={() => selectDefaultAvatar(avatar)}
                    >
                      <AvatarImage src={avatar} alt={`Avatar option ${index + 1}`} />
                    </Avatar>
                  ))}
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>
        
        {isEditing && !avatarDialogOpen && (
          <Button 
            size="icon" 
            variant="secondary" 
            className="absolute bottom-0 right-0 rounded-full" 
            title="Change Photo"
            onClick={() => setAvatarDialogOpen(true)}
          >
            <Camera className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <h2 className="text-2xl font-bold mb-1">{displayName}</h2>
      
      {location ? (
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{location}</span>
        </div>
      ) : isEditing ? (
        <div className="text-gray-400 mb-2 text-sm flex items-center">
          <MapPin className="h-4 w-4 mr-1" />
          <span>Add your location</span>
        </div>
      ) : null}
      
      {sportPositionDisplay ? (
        <div className="bg-highlyt-blue/10 text-highlyt-blue px-3 py-1 rounded-full text-sm font-medium mb-4">
          {sportPositionDisplay}
        </div>
      ) : isEditing ? (
        <div className="border border-dashed border-gray-300 px-3 py-1 rounded-full text-sm text-gray-400 mb-4">
          Add sport and position
        </div>
      ) : null}

      {!isEditing ? (
        profile.bio ? (
          <div className="text-center">
            <p className="text-gray-600">{profile.bio}</p>
          </div>
        ) : (
          <div className="text-center text-gray-400">
            <p>No bio added yet</p>
          </div>
        )
      ) : (
        <div className="w-full">
          <Label htmlFor="bio">Bio</Label>
          <Textarea 
            id="bio"
            value={profile.bio || ''}
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
