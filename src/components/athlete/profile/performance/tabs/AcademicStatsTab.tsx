
import React from 'react';
import { Check } from 'lucide-react';
import { StatDefinition } from '@/utils/sportsStatsData';

interface AcademicStatsTabProps {
  stats: StatDefinition[];
  selectedStat: string;
  onStatSelect: (stat: StatDefinition) => void;
}

export const AcademicStatsTab: React.FC<AcademicStatsTabProps> = ({
  stats,
  selectedStat,
  onStatSelect,
}) => {
  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground mb-2">Academic performance metrics:</div>
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
