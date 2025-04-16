
import React from 'react';
import Layout from '@/components/layout/Layout';
import ProfileSetupForm from '@/components/profile/ProfileSetupForm';

const ProfileSetup = () => {
  return (
    <Layout>
      <div className="container py-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Complete Your Profile</h1>
        <p className="text-gray-600 mb-8">
          Welcome to HighLytr! Please provide some information about yourself to complete your profile.
        </p>
        <ProfileSetupForm />
      </div>
    </Layout>
  );
};

export default ProfileSetup;
