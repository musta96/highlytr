
import { supabase } from '@/integrations/supabase/client';

// Use this for direct lookup without side effects - with better error handling
export const getProfileData = async (userId: string) => {
  if (!userId) {
    console.log('[AuthProvider] Cannot get profile data: userId is empty');
    return null;
  }
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
      
    clearTimeout(timeoutId);
      
    if (error) {
      console.error('[AuthProvider] Error in getProfileData:', error);
      return null;
    }
    
    console.log('[AuthProvider] Successfully retrieved profile data:', data ? 'Found' : 'Not found');
    return data;
  } catch (error) {
    console.error('[AuthProvider] Exception in getProfileData:', error);
    return null;
  }
};
