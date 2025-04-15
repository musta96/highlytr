
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Agencies = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Sports Agencies</h1>
          <p className="text-lg text-gray-700 mb-8">
            Connect with top sports agencies looking to represent talented athletes. Build relationships that can take your career to the next level.
          </p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {/* Sample agencies - in a real app, these would come from an API */}
            {[1, 2, 3, 4, 5, 6].map((id) => (
              <div key={id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-40 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Agency Logo</span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2">Elite Sports Agency #{id}</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Premier sports representation with a focus on career development and maximizing athlete potential.
                  </p>
                  <Button asChild>
                    <Link to={`/agencies/${id}`}>View Profile</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-highlyt-blue/10 rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold mb-3">Are you an agency?</h2>
            <p className="mb-4">Create a profile to connect with talented athletes and showcase your services</p>
            <Button asChild>
              <Link to="/register">Register Your Agency</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Agencies;
