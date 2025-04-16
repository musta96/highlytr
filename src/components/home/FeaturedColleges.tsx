
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { School, Trophy, Clock, Sparkles } from 'lucide-react';

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
        </div>
        
        <div className="bg-white rounded-xl p-12 text-center shadow-md">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center p-3 bg-highlyt-green/20 text-highlyt-green rounded-full mb-6">
              <Sparkles className="h-8 w-8" />
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              College Partnerships Coming Soon!
            </h3>
            
            <p className="text-lg text-gray-600 mb-8">
              We're currently establishing partnerships with top U.S. colleges and universities. 
              Be the first to connect with international athletic talent when we launch!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="w-full sm:w-auto">
                  <School className="mr-2 h-5 w-5" />
                  Partner with Us
                </Button>
              </Link>
              <Link to="/for-colleges">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 flex items-center justify-center space-x-8">
              <div className="flex flex-col items-center">
                <Clock className="h-6 w-6 text-highlyt-blue mb-2" />
                <span className="text-gray-600 text-sm">Launching</span>
                <span className="font-bold text-xl">Fall 2025</span>
              </div>
              
              <div className="h-12 border-l border-gray-300"></div>
              
              <div className="flex flex-col items-center">
                <Trophy className="h-6 w-6 text-amber-500 mb-2" />
                <span className="text-gray-600 text-sm">Target</span>
                <span className="font-bold text-xl">50+ NCAA Colleges</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedColleges;
