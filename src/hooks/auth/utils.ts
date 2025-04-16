
import { supabase } from '@/integrations/supabase/client';

// Check if user has completed their profile
export const checkProfileStatus = async (userId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('profile_completed')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile status:', error);
      return false;
    }
    
    // Handle the case where profile_completed might be null
    return data?.profile_completed === true;
  } catch (error) {
    console.error('Error in profile status check:', error);
    return false;
  }
};
