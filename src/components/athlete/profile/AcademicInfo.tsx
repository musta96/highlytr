
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap } from 'lucide-react';
import { AthleteProfileData } from './ProfileData';

interface AcademicInfoProps {
  profile: AthleteProfileData;
  isEditing: boolean;
  setProfile: (profile: AthleteProfileData) => void;
}

const AcademicInfo = ({ profile, isEditing, setProfile }: AcademicInfoProps) => {
  // Safely access education data
  const education = profile.education || { school: '', graduationYear: 0, gpa: 0 };
  
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
            <span>{education.school || 'Not specified'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Graduation:</span>
            <span>{education.graduationYear || 'Not specified'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">GPA:</span>
            <span>{education.gpa || 'Not specified'}</span>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div>
            <Label htmlFor="school">School</Label>
            <Input 
              id="school"
              value={education.school}
              onChange={(e) => setProfile({
                ...profile, 
                education: {...education, school: e.target.value}
              })}
            />
          </div>
          <div>
            <Label htmlFor="graduation">Graduation Year</Label>
            <Input 
              id="graduation"
              type="number"
              value={education.graduationYear}
              onChange={(e) => setProfile({
                ...profile, 
                education: {...education, graduationYear: parseInt(e.target.value) || 0}
              })}
            />
          </div>
          <div>
            <Label htmlFor="gpa">GPA</Label>
            <Input 
              id="gpa"
              type="number"
              step="0.1"
              value={education.gpa}
              onChange={(e) => setProfile({
                ...profile, 
                education: {...education, gpa: parseFloat(e.target.value) || 0}
              })}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicInfo;
