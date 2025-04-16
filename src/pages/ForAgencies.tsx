
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check, UserPlus, BarChart, Building, Users } from 'lucide-react';

const ForAgencies = () => {
  return (
    <Layout>
      <div className="container py-16">
        {/* Hero section */}
        <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
          <div className="space-y-6 md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold">
              Grow Your <span className="text-highlyt-blue">Recruitment Agency</span>
            </h1>
            <p className="text-xl text-gray-600">
              HighLytr helps sports recruitment agencies place more athletes in U.S. colleges with our success-fee model.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/register?type=agency">Register Your Agency</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/pricing">View Fee Structure</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692" 
                alt="Business meeting" 
                className="w-full object-cover aspect-video"
              />
            </div>
          </div>
        </div>

        {/* Features section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Tools for Recruitment Agencies</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="bg-highlyt-blue/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <UserPlus className="h-6 w-6 text-highlyt-blue" />
              </div>
              <h3 className="font-bold text-xl mb-2">Athlete Management</h3>
              <p className="text-gray-600">
                Create and manage athlete profiles under your agency banner with our intuitive dashboard.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="bg-highlyt-blue/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Building className="h-6 w-6 text-highlyt-blue" />
              </div>
              <h3 className="font-bold text-xl mb-2">College Network</h3>
              <p className="text-gray-600">
                Access our extensive network of U.S. colleges actively looking for international talent.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="bg-highlyt-blue/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-highlyt-blue" />
              </div>
              <h3 className="font-bold text-xl mb-2">Placement Tracking</h3>
              <p className="text-gray-600">
                Monitor the progress of your athletes from initial contact to successful college placement.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="bg-highlyt-blue/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-highlyt-blue" />
              </div>
              <h3 className="font-bold text-xl mb-2">Team Collaboration</h3>
              <p className="text-gray-600">
                Collaborate with your team members to manage athlete profiles and communications efficiently.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonial section */}
        <div className="mb-16 bg-gray-50 rounded-xl p-8">
          <div className="max-w-3xl mx-auto text-center">
            <blockquote className="text-xl italic mb-6">
              "As an agency specializing in soccer talent, HighLytr has been a game-changer. Their platform has helped us place 12 athletes in U.S. colleges in just six months."
            </blockquote>
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gray-300 mr-3"></div>
              <div className="text-left">
                <p className="font-bold">Carlos Mendez</p>
                <p className="text-sm text-gray-600">Director, Global Football Academy</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-highlyt-blue text-white rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Grow Your Agency?</h2>
          <p className="text-xl mb-6 max-w-xl mx-auto">
            Join HighLytr and start placing your athletes in top U.S. colleges without any upfront costs.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/register?type=agency">Register Your Agency</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default ForAgencies;
