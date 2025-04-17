
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, BookOpen, Star } from 'lucide-react';
import { Athlete } from '../types';

interface AthleteCardProps {
  athlete: Athlete;
}

const AthleteCard: React.FC<AthleteCardProps> = ({ athlete }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <img 
          src={athlete.image} 
          alt={athlete.name}
          className="w-full h-full object-cover"
        />
        {athlete.verified && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            Verified
          </div>
        )}
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>{athlete.name}</span>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Star className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">{athlete.sport}</span>
          <span className="font-medium">{athlete.position}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{athlete.location}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <BookOpen className="h-4 w-4 mr-1" />
          <span>GPA: {athlete.gpa}</span>
        </div>
        <div className="bg-gray-100 rounded-md px-2 py-1 text-xs">
          {athlete.highlights} highlight videos
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">View Profile</Button>
      </CardFooter>
    </Card>
  );
};

export default AthleteCard;
