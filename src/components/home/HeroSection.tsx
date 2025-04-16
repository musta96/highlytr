
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Trophy, Share2, School, ArrowRight, Star } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

const HeroSection = () => {
  return (
    <section className="py-20 md:py-28 hero-pattern">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="h1">
              <span className="text-highlyt-blue">Showcase Your Talent.</span> Connect With U.S. Colleges.
            </h1>
            <p className="text-xl text-gray-600 max-w-lg">
              HighLytr connects international high school athletes directly with U.S. college coaches—no expensive middlemen required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto group animate-pulse-glow">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button size="lg" variant="outline" className="w-full sm:w-auto transition-all hover:bg-highlyt-blue/10">
                  How It Works
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4 pt-2">
              <div className="flex -space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-8 h-8 rounded-full border-2 border-white bg-gray-${300 + i * 100} hover:scale-110 transition-transform cursor-pointer`}
                    title="Athlete"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">
                Trusted by <span className="font-semibold">200+</span> athletes and <span className="font-semibold">50+</span> colleges
              </p>
            </div>
          </div>
          
          <div className="relative animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="aspect-video overflow-hidden rounded-lg shadow-xl hover-card">
              <img 
                src="https://images.unsplash.com/photo-1526232761682-d26e03ac148e" 
                alt="Soccer player kicking ball" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                <div className="text-white">
                  <p className="text-sm font-semibold flex items-center">
                    Marco Rossi 
                    <span className="ml-2 flex items-center text-yellow-400">
                      <Star className="h-3 w-3 fill-yellow-400" />
                      <Star className="h-3 w-3 fill-yellow-400" />
                      <Star className="h-3 w-3 fill-yellow-400" />
                      <Star className="h-3 w-3 fill-yellow-400" />
                      <Star className="h-3 w-3 fill-yellow-400" />
                    </span>
                  </p>
                  <p className="text-xs opacity-80">Recruited by University of California</p>
                </div>
              </div>
            </div>
            
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="hidden md:block absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg hover-card cursor-pointer">
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
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="font-medium">Success Stories</h4>
                  <p className="text-sm text-muted-foreground">
                    Over 100 athletes have secured scholarships to top U.S. colleges through HighLytr.
                  </p>
                  <Link to="/success-stories" className="text-sm text-highlyt-blue hover:underline">
                    Read their stories →
                  </Link>
                </div>
              </HoverCardContent>
            </HoverCard>
            
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="hidden md:block absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg hover-card cursor-pointer animate-float">
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
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="font-medium">Our College Network</h4>
                  <p className="text-sm text-muted-foreground">
                    Connect with over 50 verified U.S. colleges actively recruiting international talent.
                  </p>
                  <Link to="/colleges" className="text-sm text-highlyt-blue hover:underline">
                    Browse colleges →
                  </Link>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
