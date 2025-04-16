
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Mail } from 'lucide-react';
import LogoDebug from '@/components/common/LogoDebug';

const Careers = () => {
  return (
    <Layout>
      <div className="container py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Join Our Team</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Help us connect talented athletes with opportunities to pursue their athletic and academic goals
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                At HighLytr, we're dedicated to connecting international high school athletes with U.S. college coaches and sports programs. We believe in creating opportunities for talented athletes around the world to pursue their dreams of competing at the collegiate level while receiving a quality education.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Our Values</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600">
                <li>• Excellence in everything we do</li>
                <li>• Integrity in our relationships</li>
                <li>• Innovation in our solutions</li>
                <li>• Diversity and inclusion across our platform</li>
                <li>• Passion for sports and education</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <h2 className="text-2xl font-bold mb-6">Current Openings</h2>
        <Separator className="mb-8" />
        
        <div className="text-center py-10">
          <h3 className="text-xl mb-4">No Current Openings</h3>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            We don't have any specific positions open at the moment, but we're always looking for talented individuals to join our team.
          </p>
          
          <Card className="max-w-xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <Mail className="h-5 w-5" />
                General Application
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-6 text-gray-600">
                Interested in joining our team? Send us your resume and tell us why you'd be a great fit for HighLytr!
              </p>
              <a 
                href="mailto:mustarelli.edoardo@gmail.com?subject=General Application to join HighLytr" 
                className="inline-block"
              >
                <Button>
                  Contact Us
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
        
        {/* Temporary debugging component - remove in production */}
        <div className="mt-16 border-t pt-8">
          <h3 className="text-lg font-medium mb-4">Debug Information</h3>
          <LogoDebug />
        </div>
      </div>
    </Layout>
  );
};

export default Careers;
