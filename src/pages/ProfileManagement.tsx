
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Loader2, Save, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import Layout from '@/components/layout/Layout';
import PersonalInfoForm from '@/components/profile/PersonalInfoForm';
import SportsInfoForm from '@/components/profile/SportsInfoForm';
import { useAuth } from '@/hooks/auth';
import { supabase } from '@/integrations/supabase/client';
import { ProfileData } from '@/types/profile';
import { Progress } from '@/components/ui/progress'; 

const ProfileManagement = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  
  // Track completion status
  const [completionStatus, setCompletionStatus] = useState({
    personalInfo: 0,
    sportsInfo: 0,
    overallCompletion: 0
  });

  useEffect(() => {
    if (!user && !loading) {
      navigate('/login');
      return;
    }

    const fetchProfileData = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (error) throw error;
        
        setProfileData(data);
        calculateCompletion(data);
      } catch (error: any) {
        toast.error(`Error loading profile: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [user, loading, navigate]);

  const calculateCompletion = (data: ProfileData) => {
    // Check personal info fields
    const personalFields = ['first_name', 'last_name', 'date_of_birth', 'place_of_birth', 'citizenship'];
    const personalComplete = personalFields.filter(field => !!data[field as keyof ProfileData]).length;
    const personalPercentage = Math.round((personalComplete / personalFields.length) * 100);
    
    // Check sports info fields
    const sportsFields = ['primary_sport', 'primary_position'];
    const sportsComplete = sportsFields.filter(field => !!data[field as keyof ProfileData]).length;
    const sportsPercentage = Math.round((sportsComplete / sportsFields.length) * 100);
    
    // Calculate overall completion (weighing personal as 60%, sports as 40%)
    const overallCompletion = Math.round((personalPercentage * 0.6) + (sportsPercentage * 0.4));
    
    setCompletionStatus({
      personalInfo: personalPercentage,
      sportsInfo: sportsPercentage,
      overallCompletion
    });
  };

  useEffect(() => {
    if (profileData) {
      calculateCompletion(profileData);
    }
  }, [profileData]);

  const handleSaveProfile = async () => {
    if (!user || !profileData) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: profileData.first_name,
          last_name: profileData.last_name,
          date_of_birth: profileData.date_of_birth,
          place_of_birth: profileData.place_of_birth,
          citizenship: profileData.citizenship,
          primary_sport: profileData.primary_sport,
          primary_position: profileData.primary_position,
          secondary_sport: profileData.secondary_sport,
          secondary_position: profileData.secondary_position,
          // Mark profile as completed if overall completion is 100%
          profile_completed: completionStatus.overallCompletion === 100
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error(`Error updating profile: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading || isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading profile...</span>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Edit Profile</h1>
          <Button 
            onClick={handleSaveProfile} 
            disabled={isSaving}
            className="flex items-center gap-2"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>

        {/* Profile Completion Status */}
        <div className="mb-8 p-4 bg-white rounded-lg shadow-sm border">
          <div className="mb-2 flex justify-between items-center">
            <h2 className="font-semibold">Profile Completion</h2>
            <span className="text-sm font-medium">
              {completionStatus.overallCompletion}% Complete
            </span>
          </div>
          <Progress value={completionStatus.overallCompletion} className="h-2" />
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Personal Information</span>
                <span className="text-xs font-medium">{completionStatus.personalInfo}%</span>
              </div>
              <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{width: `${completionStatus.personalInfo}%`}}></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Sports Information</span>
                <span className="text-xs font-medium">{completionStatus.sportsInfo}%</span>
              </div>
              <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{width: `${completionStatus.sportsInfo}%`}}></div>
              </div>
            </div>
          </div>
          
          {completionStatus.overallCompletion < 100 && (
            <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-md flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-800">Your profile is incomplete</p>
                <p className="text-xs text-amber-700 mt-1">Complete your profile to increase visibility to coaches and recruiters</p>
              </div>
            </div>
          )}
          
          {completionStatus.overallCompletion === 100 && (
            <div className="mt-4 p-3 bg-green-50 border border-green-100 rounded-md flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-800">Your profile is complete!</p>
                <p className="text-xs text-green-700 mt-1">Your profile is now fully visible to coaches and recruiters</p>
              </div>
            </div>
          )}
        </div>

        {profileData && (
          <Tabs 
            defaultValue={activeTab} 
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid grid-cols-2 w-full max-w-md">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="sports">Sports Info</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4">
              <PersonalInfoForm 
                profileData={profileData}
                setProfileData={setProfileData}
              />
            </TabsContent>

            <TabsContent value="sports" className="space-y-4">
              <SportsInfoForm 
                profileData={profileData}
                setProfileData={setProfileData}
              />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </Layout>
  );
};

export default ProfileManagement;
