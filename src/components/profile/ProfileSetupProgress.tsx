
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Award, CheckCircle } from 'lucide-react';

interface ProfileSetupProgressProps {
  currentStep: number;
  totalSteps: number;
}

const ProfileSetupProgress: React.FC<ProfileSetupProgressProps> = ({ currentStep, totalSteps }) => {
  const progressPercentage = Math.floor((currentStep / totalSteps) * 100);
  
  return (
    <div className="space-y-2 mb-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Setting up your profile</span>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
            Step {currentStep} of {totalSteps}
          </span>
        </div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center space-x-1 bg-slate-50 px-2 py-1 rounded-md">
                {progressPercentage === 100 ? (
                  <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                ) : (
                  <Award className="h-3.5 w-3.5 text-amber-500" />
                )}
                <span className="text-sm font-medium">{progressPercentage}% Complete</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Complete all fields to maximize your profile visibility</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <Progress 
        value={progressPercentage} 
        className="h-2 bg-gray-100"
        indicatorClassName={progressPercentage === 100 ? "bg-gradient-to-r from-green-400 to-emerald-500" : "bg-gradient-to-r from-blue-400 to-indigo-500"}
      />
    </div>
  );
};

export default ProfileSetupProgress;
