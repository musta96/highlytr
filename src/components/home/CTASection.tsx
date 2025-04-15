
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-highlyt-blue to-highlyt-green text-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Athletic Journey?
            </h2>
            <p className="text-lg mb-8 text-white/90">
              Join HighLytr today and connect directly with U.S. college coaches and programs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Create Free Account
                </Button>
              </Link>
              <Link to="/athletes">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                  Browse Athletes
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="lg:text-right">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg inline-block max-w-md mx-auto lg:mx-0">
              <h3 className="text-2xl font-semibold mb-4">Why Choose HighLytr?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-white rounded-full p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-highlyt-blue" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span>Direct access to college coaches</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-white rounded-full p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-highlyt-blue" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span>No expensive agency fees</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-white rounded-full p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-highlyt-blue" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span>Showcase your skills with video profiles</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-white rounded-full p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-highlyt-blue" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span>Guidance on eligibility and academic requirements</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-white rounded-full p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-highlyt-blue" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span>Dedicated success team to help you through the process</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
