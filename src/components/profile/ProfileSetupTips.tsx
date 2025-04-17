
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const tips = [
  "Adding your place of birth helps colleges understand your background.",
  "Select your primary sport carefully - it will be featured on your profile.",
  "Complete all fields to appear in more search results.",
  "Your profile will be visible to recruiters only after completion.",
  "Athletes with complete profiles receive 3x more interest from colleges.",
];

const ProfileSetupTips: React.FC = () => {
  const [currentTip, setCurrentTip] = useState(0);
  const [showTips, setShowTips] = useState(true);
  
  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % tips.length);
  };
  
  if (!showTips) return null;
  
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100 animate-float mb-6">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <div className="mt-0.5">
              <Lightbulb className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <h4 className="font-medium text-sm mb-1">Pro Tip</h4>
              <p className="text-sm text-muted-foreground">
                {tips[currentTip]}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={nextTip} 
              className="h-8 px-2 text-xs"
            >
              Next Tip
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6" 
              onClick={() => setShowTips(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSetupTips;
