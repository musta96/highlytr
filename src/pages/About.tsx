
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
              HighLytr is transforming how international high school athletes connect with U.S. college programs. We've created a platform that removes expensive middlemen and empowers athletes to showcase their talents directly to college coaches.
            </p>
            
            <h2 className="text-2xl font-bold mt-10 mb-4">Our Mission</h2>
            <p>
              We believe that talent should be the only factor determining athletic opportunities, not financial resources or geographic location. HighLytr's mission is to create an accessible platform that democratizes the recruiting process, giving every talented athlete a chance to be discovered by U.S. college coaches.
            </p>
            
            <h2 className="text-2xl font-bold mt-10 mb-4">The Problem We're Solving</h2>
            <p>
              For too long, international athletes have faced significant barriers when pursuing U.S. college athletic opportunities:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Expensive recruiting agencies charging thousands of dollars</li>
              <li>Limited visibility to college coaches</li>
              <li>Complex eligibility requirements and application processes</li>
              <li>Lack of transparency in the recruiting process</li>
              <li>Geographic barriers to getting noticed</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-10 mb-4">Our Solution</h2>
            <p>
              HighLytr provides a direct connection between international athletes and U.S. college programs with:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Comprehensive athlete profiles with videos, stats, and academic information</li>
              <li>Direct messaging between athletes and college coaches</li>
              <li>Transparent college program information</li>
              <li>Educational resources on eligibility and the application process</li>
              <li>Affordable access for all athletes</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-10 mb-4">Our Team</h2>
            <p>
              HighLytr was founded by a team of former collegiate athletes, coaches, and international education experts who understand the challenges faced by international athletes seeking opportunities in the U.S.
            </p>
            
            <h2 className="text-2xl font-bold mt-10 mb-4">Get Started Today</h2>
            <p>
              Whether you're an athlete looking to showcase your talents, a college coach searching for international talent, or an agency that wants to help your athletes get discovered, HighLytr provides the platform you need.
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
