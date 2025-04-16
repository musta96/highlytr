
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trophy } from 'lucide-react';

interface AchievementsProps {
  profile: any;
  isEditing: boolean;
  setProfile: (profile: any) => void;
}

const Achievements = ({ profile, isEditing, setProfile }: AchievementsProps) => {
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
          <ul className="list-disc pl-5 space-y-2">
            {profile.awards.map((award: string, index: number) => (
              <li key={index}>{award}</li>
            ))}
          </ul>
        ) : (
          <div className="space-y-3">
            {profile.awards.map((award: string, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <Input 
                  value={award}
                  onChange={(e) => {
                    const newAwards = [...profile.awards];
                    newAwards[index] = e.target.value;
                    setProfile({...profile, awards: newAwards});
                  }}
                />
                <Button 
                  variant="destructive" 
                  size="icon"
                  onClick={() => {
                    const newAwards = profile.awards.filter((_, i) => i !== index);
                    setProfile({...profile, awards: newAwards});
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                </Button>
              </div>
            ))}
            <Button 
              variant="outline" 
              onClick={() => {
                setProfile({...profile, awards: [...profile.awards, '']});
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
