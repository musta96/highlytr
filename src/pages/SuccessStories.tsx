
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';

const SuccessStories = () => {
  return (
    <Layout>
      <div className="container py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">Success Stories</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real athletes, real colleges, real success. Discover how HighLytr helps connect international talent with U.S. college opportunities.
          </p>
        </div>

        {/* Coming Soon Section */}
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="animate-pulse bg-highlyt-blue/10 p-8 rounded-full mb-8">
            <Clock className="h-20 w-20 text-highlyt-blue" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Success Stories Coming Soon
          </h2>
          
          <p className="text-xl text-center text-gray-600 max-w-2xl mx-auto mb-8">
            We're currently gathering inspiring stories from athletes who have successfully connected with U.S. colleges through HighLytr. Check back soon!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg">
              <Link to="/register">
                Be Part of Our Success Stories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link to="/how-it-works">
                Learn How It Works
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 bg-highlyt-blue text-white rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Begin Your Success Story Today</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Join HighLytr and start your journey to becoming our next success story.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/register">Sign Up Free</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent hover:bg-white/10 text-white border-white" asChild>
              <Link to="/how-it-works">Learn How It Works</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SuccessStories;
