
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';

const athleteData = [
  {
    id: 1,
    name: 'Marco Rossi',
    sport: 'Soccer',
    position: 'Forward',
    age: 18,
    location: 'Milan, Italy',
    image: 'https://images.unsplash.com/photo-1606131731446-5568d87113aa',
    video: 'https://example.com/video1',
    stats: {
      gpa: 3.8,
      goals: 25,
      assists: 12
    }
  },
  {
    id: 2,
    name: 'Sofia Bianchi',
    sport: 'Soccer',
    position: 'Midfielder',
    age: 17,
    location: 'Rome, Italy',
    image: 'https://images.unsplash.com/photo-1591117207239-788bf8de6c3b',
    video: 'https://example.com/video2',
    stats: {
      gpa: 3.9,
      goals: 15,
      assists: 22
    }
  },
  {
    id: 3,
    name: 'Luca Ferrari',
    sport: 'Soccer',
    position: 'Goalkeeper',
    age: 19,
    location: 'Naples, Italy',
    image: 'https://images.unsplash.com/photo-1625631976793-a9f11bbb0738',
    video: 'https://example.com/video3',
    stats: {
      gpa: 3.6,
      cleanSheets: 12,
      savePercentage: 87
    }
  }
];

const AthleteCard = ({ athlete }: { athlete: typeof athleteData[0] }) => {
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
          <div className="flex items-center gap-2 text-xs mb-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>Featured Athlete</span>
          </div>
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

const FeaturedAthletes = () => {
  return (
    <section className="py-16">
      <div className="container">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="h2 mb-2">Featured Athletes</h2>
            <p className="text-gray-600 max-w-2xl">
              Discover talented Italian soccer players looking to continue their athletic careers at U.S. colleges.
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link to="/athletes">
              <Button variant="outline">View All Athletes</Button>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {athleteData.map(athlete => (
            <AthleteCard key={athlete.id} athlete={athlete} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedAthletes;
