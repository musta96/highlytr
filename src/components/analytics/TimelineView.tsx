
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getTimelineData } from '@/services/analyticsService';

interface TimelineViewProps {
  dateRange: '7d' | '30d' | '90d' | '1y';
}

const TimelineView = ({ dateRange }: TimelineViewProps) => {
  const timelineData = getTimelineData(dateRange);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recruitment Timeline</CardTitle>
        <CardDescription>
          Chronological view of your recruiting journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
          {timelineData.map((event, index) => (
            <div key={index} className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group">
              {/* Icon */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border bg-white shadow-sm text-slate-500 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                {event.icon}
              </div>
              
              {/* Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-lg border shadow-sm">
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <div className="font-semibold text-slate-900">{event.title}</div>
                  <div className="flex items-center">
                    <Badge variant="outline" className="text-xs">{event.type}</Badge>
                  </div>
                </div>
                <div className="text-sm text-slate-500 mb-2">{event.date}</div>
                <div className="text-sm">{event.description}</div>
                {event.details && (
                  <div className="text-xs text-slate-500 mt-2 italic">{event.details}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TimelineView;
