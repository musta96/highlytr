
import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import ProfileSetupForm from '@/components/profile/ProfileSetupForm';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const ProfileSetup = () => {
  const { user, loading, profileCompleted, accountType } = useAuth();
  const navigate = useNavigate();

  // Log the current state for detailed debugging
  console.log('[ProfileSetup]', {
    hasUser: !!user,
    userId: user?.id,
    loading,
    profileCompleted,
    accountType,
    userMetadata: user?.user_metadata
  });

  // Handle case where profile is already completed
  useEffect(() => {
    if (!loading && user && profileCompleted && accountType) {
      console.log('[ProfileSetup] Profile already completed, redirecting to dashboard');
      navigate('/dashboard');
    }
  }, [loading, user, profileCompleted, accountType, navigate]);

  // Show loading state while checking auth
  if (loading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p>Loading your account information...</p>
        </div>
      </Layout>
    );
  }

  // Show login redirect if no user
  if (!user) {
    console.log('[ProfileSetup] No user, redirecting to login');
    // Use setTimeout to prevent potential navigation loops
    setTimeout(() => {
      navigate('/login');
    }, 100);
    
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p>Please log in to set up your profile...</p>
        </div>
      </Layout>
    );
  }

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
