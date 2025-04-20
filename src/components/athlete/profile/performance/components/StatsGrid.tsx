
import React from 'react';
import { StatTooltip } from './StatTooltip';

interface StatsGridProps {
  stats: Record<string, any>;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
      {Object.entries(stats).map(([key, stat]) => (
        <StatTooltip key={key} statKey={key} stat={stat} />
      ))}
    </div>
  );
};
