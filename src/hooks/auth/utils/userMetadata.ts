
import { User } from '@supabase/supabase-js';
import { AccountType } from '@/components/auth/types';
import { supabase } from '@/integrations/supabase/client';

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
