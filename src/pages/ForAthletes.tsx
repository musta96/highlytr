
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check, Trophy, Video, MessageSquare, Star } from 'lucide-react';

const ForAthletes = () => {
  return (
    <Layout>
      <div className="container py-16">
        {/* Hero section */}
        <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
          <div className="space-y-6 md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold">
              Showcase Your Talent to <span className="text-highlyt-blue">U.S. Colleges</span>
            </h1>
            <p className="text-xl text-gray-600">
              HighLytr helps international student-athletes connect directly with U.S. college coaches—no expensive middlemen required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/register?type=athlete">Create Free Profile</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/how-it-works">Learn How It Works</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211" 
                alt="Athlete in action" 
                className="w-full object-cover aspect-video"
              />
            </div>
          </div>
        </div>

        {/* Features section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">How HighLytr Helps Athletes</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="bg-highlyt-blue/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Trophy className="h-6 w-6 text-highlyt-blue" />
              </div>
              <h3 className="font-bold text-xl mb-2">Showcase Your Skills</h3>
              <p className="text-gray-600">
                Build a comprehensive profile with your stats, achievements, and highlight videos that coaches can easily discover.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="bg-highlyt-blue/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Video className="h-6 w-6 text-highlyt-blue" />
              </div>
              <h3 className="font-bold text-xl mb-2">Highlight Videos</h3>
              <p className="text-gray-600">
                Upload and manage your best athletic moments in high quality to stand out from the crowd.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="bg-highlyt-blue/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-highlyt-blue" />
              </div>
              <h3 className="font-bold text-xl mb-2">Direct Communication</h3>
              <p className="text-gray-600">
                Message college coaches directly without any intermediaries, building genuine connections.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonial section */}
        <div className="mb-16 bg-gray-50 rounded-xl p-8">
          <div className="max-w-3xl mx-auto text-center">
            <Star className="h-8 w-8 text-highlyt-blue mx-auto mb-4" />
            <blockquote className="text-xl italic mb-6">
              "HighLytr helped me connect with coaches I never would have reached otherwise. Now I'm playing Division I volleyball at my dream school!"
            </blockquote>
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gray-300 mr-3"></div>
              <div className="text-left">
                <p className="font-bold">Maria Rodriguez</p>
                <p className="text-sm text-gray-600">International Student-Athlete</p>
              </div>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">The Path to Your Athletic Scholarship</h2>
          
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="bg-highlyt-blue text-white w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                1
              </div>
              <div className="md:flex-1">
                <h3 className="font-bold text-xl mb-2">Create Your Profile</h3>
                <p className="text-gray-600">
                  Sign up for free and build your athletic profile with your stats, academic achievements, and personal information.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="bg-highlyt-blue text-white w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                2
              </div>
              <div className="md:flex-1">
                <h3 className="font-bold text-xl mb-2">Upload Your Highlights</h3>
                <p className="text-gray-600">
                  Showcase your athletic abilities with highlight videos, which are critical for coaches evaluating international talent.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="bg-highlyt-blue text-white w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                3
              </div>
              <div className="md:flex-1">
                <h3 className="font-bold text-xl mb-2">Connect with Colleges</h3>
                <p className="text-gray-600">
                  Browse and filter college programs that match your preferences and academic requirements.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="bg-highlyt-blue text-white w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                4
              </div>
              <div className="md:flex-1">
                <h3 className="font-bold text-xl mb-2">Communicate Directly</h3>
                <p className="text-gray-600">
                  Message coaches directly, build relationships, and receive scholarship offers without intermediaries.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-highlyt-blue text-white rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Athletic Journey?</h2>
          <p className="text-xl mb-6 max-w-xl mx-auto">
            Join thousands of athletes who have found their perfect college match through HighLytr.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/register?type=athlete">Create Your Free Profile</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default ForAthletes;
