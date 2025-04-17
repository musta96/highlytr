
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ProfileSetupProgressProps {
  currentStep: number;
  totalSteps: number;
}

const ProfileSetupProgress: React.FC<ProfileSetupProgressProps> = ({ currentStep, totalSteps }) => {
  const progressPercentage = Math.floor((currentStep / totalSteps) * 100);
  
  return (
    <div className="space-y-2 mb-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">Setting up your profile</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-sm font-medium">{progressPercentage}% Complete</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Complete all fields to maximize your profile visibility</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Progress value={progressPercentage} className="h-2" />
    </div>
  );
};

export default ProfileSetupProgress;
