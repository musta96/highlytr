
import React from 'react';
import { Link } from 'react-router-dom';
import { Video, Search, LineChart } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

const WelcomeHeader = () => {
  const { user } = useAuth();
  const firstName = user?.user_metadata?.firstName || 'Athlete';
  
  return (
    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold">Welcome, {firstName}</h1>
        <p className="text-muted-foreground">Here's what's happening with your recruiting journey</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <Video className="mr-2 h-4 w-4" />
          Upload Video
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link to="/analytics">
            <LineChart className="mr-2 h-4 w-4" />
            Analytics
          </Link>
        </Button>
        <Button size="sm">
          <Search className="mr-2 h-4 w-4" />
          Find Colleges
        </Button>
      </div>
    </div>
  );
};

export default WelcomeHeader;
