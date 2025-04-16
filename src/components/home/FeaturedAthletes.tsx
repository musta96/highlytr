
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Star, Users, UserPlus, CalendarClock } from 'lucide-react';

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
        </div>
        
        <div className="bg-gradient-to-r from-highlyt-blue/10 to-highlyt-green/10 rounded-xl p-12 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center p-3 bg-highlyt-blue/20 text-highlyt-blue rounded-full mb-6">
              <CalendarClock className="h-8 w-8" />
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Featured Athletes Coming Soon!
            </h3>
            
            <p className="text-lg text-gray-600 mb-8">
              Be among the first athletes to get featured on our platform! Create your profile today and showcase your talents to college recruiters worldwide.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  <UserPlus className="mr-2 h-5 w-5" />
                  Join as Athlete
                </Button>
              </Link>
              <Link to="/for-athletes">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 flex items-center justify-center space-x-6">
              <div className="flex flex-col items-center">
                <Star className="h-6 w-6 text-yellow-500 mb-2" />
                <span className="font-bold text-2xl">0</span>
                <span className="text-gray-600 text-sm">Athletes Featured</span>
              </div>
              
              <div className="h-12 border-l border-gray-300"></div>
              
              <div className="flex flex-col items-center">
                <Users className="h-6 w-6 text-highlyt-blue mb-2" />
                <span className="font-bold text-2xl">0</span>
                <span className="text-gray-600 text-sm">Athletes Registered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedAthletes;
