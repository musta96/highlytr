
import React, { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatStatValue, getStatColor } from '@/utils/statsFormatter';
import { StatDetailDialog } from './StatDetailDialog';

interface StatTooltipProps {
  statKey: string;
  stat: any;
  isEditing?: boolean;
  onUpdate?: (key: string, newValue: any) => void;
}

export const StatTooltip: React.FC<StatTooltipProps> = ({
  statKey,
  stat,
  isEditing = false,
  onUpdate = () => {}
}) => {
  const [showDetail, setShowDetail] = useState(false);

  const handleClick = () => {
    // Always show detail dialog on click
    setShowDetail(true);
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              onClick={handleClick}
              className="bg-gray-50 p-4 rounded-lg text-center transition-all hover:shadow-md hover:bg-gray-100 cursor-pointer group"
            >
              <div className="flex items-center justify-center mb-1">
                <p className={`text-2xl sm:text-3xl font-bold ${getStatColor(stat.value)}`}>
                  {formatStatValue(stat.value)}
                </p>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-800">
                {stat.label}
              </p>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="text-sm">
              <p className="font-semibold">{stat.label}</p>
              {stat.description && (
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <StatDetailDialog
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
        statKey={statKey}
        stat={stat}
        onUpdate={onUpdate}
        isEditing={isEditing}
      />
    </>
  );
};
