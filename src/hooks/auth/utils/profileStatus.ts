
import { supabase } from '@/integrations/supabase/client';

// Check if user has completed their profile with better error handling
export const checkProfileStatus = async (userId: string): Promise<boolean> => {
  if (!userId) {
    console.error('[AuthProvider] Cannot check profile status: userId is empty');
    return false;
  }
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    
    const { data, error } = await supabase
      .from('profiles')
      .select('profile_completed')
      .eq('id', userId)
      .maybeSingle();
      
    clearTimeout(timeoutId);

    if (error) {
      console.error('[AuthProvider] Error fetching profile status:', error);
      return false;
    }
    
    // Handle the case where profile_completed might be null
    const completed = data?.profile_completed === true;
    console.log('[AuthProvider] Profile completed status:', completed);
    return completed;
  } catch (error) {
    console.error('[AuthProvider] Error in profile status check:', error);
    return false;
  }
};
