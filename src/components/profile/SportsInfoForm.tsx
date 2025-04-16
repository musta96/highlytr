
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ProfileData } from '@/types/profile';

interface SportsInfoFormProps {
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData | null>>;
}

// Sport options and their positions
const sportPositions = {
  soccer: ['Goalkeeper', 'Defender', 'Midfielder', 'Forward', 'Striker', 'Winger', 'Other'],
  basketball: ['Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center', 'Other'],
  baseball: ['Pitcher', 'Catcher', 'First Base', 'Second Base', 'Third Base', 'Shortstop', 'Outfield', 'Other'],
  football: ['Quarterback', 'Running Back', 'Wide Receiver', 'Tight End', 'Offensive Line', 'Defensive Line', 'Linebacker', 'Cornerback', 'Safety', 'Kicker', 'Punter', 'Other'],
  volleyball: ['Outside Hitter', 'Opposite', 'Middle Blocker', 'Setter', 'Libero', 'Other'],
  tennis: ['Singles Player', 'Doubles Specialist', 'Other'],
  swimming: ['Freestyle', 'Backstroke', 'Breaststroke', 'Butterfly', 'Individual Medley', 'Other'],
  track: ['Sprinter', 'Middle Distance', 'Long Distance', 'Hurdler', 'Jumper', 'Thrower', 'Other'],
  other: ['Not Specified'],
};

const sportsList = [
  'Soccer',
  'Basketball',
  'Baseball',
  'Football',
  'Volleyball', 
  'Tennis',
  'Swimming',
  'Track',
  'Gymnastics',
  'Hockey',
  'Rugby',
  'Lacrosse',
  'Golf',
  'Wrestling',
  'Other'
];

const SportsInfoForm = ({ profileData, setProfileData }: SportsInfoFormProps) => {
  const [primaryPositions, setPrimaryPositions] = useState<string[]>([]);
  const [secondaryPositions, setSecondaryPositions] = useState<string[]>([]);

  useEffect(() => {
    if (profileData.primary_sport) {
      const sportKey = profileData.primary_sport.toLowerCase();
      setPrimaryPositions(sportPositions[sportKey as keyof typeof sportPositions] || sportPositions.other);
    }
    
    if (profileData.secondary_sport) {
      const sportKey = profileData.secondary_sport.toLowerCase();
      setSecondaryPositions(sportPositions[sportKey as keyof typeof sportPositions] || sportPositions.other);
    }
  }, [profileData.primary_sport, profileData.secondary_sport]);

  const handleSportChange = (value: string, field: 'primary_sport' | 'secondary_sport') => {
    setProfileData(prev => {
      if (!prev) return prev;
      
      // When changing sports, reset the position
      const positionField = field === 'primary_sport' ? 'primary_position' : 'secondary_position';
      return { 
        ...prev, 
        [field]: value, 
        [positionField]: '' 
      };
    });
  };

  const handlePositionChange = (value: string, field: 'primary_position' | 'secondary_position') => {
    setProfileData(prev => {
      if (!prev) return prev;
      return { ...prev, [field]: value };
    });
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="primary_sport">Primary Sport</Label>
              <Select 
                value={profileData.primary_sport || ''} 
                onValueChange={(value) => handleSportChange(value, 'primary_sport')}
              >
                <SelectTrigger id="primary_sport">
                  <SelectValue placeholder="Select a sport" />
                </SelectTrigger>
                <SelectContent>
                  {sportsList.map((sport) => (
                    <SelectItem key={sport} value={sport}>
                      {sport}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="primary_position">Primary Position</Label>
              <Select 
                value={profileData.primary_position || ''} 
                onValueChange={(value) => handlePositionChange(value, 'primary_position')}
                disabled={!profileData.primary_sport}
              >
                <SelectTrigger id="primary_position">
                  <SelectValue placeholder={profileData.primary_sport ? "Select position" : "Select sport first"} />
                </SelectTrigger>
                <SelectContent>
                  {primaryPositions.map((position) => (
                    <SelectItem key={position} value={position}>
                      {position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="secondary_sport">Secondary Sport (Optional)</Label>
              <Select 
                value={profileData.secondary_sport || ''} 
                onValueChange={(value) => handleSportChange(value, 'secondary_sport')}
              >
                <SelectTrigger id="secondary_sport">
                  <SelectValue placeholder="Select a sport (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {sportsList.map((sport) => (
                    <SelectItem key={sport} value={sport}>
                      {sport}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="secondary_position">Secondary Position (Optional)</Label>
              <Select 
                value={profileData.secondary_position || ''} 
                onValueChange={(value) => handlePositionChange(value, 'secondary_position')}
                disabled={!profileData.secondary_sport}
              >
                <SelectTrigger id="secondary_position">
                  <SelectValue placeholder={profileData.secondary_sport ? "Select position" : "Select sport first"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {secondaryPositions.map((position) => (
                    <SelectItem key={position} value={position}>
                      {position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SportsInfoForm;
