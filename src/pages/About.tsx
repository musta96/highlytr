
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Globe, Target, Megaphone, Rocket } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <div className="hero-pattern bg-fixed">
        <div className="container py-16 px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="h2 font-bold text-highlyt-blue-dark mb-4">About HighLytr</h1>
              <div className="h-1 w-24 bg-gradient-to-r from-highlyt-blue to-highlyt-green mx-auto"></div>
            </div>
            
            <Card className="mb-10 shadow-lg border-t-4 border-t-highlyt-blue">
              <CardContent className="pt-6">
                <p className="text-lg font-medium text-highlyt-blue-dark mb-6 leading-relaxed">
                  HighLytr is the LinkedIn for international student-athletes — a platform that connects young talents around the world with U.S. college sports programs.
                </p>
                
                <p className="text-xl font-semibold italic mb-6 text-highlyt-blue">
                  We believe talent is everywhere, but opportunity isn't.
                </p>
                
                <p className="mb-6 leading-relaxed">
                  Every year, thousands of international athletes miss the chance to study and compete in the U.S. because they lack the connections, resources, or visibility to be recruited. The current system is outdated, fragmented, and often unaffordable — with high agency fees and limited access to universities.
                </p>
              </CardContent>
            </Card>
            
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-highlyt-blue-dark mb-6 flex items-center">
                <span className="mr-2 p-1 bg-highlyt-blue bg-opacity-10 rounded-full">
                  <Globe className="h-6 w-6 text-highlyt-blue" />
                </span>
                HighLytr Changes That
              </h2>
              
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg mb-6 shadow-sm border border-gray-200">
                <p className="mb-4 leading-relaxed">
                  We make the recruiting process simple, transparent, and direct.
                </p>
                
                <p className="mb-0 leading-relaxed">
                  Athletes can create professional profiles with videos, stats, academic info, and achievements — all in one place. Coaches and college staff can search, discover, and connect directly with the talent they're looking for. Agencies can manage their athletes and expand their reach more efficiently.
                </p>
              </div>
            </div>
            
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-highlyt-blue-dark mb-4 flex items-center">
                <span className="mr-2 p-1 bg-highlyt-green bg-opacity-10 rounded-full">
                  <Globe className="h-6 w-6 text-highlyt-green" />
                </span>
                Our Vision
              </h2>
              
              <Card className="shadow-sm bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-6">
                  <p className="mb-0 leading-relaxed">
                    We're starting with Italy and soccer — but our vision is global.
                    We aim to become the go-to platform for international recruiting across all sports and regions.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-highlyt-blue-dark mb-6 flex items-center">
                <span className="mr-2 p-1 bg-highlyt-blue bg-opacity-10 rounded-full">
                  <Target className="h-6 w-6 text-highlyt-blue" />
                </span>
                Our Mission
              </h2>
              
              <ul className="grid gap-4 md:grid-cols-3 mb-6">
                <li className="flex flex-col p-5 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    <Target className="h-5 w-5 text-highlyt-blue mr-2" />
                    <span className="font-medium">Democratize</span>
                  </div>
                  <p className="text-sm text-gray-600">Access to college sports opportunities</p>
                </li>
                
                <li className="flex flex-col p-5 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    <Megaphone className="h-5 w-5 text-highlyt-blue mr-2" />
                    <span className="font-medium">Eliminate barriers</span>
                  </div>
                  <p className="text-sm text-gray-600">Amplify talent across borders</p>
                </li>
                
                <li className="flex flex-col p-5 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    <Rocket className="h-5 w-5 text-highlyt-blue mr-2" />
                    <span className="font-medium">Help athletes</span>
                  </div>
                  <p className="text-sm text-gray-600">Get seen, get recruited, change lives</p>
                </li>
              </ul>
            </div>
            
            <div className="mb-12 bg-highlyt-blue-dark text-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">More Than a Tool — A Movement</h2>
              
              <p className="mb-6 leading-relaxed">
                This is more than a tool — it's a movement.
                If you're an athlete with a dream, a coach searching for international talent, or a partner looking to shape the future of recruiting — welcome to HighLytr.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto bg-white text-highlyt-blue-dark hover:bg-gray-100">
                    Create Your Account
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
