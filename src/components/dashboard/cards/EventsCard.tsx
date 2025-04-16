
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EventsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-gray-50 p-3 rounded-md">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Virtual Recruiting Meet</h4>
                <p className="text-sm text-gray-600">Stanford University</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">May 15, 2025</p>
                <p className="text-xs text-gray-600">3:00 PM CET</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-md">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Q&A with Coach Williams</h4>
                <p className="text-sm text-gray-600">UCLA</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">May 22, 2025</p>
                <p className="text-xs text-gray-600">5:00 PM CET</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventsCard;
