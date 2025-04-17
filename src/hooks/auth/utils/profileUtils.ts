
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { AccountType } from '@/components/auth/types';

// Function to fetch and set account information
export const fetchAccountInfo = async (
  userId: string,
  setAccountType: (type: AccountType | null) => void,
  setProfileCompleted: (completed: boolean) => void
): Promise<boolean> => {
  console.log('[AuthProvider] Fetching account info for user:', userId);
  
  if (!userId) {
    console.error('[AuthProvider] Cannot fetch account info: userId is empty');
    return false;
  }
  
  try {
    // First try to get account type from profiles table
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('account_type, profile_completed')
      .eq('id', userId)
      .maybeSingle();
    
    if (error) {
      console.error('[AuthProvider] Error fetching profile:', error);
      return false;
    }
    
    console.log('[AuthProvider] Profile data from DB:', profile);
    
    // If we have a profile with account type, use it
    if (profile && profile.account_type) {
      setAccountType(profile.account_type as AccountType);
      setProfileCompleted(profile.profile_completed || false);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('[AuthProvider] Error in fetchAccountInfo:', error);
    return false;
  }
};

// Function to check user metadata as fallback
export const checkUserMetadata = (
  currentUser: User,
  setAccountType: (type: AccountType | null) => void
): boolean => {
  if (!currentUser?.user_metadata) {
    console.log('[AuthProvider] No user metadata available');
    return false;
  }
  
  const userType = currentUser.user_metadata?.accountType as AccountType | undefined;
  console.log('[AuthProvider] Account type from metadata:', userType, currentUser.user_metadata);
  
  if (userType && ['athlete', 'college', 'agency'].includes(userType)) {
    setAccountType(userType);
    return true;
  }
  
  return false;
};

// Check if user has completed their profile
export const checkProfileStatus = async (userId: string): Promise<boolean> => {
  if (!userId) {
    console.error('[AuthProvider] Cannot check profile status: userId is empty');
    return false;
  }
  
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('profile_completed')
      .eq('id', userId)
      .maybeSingle();

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
