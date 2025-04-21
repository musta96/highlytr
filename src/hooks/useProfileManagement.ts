
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/auth';
import { supabase } from '@/integrations/supabase/client';
import { ProfileData } from '@/types/profile';
import { toast } from 'sonner';

export const useProfileManagement = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
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
    const personalFields = ['first_name', 'last_name', 'date_of_birth', 'place_of_birth', 'citizenship'];
    const personalComplete = personalFields.filter(field => !!data[field as keyof ProfileData]).length;
    const personalPercentage = Math.round((personalComplete / personalFields.length) * 100);
    
    const sportsFields = ['primary_sport', 'primary_position'];
    const sportsComplete = sportsFields.filter(field => !!data[field as keyof ProfileData]).length;
    const sportsPercentage = Math.round((sportsComplete / sportsFields.length) * 100);
    
    const overallCompletion = Math.round((personalPercentage * 0.6) + (sportsPercentage * 0.4));
    
    setCompletionStatus({
      personalInfo: personalPercentage,
      sportsInfo: sportsPercentage,
      overallCompletion
    });
  };

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

  return {
    profileData,
    setProfileData,
    isLoading,
    isSaving,
    activeTab,
    setActiveTab,
    completionStatus,
    handleSaveProfile,
    loading
  };
};
