
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RulerIcon } from 'lucide-react';
import { AthleteProfileData } from './ProfileData';

interface PhysicalAttributesProps {
  profile: AthleteProfileData;
  isEditing: boolean;
  setProfile: (profile: AthleteProfileData) => void;
}

const PhysicalAttributes = ({ profile, isEditing, setProfile }: PhysicalAttributesProps) => {
  // Safely access physical attributes
  const attributes = profile.physicalAttributes || {
    height: '',
    weight: '',
    wingspan: '',
    verticalJump: '',
    speed40yd: '',
    dominantFoot: 'Right'
  };

  // Calculate age from date of birth if available
  let age = '';
  if (profile.date_of_birth) {
    const birthDate = new Date(profile.date_of_birth);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    age = calculatedAge.toString();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <RulerIcon className="h-5 w-5 mr-2" />
          Physical Attributes
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!isEditing ? (
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600">Height</p>
              <p className="font-medium">{attributes.height || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Weight</p>
              <p className="font-medium">{attributes.weight || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Age</p>
              <p className="font-medium">{age || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Position</p>
              <p className="font-medium">{profile.primary_position || 'Not specified'}</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label htmlFor="height">Height</Label>
              <Input 
                id="height"
                value={attributes.height}
                onChange={(e) => setProfile({
                  ...profile, 
                  physicalAttributes: {...attributes, height: e.target.value}
                })}
              />
            </div>
            <div>
              <Label htmlFor="weight">Weight</Label>
              <Input 
                id="weight"
                value={attributes.weight}
                onChange={(e) => setProfile({
                  ...profile, 
                  physicalAttributes: {...attributes, weight: e.target.value}
                })}
              />
            </div>
            <div>
              <Label htmlFor="wingspan">Wingspan</Label>
              <Input 
                id="wingspan"
                value={attributes.wingspan}
                onChange={(e) => setProfile({
                  ...profile, 
                  physicalAttributes: {...attributes, wingspan: e.target.value}
                })}
              />
            </div>
            <div>
              <Label htmlFor="speed">40yd Speed</Label>
              <Input 
                id="speed"
                value={attributes.speed40yd}
                onChange={(e) => setProfile({
                  ...profile, 
                  physicalAttributes: {...attributes, speed40yd: e.target.value}
                })}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PhysicalAttributes;
