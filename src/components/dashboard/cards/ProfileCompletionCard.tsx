
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Video } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';

const ProfileCompletionCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Completion</CardTitle>
        <CardDescription>Complete your profile to get noticed</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm font-medium">75%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-highlyt-blue h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link to="/profile/academic">
              <Button variant="outline" size="sm" className="w-full text-left justify-start">
                <BookOpen className="mr-2 h-4 w-4" />
                Add Academic Records
              </Button>
            </Link>
            
            <Link to="/videos/upload">
              <Button variant="outline" size="sm" className="w-full text-left justify-start">
                <Video className="mr-2 h-4 w-4" />
                Upload Game Footage
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCompletionCard;
