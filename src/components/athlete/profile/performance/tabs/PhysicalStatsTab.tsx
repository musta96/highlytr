
import React from 'react';
import { Check } from 'lucide-react';
import { StatDefinition } from '@/utils/sportsStatsData';

interface PhysicalStatsTabProps {
  stats: StatDefinition[];
  selectedStat: string;
  onStatSelect: (stat: StatDefinition) => void;
}

export const PhysicalStatsTab: React.FC<PhysicalStatsTabProps> = ({
  stats,
  selectedStat,
  onStatSelect,
}) => {
  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground mb-2">Physical attributes and performance metrics:</div>
      <div className="grid grid-cols-2 gap-2">
        {stats.map((stat) => (
          <div 
            key={stat.id} 
            className={`p-2 text-sm rounded-md cursor-pointer border ${
              selectedStat === stat.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onStatSelect(stat)}
          >
            <div className="font-medium">{stat.label}</div>
            {stat.unit && <div className="text-xs text-gray-500">Unit: {stat.unit}</div>}
            {selectedStat === stat.id && (
              <div className="flex items-center text-primary text-xs mt-1">
                <Check className="h-3 w-3 mr-1" /> Selected
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
