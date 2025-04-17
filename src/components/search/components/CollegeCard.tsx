
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MapPin, Trophy, UsersRound, Star } from 'lucide-react';
import { College } from '../types';

interface CollegeCardProps {
  college: College;
}

const CollegeCard: React.FC<CollegeCardProps> = ({ college }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <img 
          src={college.image} 
          alt={college.name}
          className="w-full h-full object-cover"
        />
        {college.hasScholarships && (
          <div className="absolute top-2 right-2 bg-highlyt-blue text-white text-xs px-2 py-1 rounded-full">
            Scholarships Available
          </div>
        )}
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>{college.name}</span>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Star className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2 space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{college.location}</span>
        </div>
        <div className="text-sm text-gray-600">
          {college.division}
        </div>
        <div className="flex flex-wrap gap-1">
          {college.sports.slice(0, 3).map((sport, idx) => (
            <span key={idx} className="bg-gray-100 rounded-md px-2 py-1 text-xs">
              {sport}
            </span>
          ))}
          {college.sports.length > 3 && (
            <span className="bg-gray-100 rounded-md px-2 py-1 text-xs">
              +{college.sports.length - 3} more
            </span>
          )}
        </div>
        <div className="text-highlyt-blue text-sm font-medium">
          {college.openPositions} open positions
        </div>
      </CardContent>
      <CardFooter className="flex gap-3">
        <Link to={`/colleges/${college.id}`} className="flex-1">
          <Button variant="outline" size="sm" className="w-full">View College</Button>
        </Link>
        <Link to={`/colleges/${college.id}/coaches`} className="flex-1">
          <Button size="sm" className="w-full">Meet Coaches</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CollegeCard;
