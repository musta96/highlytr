
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

  // Memoize handlers for better performance
  const handleRemoveAchievement = React.useCallback((indexToRemove: number) => {
    setProfile({
      ...profile,
      achievements: achievements.filter((_, i) => i !== indexToRemove)
    });
  }, [profile, achievements, setProfile]);

  const handleAddAchievement = React.useCallback(() => {
    setProfile({
      ...profile,
      achievements: [...achievements, '']
    });
  }, [profile, achievements, setProfile]);

  const handleUpdateAchievement = React.useCallback((index: number, value: string) => {
    const newAchievements = [...achievements];
    newAchievements[index] = value;
    setProfile({...profile, achievements: newAchievements});
  }, [profile, achievements, setProfile]);

  return (
    <Card className="h-full transition-all">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-xl">
          <Trophy className="h-5 w-5 mr-2" />
          Achievements
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!isEditing ? (
          achievements.length > 0 ? (
            <ul className="list-disc pl-5 space-y-1.5">
              {achievements.map((achievement: string, index: number) => (
                <li key={index} className="text-sm sm:text-base">{achievement}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No achievements added yet.</p>
          )
        ) : (
          <div className="space-y-2">
            {achievements.map((achievement: string, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <Input 
                  value={achievement}
                  onChange={(e) => handleUpdateAchievement(index, e.target.value)}
                  className="text-sm h-9"
                />
                <Button 
                  variant="destructive" 
                  size="icon"
                  onClick={() => handleRemoveAchievement(index)}
                  className="h-9 w-9"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button 
              variant="outline" 
              onClick={handleAddAchievement}
              className="w-full text-sm"
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
