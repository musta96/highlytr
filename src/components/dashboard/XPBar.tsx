
import React from 'react';
import { Trophy, Award, Star } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface XPBarProps {
  currentXP: number;
  maxXP: number;
  level: number;
  badges?: { name: string; icon: string; description: string }[];
}

const XPBar = ({ currentXP, maxXP, level, badges = [] }: XPBarProps) => {
  const progressPercentage = Math.min(Math.round((currentXP / maxXP) * 100), 100);
  
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-500" />
          <h3 className="font-medium">Level {level}</h3>
        </div>
        <span className="text-sm text-muted-foreground">{currentXP}/{maxXP} XP</span>
      </div>
      
      <Progress value={progressPercentage} className="h-2" />
      
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium">Recent Badges</h4>
          <span className="text-xs text-muted-foreground hover:underline cursor-pointer">
            View All
          </span>
        </div>
        
        {badges.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {badges.map((badge, index) => (
              <div 
                key={index} 
                className="flex items-center gap-1 bg-muted/50 rounded-full px-3 py-1"
                title={badge.description}
              >
                {badge.icon === 'Star' && <Star className="h-3.5 w-3.5 text-amber-500" />}
                {badge.icon === 'Award' && <Award className="h-3.5 w-3.5 text-blue-500" />}
                <span className="text-xs font-medium">{badge.name}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">
            Complete actions to earn badges
          </div>
        )}
      </div>
    </div>
  );
};

export default XPBar;
