
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface CompletionStatusProps {
  completionStatus: {
    personalInfo: number;
    sportsInfo: number;
    overallCompletion: number;
  };
}

const CompletionStatus = ({ completionStatus }: CompletionStatusProps) => {
  return (
    <div className="mb-8 p-4 bg-white rounded-lg shadow-sm border">
      <div className="mb-2 flex justify-between items-center">
        <h2 className="font-semibold">Profile Completion</h2>
        <span className="text-sm font-medium">
          {completionStatus.overallCompletion}% Complete
        </span>
      </div>
      <Progress value={completionStatus.overallCompletion} className="h-2" />
      
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm">Personal Information</span>
            <span className="text-xs font-medium">{completionStatus.personalInfo}%</span>
          </div>
          <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full" 
              style={{width: `${completionStatus.personalInfo}%`}}
            />
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm">Sports Information</span>
            <span className="text-xs font-medium">{completionStatus.sportsInfo}%</span>
          </div>
          <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 rounded-full" 
              style={{width: `${completionStatus.sportsInfo}%`}}
            />
          </div>
        </div>
      </div>
      
      {completionStatus.overallCompletion < 100 && (
        <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-md flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-800">Your profile is incomplete</p>
            <p className="text-xs text-amber-700 mt-1">
              Complete your profile to increase visibility to coaches and recruiters
            </p>
          </div>
        </div>
      )}
      
      {completionStatus.overallCompletion === 100 && (
        <div className="mt-4 p-3 bg-green-50 border border-green-100 rounded-md flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-green-800">Your profile is complete!</p>
            <p className="text-xs text-green-700 mt-1">
              Your profile is now fully visible to coaches and recruiters
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompletionStatus;
