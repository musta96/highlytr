
import { User, Session } from '@supabase/supabase-js';
import { AccountType } from '@/components/auth/types';

/**
 * Credentials required for user sign-in
 */
export type SignInCredentials = {
  email: string;
  password: string;
};

/**
 * Credentials and information required for user registration
 */
export type SignUpCredentials = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  accountType: AccountType;
};

/**
 * Auth error type for consistent error handling
 */
export type AuthError = {
  message: string;
};

/**
 * Response type for sign-in operations
 */
export type SignInResponse = {
  error: AuthError | null;
};

/**
 * Response type for sign-up operations
 */
export type SignUpResponse = {
  error: AuthError | null;
};

/**
 * Complete AuthContext type definition
 * @deprecated Import from AuthContext.tsx instead
 */
export type AuthContextType = {
  user: User | null;
  session: Session | null;
  signIn: (credentials: SignInCredentials) => Promise<SignInResponse>;
  signUp: (credentials: SignUpCredentials) => Promise<SignUpResponse>;
  signOut: () => Promise<void>;
  loading: boolean;
  profileCompleted: boolean;
  accountType: AccountType | null;
};
