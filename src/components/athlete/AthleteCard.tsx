
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Star, MapPin } from 'lucide-react';

interface AthleteCardProps {
  athlete: {
    id: number;
    name: string;
    sport: string;
    position: string;
    age: number;
    location: string;
    image: string;
    stats: {
      gpa: number;
      goals?: number;
      assists?: number;
      cleanSheets?: number;
      savePercentage?: number;
    };
  };
  featured?: boolean;
}

const AthleteCard = ({ athlete, featured = false }: AthleteCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-shadow hover:shadow-lg">
      <div className="relative">
        <div className="aspect-[4/5] w-full">
          <img 
            src={athlete.image} 
            alt={athlete.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
          {featured && (
            <div className="flex items-center gap-2 text-xs mb-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>Featured Athlete</span>
            </div>
          )}
          <h3 className="font-bold text-lg">{athlete.name}</h3>
          <div className="flex flex-wrap gap-2 mt-1">
            <div className="bg-highlyt-blue/80 text-xs py-0.5 px-2 rounded">
              {athlete.sport}
            </div>
            <div className="bg-highlyt-green/80 text-xs py-0.5 px-2 rounded">
              {athlete.position}
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          <span>{athlete.location}</span>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center p-2 bg-gray-50 rounded">
            <p className="text-xs text-gray-500">Age</p>
            <p className="font-semibold">{athlete.age}</p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded">
            <p className="text-xs text-gray-500">GPA</p>
            <p className="font-semibold">{athlete.stats.gpa}</p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded">
            <p className="text-xs text-gray-500">{athlete.stats.goals ? 'Goals' : 'Clean Sheets'}</p>
            <p className="font-semibold">{athlete.stats.goals || athlete.stats.cleanSheets}</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Link to={`/athletes/${athlete.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">View Profile</Button>
          </Link>
          <Link to={`/connect/${athlete.id}`} className="flex-1">
            <Button size="sm" className="w-full">Connect</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AthleteCard;
