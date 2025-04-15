
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Trophy, Share2, School } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="py-20 md:py-28 hero-pattern">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="h1">
              <span className="text-highlyt-blue">Showcase Your Talent.</span> Connect With U.S. Colleges.
            </h1>
            <p className="text-xl text-gray-600 max-w-lg">
              HighLytr connects international high school athletes directly with U.S. college coaches—no expensive middlemen required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  How It Works
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4 pt-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                <div className="w-8 h-8 rounded-full bg-gray-400"></div>
                <div className="w-8 h-8 rounded-full bg-gray-500"></div>
              </div>
              <p className="text-sm text-gray-600">
                Trusted by <span className="font-semibold">200+</span> athletes and <span className="font-semibold">50+</span> colleges
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-video overflow-hidden rounded-lg shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1526232761682-d26e03ac148e" 
                alt="Soccer player kicking ball" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                <div className="text-white">
                  <p className="text-sm font-semibold">Marco Rossi</p>
                  <p className="text-xs opacity-80">Recruited by University of California</p>
                </div>
              </div>
            </div>
            
            <div className="hidden md:block absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center gap-4">
                <div className="bg-highlyt-blue/10 p-2 rounded-full">
                  <Trophy className="h-6 w-6 text-highlyt-blue" />
                </div>
                <div>
                  <p className="font-semibold">Success Stories</p>
                  <p className="text-sm text-gray-500">100+ scholarships secured</p>
                </div>
              </div>
            </div>
            
            <div className="hidden md:block absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center gap-4">
                <div className="bg-highlyt-green/10 p-2 rounded-full">
                  <School className="h-6 w-6 text-highlyt-green" />
                </div>
                <div>
                  <p className="font-semibold">College Network</p>
                  <p className="text-sm text-gray-500">50+ U.S. colleges</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
