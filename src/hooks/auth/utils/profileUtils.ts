
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { AccountType } from '@/components/auth/types';
import { toast } from 'sonner';

// Function to fetch and set account information with better error handling
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
    // First try to get account type from profiles table with timeout protection
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('account_type, profile_completed')
      .eq('id', userId)
      .maybeSingle();
    
    clearTimeout(timeoutId);
    
    if (error) {
      console.error('[AuthProvider] Error fetching profile:', error);
      // Let the UI know there was an issue
      toast.error('Error fetching profile data', {
        description: 'Please try refreshing the page',
        duration: 4000,
        id: 'profile-fetch-error',
      });
      return false;
    }
    
    console.log('[AuthProvider] Profile data from DB:', profile);
    
    // Always update profile completion status if we have data
    if (profile !== null) {
      setProfileCompleted(profile?.profile_completed || false);
    } else {
      // If no profile found, ensure profile is marked as not completed
      setProfileCompleted(false);
      
      // Create a profile automatically if it doesn't exist
      try {
        const { error: createError } = await supabase
          .from('profiles')
          .insert({ id: userId, profile_completed: false });
          
        if (createError) {
          console.error('[AuthProvider] Error creating profile:', createError);
        } else {
          console.log('[AuthProvider] Created new profile for user');
        }
      } catch (err) {
        console.error('[AuthProvider] Failed to create profile:', err);
      }
    }
    
    // If we have a profile with account type, use it
    if (profile && profile.account_type) {
      const accountType = profile.account_type.toLowerCase() as AccountType;
      if (['athlete', 'college', 'agency'].includes(accountType)) {
        setAccountType(accountType);
        console.log('[AuthProvider] Account type set from DB:', accountType);
        return true;
      } else {
        console.warn('[AuthProvider] Invalid account type in profile:', profile.account_type);
      }
    } else {
      console.log('[AuthProvider] No account type found in profile or profile not found');
    }
    
    return false;
  } catch (error) {
    console.error('[AuthProvider] Error in fetchAccountInfo:', error);
    // Don't update states on error to avoid potential issues
    return false;
  }
};

// Function to check user metadata as fallback with improved logging
export const checkUserMetadata = (
  currentUser: User,
  setAccountType: (type: AccountType | null) => void
): boolean => {
  if (!currentUser) {
    console.log('[AuthProvider] No user provided to checkUserMetadata');
    return false;
  }
  
  if (!currentUser.user_metadata) {
    console.log('[AuthProvider] No user metadata available');
    return false;
  }
  
  // Try different possible keys for account type in metadata with better logging
  const userType = (
    currentUser.user_metadata?.accountType || 
    currentUser.user_metadata?.account_type
  ) as AccountType | undefined;
  
  console.log('[AuthProvider] Account type from metadata:', userType, 'Full metadata:', currentUser.user_metadata);
  
  if (userType && ['athlete', 'college', 'agency'].includes(userType.toLowerCase())) {
    const normalizedType = userType.toLowerCase() as AccountType;
    setAccountType(normalizedType);
    console.log('[AuthProvider] Account type set from metadata:', normalizedType);
    
    // Try to save this to the database for future consistency
    try {
      supabase.from('profiles').upsert({
        id: currentUser.id,
        account_type: normalizedType
      }).then(({error}) => {
        if (error) {
          console.error('[AuthProvider] Error saving account type to DB:', error);
        }
      });
    } catch (err) {
      console.error('[AuthProvider] Failed to save account type to DB:', err);
    }
    
    return true;
  }
  
  return false;
};

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
