
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const Careers = () => {
  // Sample job openings
  const jobOpenings = [
    {
      id: 1,
      title: 'Frontend Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time'
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'New York, NY',
      type: 'Full-time'
    },
    {
      id: 3,
      title: 'Content Marketing Specialist',
      department: 'Marketing',
      location: 'Remote',
      type: 'Full-time'
    },
    {
      id: 4,
      title: 'College Relations Manager',
      department: 'Business Development',
      location: 'Chicago, IL',
      type: 'Full-time'
    }
  ];

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
        
        <h2 className="text-2xl font-bold mb-6">Open Positions</h2>
        <Separator className="mb-8" />
        
        <div className="grid grid-cols-1 gap-4">
          {jobOpenings.map((job) => (
            <div key={job.id} className="border rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="font-semibold text-lg">{job.title}</h3>
                <div className="text-gray-600">
                  {job.department} • {job.location} • {job.type}
                </div>
              </div>
              <Button>View Position</Button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Careers;
