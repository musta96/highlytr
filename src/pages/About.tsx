
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <Layout>
      <div className="container py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="h2 mb-6">About HighLytr</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg mb-6">
              HighLytr is the LinkedIn for international student-athletes — a platform that connects young talents around the world with U.S. college sports programs.
            </p>
            
            <p className="mb-6">
              We believe talent is everywhere, but opportunity isn't.
            </p>
            
            <p className="mb-6">
              Every year, thousands of international athletes miss the chance to study and compete in the U.S. because they lack the connections, resources, or visibility to be recruited. The current system is outdated, fragmented, and often unaffordable — with high agency fees and limited access to universities.
            </p>
            
            <h2 className="text-2xl font-bold mt-10 mb-4">HighLytr Changes That</h2>
            
            <p className="mb-6">
              We make the recruiting process simple, transparent, and direct.
            </p>
            
            <p className="mb-6">
              Athletes can create professional profiles with videos, stats, academic info, and achievements — all in one place. Coaches and college staff can search, discover, and connect directly with the talent they're looking for. Agencies can manage their athletes and expand their reach more efficiently.
            </p>
            
            <h2 className="text-2xl font-bold mt-10 mb-4">Our Vision</h2>
            
            <p className="mb-6">
              We're starting with Italy and soccer — but our vision is global.
              We aim to become the go-to platform for international recruiting across all sports and regions.
            </p>
            
            <h2 className="text-2xl font-bold mt-10 mb-4">Our Mission</h2>
            
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>🎯 Democratize access to college sports opportunities.</li>
              <li>📣 Eliminate barriers, amplify talent.</li>
              <li>🚀 Help the next generation of athletes get seen, get recruited, and change their lives.</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-10 mb-4">More Than a Tool — A Movement</h2>
            
            <p className="mb-6">
              This is more than a tool — it's a movement.
              If you're an athlete with a dream, a coach searching for international talent, or a partner looking to shape the future of recruiting — welcome to HighLytr.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Create Your Account
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
