
import React from 'react';
import { StatItem } from './StatItem';
import { Stat } from '@/types/stats';

interface StatsCategoryContentProps {
  stats: Stat[];
  isEditing: boolean;
  onDelete: (id: string) => void;
  title?: string;
}

export const StatsCategoryContent = ({ 
  stats, 
  isEditing, 
  onDelete, 
  title 
}: StatsCategoryContentProps) => {
  if (!stats?.length) {
    return (
      <div className="col-span-3 text-center py-4 text-muted-foreground">
        No stats added yet.
      </div>
    );
  }

  return (
    <div>
      {title && <h4 className="text-sm font-medium mb-3">{title}</h4>}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {stats.map(stat => (
          <StatItem 
            key={stat.id}
            label={stat.label} 
            value={stat.value} 
            change={stat.change} 
            isPositive={stat.isPositive}
            editable={isEditing}
            onDelete={() => onDelete(stat.id)}
          />
        ))}
      </div>
    </div>
  );
};
