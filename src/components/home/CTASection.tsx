import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-highlyt-blue to-highlyt-green text-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Athletic Journey?
            </h2>
            <p className="text-lg mb-8 text-white/90">
              Join HighLytr today and connect directly with U.S. college coaches and programs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto group animate-pulse-glow hover:shadow-xl">
                  Create Free Account
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="lg:text-right animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="glass-effect p-6 rounded-lg inline-block max-w-md mx-auto lg:mx-0 hover:shadow-lg hover:shadow-white/10 transition-all">
              <h3 className="text-2xl font-semibold mb-4">Why Choose HighLytr?</h3>
              <ul className="space-y-3">
                {[
                  'Direct access to college coaches',
                  'No expensive agency fees',
                  'Showcase your skills with video profiles',
                  'Guidance on eligibility and academic requirements',
                  'Dedicated success team to help you through the process'
                ].map((item, index) => (
                  <li key={index} className="flex items-start group transition-all hover:translate-x-1">
                    <div className="bg-white rounded-full p-1 mr-3 mt-0.5 group-hover:bg-highlyt-green transition-colors">
                      <Check className="h-3 w-3 text-highlyt-blue group-hover:text-white transition-colors" />
                    </div>
                    <span className="group-hover:text-highlyt-green transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
