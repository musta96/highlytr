
import React from 'react';
import { HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

const PlaceOfBirthTooltip = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/10">
          <HelpCircle className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Help with place of birth</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <p className="text-sm">
          Your place of birth helps colleges understand your background and may be relevant for scholarship eligibility.
        </p>
      </TooltipContent>
    </Tooltip>
  );
};

export default PlaceOfBirthTooltip;
