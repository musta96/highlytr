
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import PersonalInfoForm from '@/components/profile/PersonalInfoForm';
import SportsInfoForm from '@/components/profile/SportsInfoForm';
import ProfileHeader from '@/components/profile/management/ProfileHeader';
import CompletionStatus from '@/components/profile/management/CompletionStatus';
import { useProfileManagement } from '@/hooks/useProfileManagement';

const ProfileManagement = () => {
  const {
    profileData,
    setProfileData,
    isLoading,
    isSaving,
    activeTab,
    setActiveTab,
    completionStatus,
    handleSaveProfile,
    loading
  } = useProfileManagement();

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
        <ProfileHeader 
          isSaving={isSaving}
          handleSaveProfile={handleSaveProfile}
        />

        <CompletionStatus completionStatus={completionStatus} />

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
