
import React from 'react';
import {
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
  Tooltip,
} from '@/components/ui/tooltip';
import { formatStatValue, getStatColor } from '@/utils/statsFormatter';
import { TrendingUp } from 'lucide-react';

interface StatTooltipProps {
  statKey: string;
  stat: {
    label: string;
    value: string | number;
    description?: string;
    trend?: string;
  };
}

export const StatTooltip: React.FC<StatTooltipProps> = ({ statKey, stat }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="bg-gray-50 p-4 rounded-lg text-center transition-all hover:shadow-md hover:bg-gray-100 cursor-pointer group">
            <div className="flex items-center justify-center mb-1">
              <p className={`text-2xl sm:text-3xl font-bold ${getStatColor(stat.value)}`}>
                {formatStatValue(stat.value)}
              </p>
              {stat.trend && (
                <TrendingUp className="h-4 w-4 ml-1 text-green-500" />
              )}
            </div>
            <p className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-800">
              {stat.label || statKey}
            </p>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-sm">
            <p className="font-semibold">{stat.label || statKey}</p>
            {stat.description && (
              <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
