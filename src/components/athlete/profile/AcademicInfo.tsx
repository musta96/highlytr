
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap } from 'lucide-react';

interface AcademicInfoProps {
  profile: any;
  isEditing: boolean;
  setProfile: (profile: any) => void;
}

const AcademicInfo = ({ profile, isEditing, setProfile }: AcademicInfoProps) => {
  return (
    <div className="mt-6 border-t pt-6">
      <h3 className="font-medium mb-4 flex items-center">
        <GraduationCap className="h-5 w-5 mr-2" />
        Academic Information
      </h3>
      {!isEditing ? (
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">School:</span>
            <span>{profile.school}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Graduation:</span>
            <span>{profile.graduationYear}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">GPA:</span>
            <span>{profile.gpa}</span>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div>
            <Label htmlFor="school">School</Label>
            <Input 
              id="school"
              value={profile.school}
              onChange={(e) => setProfile({...profile, school: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="graduation">Graduation Year</Label>
            <Input 
              id="graduation"
              type="number"
              value={profile.graduationYear}
              onChange={(e) => setProfile({...profile, graduationYear: parseInt(e.target.value)})}
            />
          </div>
          <div>
            <Label htmlFor="gpa">GPA</Label>
            <Input 
              id="gpa"
              type="number"
              step="0.1"
              value={profile.gpa}
              onChange={(e) => setProfile({...profile, gpa: parseFloat(e.target.value)})}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicInfo;
