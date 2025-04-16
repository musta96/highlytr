
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Edit, 
  Video,
  Search,
  Users,
  BarChart,
  Medal,
  School,
  Briefcase,
  BookOpen
} from 'lucide-react';

interface QuickActionsCardProps {
  accountType: 'athlete' | 'college' | 'agency' | null;
}

const QuickActionsCard = ({ accountType }: QuickActionsCardProps) => {
  const getQuickLinks = () => {
    if (accountType === 'athlete') {
      return (
        <>
          <Link to="/profile/edit">
            <Button variant="outline" className="w-full justify-start">
              <Edit className="mr-2 h-4 w-4" />
              Update Profile
            </Button>
          </Link>
          <Link to="/videos/upload">
            <Button variant="outline" className="w-full justify-start">
              <Video className="mr-2 h-4 w-4" />
              Upload Video
            </Button>
          </Link>
          <Link to="/dashboard/colleges/search">
            <Button variant="outline" className="w-full justify-start">
              <Search className="mr-2 h-4 w-4" />
              Find Colleges
            </Button>
          </Link>
          <Link to="/dashboard/analytics">
            <Button variant="outline" className="w-full justify-start">
              <BarChart className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
          </Link>
        </>
      );
    } else if (accountType === 'college') {
      return (
        <>
          <Link to="/dashboard/athletes/search">
            <Button variant="outline" className="w-full justify-start">
              <Search className="mr-2 h-4 w-4" />
              Find Athletes
            </Button>
          </Link>
          <Link to="/college/edit">
            <Button variant="outline" className="w-full justify-start">
              <Edit className="mr-2 h-4 w-4" />
              Update College Profile
            </Button>
          </Link>
          <Link to="/staff/manage">
            <Button variant="outline" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Manage Staff Accounts
            </Button>
          </Link>
          <Link to="/dashboard/analytics">
            <Button variant="outline" className="w-full justify-start">
              <BarChart className="mr-2 h-4 w-4" />
              Recruiting Analytics
            </Button>
          </Link>
        </>
      );
    } else if (accountType === 'agency') {
      return (
        <>
          <Link to="/dashboard/represented">
            <Button variant="outline" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Manage Athletes
            </Button>
          </Link>
          <Link to="/dashboard/colleges/search">
            <Button variant="outline" className="w-full justify-start">
              <Search className="mr-2 h-4 w-4" />
              Find Colleges
            </Button>
          </Link>
          <Link to="/agency/edit">
            <Button variant="outline" className="w-full justify-start">
              <Edit className="mr-2 h-4 w-4" />
              Update Agency Profile
            </Button>
          </Link>
          <Link to="/dashboard/placements">
            <Button variant="outline" className="w-full justify-start">
              <Medal className="mr-2 h-4 w-4" />
              View Placements
            </Button>
          </Link>
        </>
      );
    }
    
    return null;
  };

  return (
    <Card className="sm:col-span-2 lg:col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
        <CardDescription>What you can do now</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {getQuickLinks()}
      </CardContent>
    </Card>
  );
};

export default QuickActionsCard;
