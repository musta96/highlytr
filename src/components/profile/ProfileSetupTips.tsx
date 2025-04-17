
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const tips = [
  "Adding your place of birth helps colleges understand your background.",
  "Select your primary sport carefully - it will be featured on your profile.",
  "Complete all fields to appear in more search results.",
  "Your profile will be visible to recruiters only after completion.",
  "Athletes with complete profiles receive 3x more interest from colleges.",
  "Make sure to select the right city from the dropdown for accurate matching.",
  "The more detailed your profile is, the better matches you'll receive.",
];

const ProfileSetupTips: React.FC = () => {
  const [currentTip, setCurrentTip] = useState(0);
  const [showTips, setShowTips] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Auto-rotate tips
  useEffect(() => {
    const interval = setInterval(() => {
      if (showTips && !isAnimating) {
        nextTip();
      }
    }, 8000);
    
    return () => clearInterval(interval);
  }, [showTips, isAnimating]);
  
  const nextTip = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
      setIsAnimating(false);
    }, 300);
  };
  
  if (!showTips) return null;
  
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100 animate-float mb-6 overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <div className="mt-0.5">
              <div className="bg-amber-100 rounded-full p-1.5">
                <Lightbulb className="h-4 w-4 text-amber-500" />
              </div>
            </div>
            <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
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
              className="h-8 px-2 text-xs group"
              disabled={isAnimating}
            >
              <span>Next Tip</span>
              <ArrowRight className="h-3 w-3 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 rounded-full opacity-50 hover:opacity-100 hover:bg-gray-100" 
              onClick={() => setShowTips(false)}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Close tips</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSetupTips;
