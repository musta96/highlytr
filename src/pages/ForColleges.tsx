import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Search, Users, MessageSquare, Filter, Check } from 'lucide-react';

const ForColleges = () => {
  return (
    <Layout>
      <div className="container py-16">
        {/* Hero section */}
        <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
          <div className="space-y-6 md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold">
              Discover Elite <span className="text-highlyt-blue">International Talent</span>
            </h1>
            <p className="text-xl text-gray-600">
              HighLytr connects college coaches directly with international student-athletes, streamlining your recruitment process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/register?type=college">Register Your College</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1" 
                alt="College campus" 
                className="w-full object-cover aspect-video"
              />
            </div>
          </div>
        </div>

        {/* Features section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Recruitment Tools for Colleges</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="bg-highlyt-blue/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-highlyt-blue" />
              </div>
              <h3 className="font-bold text-xl mb-2">Advanced Search</h3>
              <p className="text-gray-600">
                Filter athletes by sport, position, academic achievements, location, and more.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="bg-highlyt-blue/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Filter className="h-6 w-6 text-highlyt-blue" />
              </div>
              <h3 className="font-bold text-xl mb-2">AI Matching</h3>
              <p className="text-gray-600">
                Get AI-powered recommendations for athletes who match your team's specific needs.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="bg-highlyt-blue/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-highlyt-blue" />
              </div>
              <h3 className="font-bold text-xl mb-2">Direct Messaging</h3>
              <p className="text-gray-600">
                Connect directly with athletes and their families without intermediaries.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="bg-highlyt-blue/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-highlyt-blue" />
              </div>
              <h3 className="font-bold text-xl mb-2">Team Management</h3>
              <p className="text-gray-600">
                Collaborate with your coaching staff to evaluate and track recruitment progress.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonial section */}
        <div className="mb-16 bg-gray-50 rounded-xl p-8">
          <div className="max-w-3xl mx-auto text-center">
            <blockquote className="text-xl italic mb-6">
              "HighLytr has revolutionized our international recruitment. We've found talented athletes we never would have discovered through traditional channels."
            </blockquote>
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gray-300 mr-3"></div>
              <div className="text-left">
                <p className="font-bold">Coach Sarah Thompson</p>
                <p className="text-sm text-gray-600">Women's Soccer, Pacific University</p>
              </div>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Streamlined Recruitment Process</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="font-bold text-xl mb-4 flex items-center">
                <span className="bg-highlyt-blue text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">1</span>
                Register Your College
              </div>
              <p className="text-gray-600 mb-4">
                Create your college profile with details about your athletic programs, academic offerings, and campus culture.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="font-bold text-xl mb-4 flex items-center">
                <span className="bg-highlyt-blue text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">2</span>
                Search for Athletes
              </div>
              <p className="text-gray-600 mb-4">
                Use our powerful search tools to find athletes that match your specific criteria and needs.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="font-bold text-xl mb-4 flex items-center">
                <span className="bg-highlyt-blue text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">3</span>
                Review Profiles & Videos
              </div>
              <p className="text-gray-600 mb-4">
                Evaluate athletic performance, academic achievements, and compatibility with your program.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="font-bold text-xl mb-4 flex items-center">
                <span className="bg-highlyt-blue text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">4</span>
                Connect Directly
              </div>
              <p className="text-gray-600 mb-4">
                Initiate conversations with promising athletes and begin the recruitment process.
              </p>
            </div>
          </div>
        </div>

        {/* Pricing overview */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Flexible Plans for Every Program</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <h3 className="font-bold text-xl mb-2">Basic</h3>
              <p className="text-3xl font-bold mb-4">$99<span className="text-sm font-normal text-gray-600">/month</span></p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-highlyt-green mr-2" />
                  <span>Up to 3 coach accounts</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-highlyt-green mr-2" />
                  <span>Basic athlete search</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-highlyt-green mr-2" />
                  <span>Message up to 20 athletes/month</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/register?type=college&plan=basic">Get Started</Link>
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-2 border-highlyt-blue relative">
              <div className="absolute -top-3 right-4 bg-highlyt-blue text-white text-xs px-2 py-1 rounded">Most Popular</div>
              <h3 className="font-bold text-xl mb-2">Premium</h3>
              <p className="text-3xl font-bold mb-4">$199<span className="text-sm font-normal text-gray-600">/month</span></p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-highlyt-green mr-2" />
                  <span>Unlimited coach accounts</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-highlyt-green mr-2" />
                  <span>Advanced search filters</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-highlyt-green mr-2" />
                  <span>AI athlete matching</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-highlyt-green mr-2" />
                  <span>Unlimited messaging</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-highlyt-green mr-2" />
                  <span>Team collaboration tools</span>
                </li>
              </ul>
              <Button className="w-full" asChild>
                <Link to="/register?type=college&plan=premium">Get Started</Link>
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <h3 className="font-bold text-xl mb-2">Enterprise</h3>
              <p className="text-3xl font-bold mb-4">Custom</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-highlyt-green mr-2" />
                  <span>All Premium features</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-highlyt-green mr-2" />
                  <span>Custom integrations</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-highlyt-green mr-2" />
                  <span>Dedicated account manager</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-highlyt-green mr-2" />
                  <span>Multi-department support</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/contact?inquiry=enterprise">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-highlyt-blue text-white rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Recruitment Process?</h2>
          <p className="text-xl mb-6 max-w-xl mx-auto">
            Join dozens of college programs already finding their perfect athletic matches through HighLytr.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/register?type=college">Register Your College</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default ForColleges;
