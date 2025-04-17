
import { supabase } from '@/integrations/supabase/client';
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
      return false;
    }
    
    console.log('[AuthProvider] Profile data from DB:', profile);
    
    // Always update profile completion status if we have data
    if (profile !== null) {
      setProfileCompleted(profile?.profile_completed || false);
      
      // If we have a profile with account type, use it
      if (profile.account_type) {
        const accountType = profile.account_type.toLowerCase() as AccountType;
        if (['athlete', 'college', 'agency'].includes(accountType)) {
          setAccountType(accountType);
          console.log('[AuthProvider] Account type set from DB:', accountType);
          return true;
        } else {
          console.warn('[AuthProvider] Invalid account type in profile:', profile.account_type);
          // Set a default for invalid types to prevent blank screens
          setAccountType('athlete');
        }
      }
    } else {
      // If no profile found, ensure profile is marked as not completed
      setProfileCompleted(false);
      
      // Create a profile automatically if it doesn't exist
      try {
        // Create a profile with a default account type to satisfy schema requirement
        const defaultAccountType: AccountType = 'athlete';
        
        const { error: createError } = await supabase
          .from('profiles')
          .insert({ 
            id: userId, 
            profile_completed: false,
            account_type: defaultAccountType
          });
          
        if (createError) {
          console.error('[AuthProvider] Error creating profile:', createError);
        } else {
          console.log('[AuthProvider] Created new profile for user with default account type:', defaultAccountType);
          // Since we've just created a profile with a default account type, let's use it
          setAccountType(defaultAccountType);
          return true;
        }
      } catch (err) {
        console.error('[AuthProvider] Failed to create profile:', err);
        // Set a fallback account type to prevent UI from breaking
        setAccountType('athlete');
      }
    }
    
    return false;
  } catch (error) {
    console.error('[AuthProvider] Error in fetchAccountInfo:', error);
    // Set fallback values on error to prevent UI from breaking
    setAccountType('athlete');
    setProfileCompleted(false);
    return false;
  }
};
