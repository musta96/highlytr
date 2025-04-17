
import React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

const PlaceOfBirthTooltip: React.FC = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="p-1.5 rounded-full hover:bg-muted cursor-help">
          <Info className="h-4 w-4 text-muted-foreground" />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-sm max-w-60">Your place of birth helps personalize your experience and connect you with others from your region</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default PlaceOfBirthTooltip;
