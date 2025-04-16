
import React from 'react';
import XPBar from '../XPBar';

interface ProgressCardProps {
  badges: { name: string; icon: string; description: string }[];
}

const ProgressCard = ({ badges }: ProgressCardProps) => {
  return (
    <div className="col-span-full sm:col-span-2 lg:col-span-1 order-first lg:order-none">
      <XPBar 
        currentXP={650} 
        maxXP={1000} 
        level={3} 
        badges={badges}
      />
      
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="p-2 rounded bg-muted/30">
          <p className="text-lg font-bold">42</p>
          <p className="text-xs text-muted-foreground">Profile Views</p>
        </div>
        <div className="p-2 rounded bg-muted/30">
          <p className="text-lg font-bold">5</p>
          <p className="text-xs text-muted-foreground">Videos</p>
        </div>
        <div className="p-2 rounded bg-muted/30">
          <p className="text-lg font-bold">8</p>
          <p className="text-xs text-muted-foreground">College Saves</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
