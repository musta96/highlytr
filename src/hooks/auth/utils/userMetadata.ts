
import { User } from '@supabase/supabase-js';
import { AccountType } from '@/components/auth/types';

// Check user metadata for account type information
export const checkUserMetadata = (
  user: User | null,
  setAccountType: (type: AccountType | null) => void
): boolean => {
  if (!user) {
    console.log('[AuthProvider] Cannot check user metadata: user is null');
    return false;
  }
  
  try {
    // Get account type from user metadata if available
    const metadata = user.user_metadata || {};
    const accountType = metadata.accountType?.toLowerCase() as AccountType | undefined;
    
    if (accountType && ['athlete', 'college', 'agency'].includes(accountType)) {
      console.log('[AuthProvider] Found account type in user metadata:', accountType);
      setAccountType(accountType);
      return true;
    } else {
      console.log('[AuthProvider] No valid account type in user metadata:', metadata);
      return false;
    }
  } catch (error) {
    console.error('[AuthProvider] Error checking user metadata:', error);
    return false;
  }
};
