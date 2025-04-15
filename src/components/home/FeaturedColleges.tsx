
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MapPin, Trophy, UsersRound } from 'lucide-react';

const collegeData = [
  {
    id: 1,
    name: 'University of California',
    location: 'Los Angeles, CA',
    division: 'NCAA Division I',
    sports: ['Soccer', 'Basketball', 'Swimming'],
    image: 'https://images.unsplash.com/photo-1598011523399-5baa6e41efdf',
    logo: 'https://images.unsplash.com/photo-1542401886-65d6c61db217?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8dW5pdmVyc2l0eSxsb2dvfHx8fHx8MTY4MDY3NjY1NQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080&h=1080&crop=faces&fit=crop',
    openPositions: 3
  },
  {
    id: 2,
    name: 'Stanford University',
    location: 'Palo Alto, CA',
    division: 'NCAA Division I',
    sports: ['Soccer', 'Tennis', 'Golf'],
    image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d',
    logo: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8dW5pdmVyc2l0eXx8fHx8fDE2ODA2NzYzMjI&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080&h=1080&crop=faces&fit=crop',
    openPositions: 5
  },
  {
    id: 3,
    name: 'University of Michigan',
    location: 'Ann Arbor, MI',
    division: 'NCAA Division I',
    sports: ['Soccer', 'Football', 'Track & Field'],
    image: 'https://images.unsplash.com/photo-1574340155242-f0e969be31a1',
    logo: 'https://images.unsplash.com/photo-1535982330050-f1c2fb79ff78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8dW5pdmVyc2l0eSxzY2hvb2x8fHx8fHwxNjgwNjc2NzAw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080&h=1080&crop=faces&fit=crop',
    openPositions: 2
  }
];

const CollegeCard = ({ college }: { college: typeof collegeData[0] }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-shadow hover:shadow-lg">
      <div className="relative">
        <div className="aspect-video w-full">
          <img 
            src={college.image} 
            alt={college.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="absolute top-4 left-4">
          <div className="h-12 w-12 rounded-md bg-white p-1 shadow-md">
            <img 
              src={college.logo} 
              alt={`${college.name} logo`}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        
        <div className="absolute top-4 right-4 bg-highlyt-blue text-white text-xs py-1 px-2 rounded font-medium">
          {college.division}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg">{college.name}</h3>
        
        <div className="flex items-center text-sm text-gray-600 mt-1 mb-3">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          <span>{college.location}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {college.sports.map((sport, idx) => (
            <div key={idx} className="bg-gray-100 text-xs py-1 px-2 rounded">
              {sport}
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm">
            <Trophy className="h-4 w-4 mr-1 text-highlyt-blue" />
            <span>NCAA Champion 2022</span>
          </div>
          <div className="flex items-center text-sm text-highlyt-green">
            <UsersRound className="h-4 w-4 mr-1" />
            <span>{college.openPositions} Open Positions</span>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Link to={`/colleges/${college.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">View College</Button>
          </Link>
          <Link to={`/colleges/${college.id}/coaches`} className="flex-1">
            <Button size="sm" className="w-full">Meet Coaches</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const FeaturedColleges = () => {
  return (
    <section className="py-16 bg-highlyt-gray">
      <div className="container">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="h2 mb-2">Featured Colleges</h2>
            <p className="text-gray-600 max-w-2xl">
              Top U.S. college athletic programs looking for international soccer talent.
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link to="/colleges">
              <Button variant="outline">View All Colleges</Button>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collegeData.map(college => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedColleges;
