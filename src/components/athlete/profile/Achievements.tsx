
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trophy, X } from 'lucide-react';
import { AthleteProfileData } from './ProfileData';

interface AchievementsProps {
  profile: AthleteProfileData;
  isEditing: boolean;
  setProfile: (profile: AthleteProfileData) => void;
}

const Achievements = ({ profile, isEditing, setProfile }: AchievementsProps) => {
  // Check if profile and achievements exist before attempting to map
  const achievements = profile?.achievements || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Trophy className="h-5 w-5 mr-2" />
          Achievements
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!isEditing ? (
          achievements.length > 0 ? (
            <ul className="list-disc pl-5 space-y-2">
              {achievements.map((achievement: string, index: number) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No achievements added yet.</p>
          )
        ) : (
          <div className="space-y-3">
            {achievements.map((achievement: string, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <Input 
                  value={achievement}
                  onChange={(e) => {
                    const newAchievements = [...achievements];
                    newAchievements[index] = e.target.value;
                    setProfile({...profile, achievements: newAchievements});
                  }}
                />
                <Button 
                  variant="destructive" 
                  size="icon"
                  onClick={() => {
                    const newAchievements = achievements.filter((_, i) => i !== index);
                    setProfile({...profile, achievements: newAchievements});
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button 
              variant="outline" 
              onClick={() => {
                setProfile({...profile, achievements: [...achievements, '']});
              }}
            >
              Add Achievement
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Achievements;
