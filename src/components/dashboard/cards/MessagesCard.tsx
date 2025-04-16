
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const MessagesCard = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">New Messages</CardTitle>
        <CardDescription>Unread conversations</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col h-full">
        <div className="text-2xl font-bold mb-1">3</div>
        <div className="space-y-4 mt-4 flex-grow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">Coach Smith</p>
                <p className="text-xs text-gray-500">Stanford University</p>
              </div>
            </div>
            <div className="w-2 h-2 rounded-full bg-highlyt-blue"></div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">Coach Johnson</p>
                <p className="text-xs text-gray-500">UCLA</p>
              </div>
            </div>
            <div className="w-2 h-2 rounded-full bg-highlyt-blue"></div>
          </div>
        </div>
        
        <Link to="/dashboard/messages">
          <Button variant="ghost" size="sm" className="w-full mt-4">
            View All Messages
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default MessagesCard;
