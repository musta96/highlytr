
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Loader2, Save } from 'lucide-react';
import { toast } from 'sonner';
import Layout from '@/components/layout/Layout';
import PersonalInfoForm from '@/components/profile/PersonalInfoForm';
import SportsInfoForm from '@/components/profile/SportsInfoForm';
import { useAuth } from '@/hooks/auth';
import { supabase } from '@/integrations/supabase/client';
import { ProfileData } from '@/types/profile';

const ProfileManagement = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

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
      } catch (error: any) {
        toast.error(`Error loading profile: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [user, loading, navigate]);

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
