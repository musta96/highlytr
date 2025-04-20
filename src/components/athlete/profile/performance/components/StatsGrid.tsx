
import React from 'react';
import { StatTooltip } from './StatTooltip';

interface StatsGridProps {
  stats: Record<string, any>;
  isEditing?: boolean;
  onUpdate?: (key: string, newValue: any) => void;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ 
  stats, 
  isEditing = false,
  onUpdate = () => {} 
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
      {Object.entries(stats).map(([key, stat]) => (
        <StatTooltip 
          key={key} 
          statKey={key} 
          stat={stat} 
          isEditing={isEditing}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};
