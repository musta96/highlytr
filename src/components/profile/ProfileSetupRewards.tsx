
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Gift, TrendingUp, Users, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProfileSetupRewardsProps {
  formProgress: number;
}

interface RewardItem {
  icon: React.ReactNode;
  name: string;
  description: string;
  threshold: number;
  unlocked: boolean;
}

const ProfileSetupRewards: React.FC<ProfileSetupRewardsProps> = ({ formProgress }) => {
  const [rewards, setRewards] = useState<RewardItem[]>([
    {
      icon: <Zap className="h-4 w-4" />,
      name: "Quick Starter",
      description: "Started setting up your profile",
      threshold: 10,
      unlocked: false,
    },
    {
      icon: <TrendingUp className="h-4 w-4" />,
      name: "On the Rise",
      description: "Profile 50% complete",
      threshold: 50,
      unlocked: false,
    },
    {
      icon: <Users className="h-4 w-4" />,
      name: "Networker",
      description: "Eligible for connection recommendations",
      threshold: 75,
      unlocked: false,
    },
    {
      icon: <Award className="h-4 w-4" />,
      name: "All-Star",
      description: "Completed your entire profile",
      threshold: 100,
      unlocked: false,
    },
  ]);
  
  const [showAnimation, setShowAnimation] = useState<number | null>(null);
  
  useEffect(() => {
    // Update rewards when form progress changes
    const updatedRewards = rewards.map(reward => ({
      ...reward,
      unlocked: formProgress >= reward.threshold
    }));
    
    // Find newly unlocked rewards
    const newlyUnlocked = updatedRewards.findIndex(
      (reward, index) => reward.unlocked && !rewards[index].unlocked
    );
    
    if (newlyUnlocked !== -1) {
      setShowAnimation(newlyUnlocked);
      setTimeout(() => setShowAnimation(null), 3000);
    }
    
    setRewards(updatedRewards);
  }, [formProgress]);
  
  return (
    <Card className="overflow-hidden border-primary/10">
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-3 flex items-center justify-between border-b border-amber-100">
        <h3 className="font-medium text-sm flex items-center gap-2">
          <Gift className="h-4 w-4 text-amber-500" />
          Profile Rewards
        </h3>
        <span className="text-xs text-muted-foreground">
          {rewards.filter(r => r.unlocked).length}/{rewards.length} Unlocked
        </span>
      </div>
      
      <CardContent className="p-3">
        <div className="space-y-2">
          {rewards.map((reward, index) => (
            <div 
              key={reward.name}
              className={cn(
                "flex items-center gap-3 p-2 rounded-md transition-all",
                reward.unlocked ? "bg-primary/5" : "bg-muted/40 opacity-60",
                showAnimation === index && "animate-pulse-glow"
              )}
            >
              <div className={cn(
                "p-1.5 rounded-full",
                reward.unlocked ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
              )}>
                {reward.icon}
              </div>
              
              <div>
                <h4 className={cn(
                  "text-sm font-medium",
                  reward.unlocked ? "text-foreground" : "text-muted-foreground"
                )}>
                  {reward.name}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {reward.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSetupRewards;
