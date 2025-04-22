
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { StatDefinition } from '@/utils/sportsStatsData';

interface SportStatsTabProps {
  primarySport?: string;
  primaryPosition?: string;
  suggestedStats: StatDefinition[];
  selectedStat: string;
  onStatSelect: (stat: StatDefinition) => void;
}

export const SportStatsTab: React.FC<SportStatsTabProps> = ({
  primarySport,
  primaryPosition,
  suggestedStats,
  selectedStat,
  onStatSelect
}) => {
  if (!primarySport) {
    return (
      <div className="text-center py-4">
        <AlertCircle className="mx-auto h-8 w-8 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          To see suggested stats, first add your primary sport in your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Suggested statistics for {primaryPosition ? `${primaryPosition} in ${primarySport}` : primarySport}:
      </div>
      <div className="grid grid-cols-2 gap-2">
        {suggestedStats.map((stat) => (
          <div 
            key={stat.id} 
            className={`p-2 text-sm rounded-md cursor-pointer border ${
              selectedStat === stat.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onStatSelect(stat)}
          >
            <div className="font-medium">{stat.label}</div>
            {stat.description && (
              <div className="text-xs text-gray-500">{stat.description}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
