
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, CheckCircle, Star, Trophy, Award } from 'lucide-react';
import { ProfileData } from '@/types/profile';

interface ProfileCompletionCardProps {
  profileData: ProfileData | null;
}

const ProfileCompletionCard: React.FC<ProfileCompletionCardProps> = ({ profileData }) => {
  if (!profileData) return null;
  
  // Calculate completion percentages for different sections
  const calculateCompletion = () => {
    // Personal info fields
    const personalFields = ['first_name', 'last_name', 'date_of_birth', 'place_of_birth', 'citizenship'];
    const personalComplete = personalFields.filter(field => !!profileData[field as keyof ProfileData]).length;
    const personalPercentage = Math.round((personalComplete / personalFields.length) * 100);
    
    // Sports info fields
    const sportsFields = ['primary_sport', 'primary_position'];
    const sportsComplete = sportsFields.filter(field => !!profileData[field as keyof ProfileData]).length;
    const sportsPercentage = Math.round((sportsComplete / sportsFields.length) * 100);
    
    // Overall completion (weighing personal as 60%, sports as 40%)
    const overallCompletion = Math.round((personalPercentage * 0.6) + (sportsPercentage * 0.4));
    
    return {
      personal: personalPercentage,
      sports: sportsPercentage,
      overall: overallCompletion,
      missingPersonalFields: personalFields.filter(field => !profileData[field as keyof ProfileData]),
      missingSportsFields: sportsFields.filter(field => !profileData[field as keyof ProfileData])
    };
  };
  
  const completionData = calculateCompletion();
  
  // Badge and icon for each milestone
  const getAchievementDetails = (percentage: number) => {
    if (percentage === 100) {
      return { 
        badge: "Completed",
        icon: <CheckCircle className="h-4 w-4 text-green-500" />,
        color: "bg-green-100 text-green-700 border-green-200" 
      };
    } else if (percentage >= 70) {
      return { 
        badge: "Almost There", 
        icon: <Star className="h-4 w-4 text-amber-500" />,
        color: "bg-amber-100 text-amber-700 border-amber-200" 
      };
    } else if (percentage >= 30) {
      return { 
        badge: "In Progress", 
        icon: <Trophy className="h-4 w-4 text-blue-500" />,
        color: "bg-blue-100 text-blue-600 border-blue-200" 
      };
    } else {
      return { 
        badge: "Just Started", 
        icon: <Award className="h-4 w-4 text-gray-500" />,
        color: "bg-gray-100 text-gray-700 border-gray-200" 
      };
    }
  };
  
  const personalDetails = getAchievementDetails(completionData.personal);
  const sportsDetails = getAchievementDetails(completionData.sports);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-500" /> 
          Profile Completion
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm">Overall Progress</span>
            <span className="text-sm font-medium">{completionData.overall}%</span>
          </div>
          <Progress value={completionData.overall} className="h-2" />
        </div>
        
        <div className="space-y-3">
          {/* Personal Info Section */}
          <div className="border rounded-md p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Personal Information</span>
              <span className={`text-xs px-2 py-0.5 rounded-full border ${personalDetails.color} flex items-center gap-1`}>
                {personalDetails.icon} {personalDetails.badge}
              </span>
            </div>
            <Progress value={completionData.personal} className="h-1.5" />
            
            {completionData.missingPersonalFields.length > 0 && (
              <div className="mt-3 text-xs text-gray-600">
                <span className="font-medium">Missing:</span>
                <ul className="list-disc pl-4 mt-1 space-y-0.5">
                  {completionData.missingPersonalFields.map((field, index) => (
                    <li key={index}>
                      {field.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          {/* Sports Info Section */}
          <div className="border rounded-md p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Sports Information</span>
              <span className={`text-xs px-2 py-0.5 rounded-full border ${sportsDetails.color} flex items-center gap-1`}>
                {sportsDetails.icon} {sportsDetails.badge}
              </span>
            </div>
            <Progress value={completionData.sports} className="h-1.5" />
            
            {completionData.missingSportsFields.length > 0 && (
              <div className="mt-3 text-xs text-gray-600">
                <span className="font-medium">Missing:</span>
                <ul className="list-disc pl-4 mt-1 space-y-0.5">
                  {completionData.missingSportsFields.map((field, index) => (
                    <li key={index}>
                      {field.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        {completionData.overall < 100 && (
          <div className="mt-2 p-2 bg-blue-50 rounded-md border border-blue-100 text-xs text-blue-700 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <p>Complete your profile to increase your visibility to coaches and recruiters.</p>
          </div>
        )}
        
        {completionData.overall === 100 && (
          <div className="mt-2 p-2 bg-green-50 rounded-md border border-green-100 text-xs text-green-700 flex items-start gap-2">
            <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <p>Great job! Your profile is now 100% complete and fully visible to coaches and recruiters.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileCompletionCard;
