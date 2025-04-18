
import React from 'react';
import { Link } from 'react-router-dom';
import { Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { cn } from "@/lib/utils";

interface DetailedProfileCompletionCardProps {
  className?: string; // Added className prop
}

const DetailedProfileCompletionCard = ({ className }: DetailedProfileCompletionCardProps) => {
  return (
    <Card className={cn(className)}>
      <CardHeader className="pb-3">
        <CardTitle>Profile Completion</CardTitle>
        <CardDescription>Complete your profile to increase visibility</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>Overall Progress</span>
              <span className="font-medium">33%</span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div className="bg-primary h-full w-1/3" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="border rounded-md p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Highlight Videos</span>
                <Badge variant="outline">0/3</Badge>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full">
                <div className="bg-primary h-full w-0" />
              </div>
            </div>
            
            <div className="border rounded-md p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Academics</span>
                <Badge variant="outline">1/3</Badge>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full">
                <div className="bg-primary h-full w-1/3" />
              </div>
            </div>
          </div>
          
          <Button variant="outline" className="w-full" asChild>
            <Link to="/dashboard/profile">
              <Edit className="mr-2 h-4 w-4" />
              Complete Your Profile
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailedProfileCompletionCard;
