
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PhysicalAttributesProps {
  profile: any;
  isEditing: boolean;
  setProfile: (profile: any) => void;
}

const PhysicalAttributes = ({ profile, isEditing, setProfile }: PhysicalAttributesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Physical Attributes</CardTitle>
      </CardHeader>
      <CardContent>
        {!isEditing ? (
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600">Height</p>
              <p className="font-medium">{profile.height}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Weight</p>
              <p className="font-medium">{profile.weight}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Age</p>
              <p className="font-medium">{profile.age}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Position</p>
              <p className="font-medium">{profile.position}</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label htmlFor="height">Height</Label>
              <Input 
                id="height"
                value={profile.height}
                onChange={(e) => setProfile({...profile, height: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="weight">Weight</Label>
              <Input 
                id="weight"
                value={profile.weight}
                onChange={(e) => setProfile({...profile, weight: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input 
                id="age"
                type="number"
                value={profile.age}
                onChange={(e) => setProfile({...profile, age: parseInt(e.target.value)})}
              />
            </div>
            <div>
              <Label htmlFor="position">Position</Label>
              <Input 
                id="position"
                value={profile.position}
                onChange={(e) => setProfile({...profile, position: e.target.value})}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PhysicalAttributes;
