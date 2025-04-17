
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Trophy, Medal, Target, Star, Users, Crown } from 'lucide-react';

interface ProfileSetupRewardsProps {
  formProgress: number;
}

const ProfileSetupRewards: React.FC<ProfileSetupRewardsProps> = ({ formProgress }) => {
  const rewards = [
    { 
      title: "Basic Profile", 
      description: "Complete your basic info", 
      threshold: 30, 
      icon: BookOpen,
      color: "text-blue-500",
      bgColor: "bg-blue-100" 
    },
    { 
      title: "Sports Expert", 
      description: "Add your sports details", 
      threshold: 60, 
      icon: Medal,
      color: "text-amber-500",
      bgColor: "bg-amber-100" 
    },
    { 
      title: "All Star", 
      description: "Complete your full profile", 
      threshold: 100, 
      icon: Trophy,
      color: "text-green-500",
      bgColor: "bg-green-100" 
    },
  ];

  return (
    <Card className="border border-muted/30 shadow-sm overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-2 pt-4 px-4 border-b border-muted/20">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Trophy className="h-4 w-4 text-amber-500" />
          Profile Completion Rewards
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {rewards.map((reward) => {
          const isUnlocked = formProgress >= reward.threshold;
          
          return (
            <div key={reward.title} className="space-y-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-full ${reward.bgColor}`}>
                    <reward.icon className={`h-3.5 w-3.5 ${reward.color}`} />
                  </div>
                  <span className="text-sm font-medium">{reward.title}</span>
                </div>
                <Badge variant={isUnlocked ? "default" : "outline"} className={isUnlocked ? "bg-gradient-to-r from-indigo-500 to-blue-500" : ""}>
                  {isUnlocked ? "Unlocked" : `${reward.threshold}%`}
                </Badge>
              </div>
              <div className="pl-7 text-xs text-muted-foreground">
                {reward.description}
              </div>
              <Progress 
                value={Math.min(100, (formProgress / reward.threshold) * 100)} 
                className="h-1.5 mt-1"
                indicatorClassName={isUnlocked ? "bg-gradient-to-r from-indigo-400 to-blue-400" : "bg-slate-200"} 
              />
            </div>
          );
        })}
        
        {formProgress === 100 && (
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-3 rounded-lg border border-amber-100 mt-4 flex items-center gap-3">
            <div className="bg-amber-100 p-1.5 rounded-full">
              <Crown className="h-4 w-4 text-amber-500" />
            </div>
            <div>
              <p className="text-sm font-medium">Profile Complete!</p>
              <p className="text-xs text-muted-foreground">Your profile is now visible to colleges and recruiters</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileSetupRewards;
