
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getRecruiterData } from '@/services/analyticsService';

interface RecruiterActivityProps {
  dateRange: '7d' | '30d' | '90d' | '1y';
}

const RecruiterActivity = ({ dateRange }: RecruiterActivityProps) => {
  const recruiterData = getRecruiterData(dateRange);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Recruiter Activity</CardTitle>
        <CardDescription>
          Track interactions from coaches and scouts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recruiterData.map((item, index) => (
            <div key={index} className="flex items-start border-b pb-4 last:border-0 last:pb-0">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mr-4 shrink-0">
                {item.recruiterName.charAt(0)}
              </div>
              <div className="flex-grow">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <div>
                    <p className="font-medium">{item.recruiterName}</p>
                    <p className="text-sm text-muted-foreground">{item.college}</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Badge variant={item.interestLevel === 'High' ? 'default' : 'outline'}>
                      {item.interestLevel} Interest
                    </Badge>
                    <span className="text-xs text-muted-foreground">{item.lastActivity}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm">{item.activityDescription}</p>
                </div>
              </div>
            </div>
          ))}
          {recruiterData.length === 0 && (
            <div className="text-center py-6">
              <p className="text-muted-foreground">No recruiter activity in this time period</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecruiterActivity;
