
import { createContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { AccountType } from '@/components/auth/types';
import type { 
  SignInCredentials,
  SignUpCredentials,
  SignInResponse, 
  SignUpResponse 
} from './types';

/**
 * Authentication Context Type
 * Defines the shape of the authentication context that will be available throughout the app
 */
export interface AuthContextType {
  /** Current authenticated user or null if not authenticated */
  user: User | null;
  
  /** Current session object containing auth tokens or null if not authenticated */
  session: Session | null;
  
  /** Function to sign in a user with email and password */
  signIn: (credentials: SignInCredentials) => Promise<SignInResponse>;
  
  /** Function to register a new user account */
  signUp: (credentials: SignUpCredentials) => Promise<SignUpResponse>;
  
  /** Function to sign out the current user */
  signOut: () => Promise<void>;
  
  /** Whether auth state is currently loading */
  loading: boolean;
  
  /** Whether the user has completed their profile setup */
  profileCompleted: boolean;
  
  /** The type of account the user has */
  accountType: AccountType | null;
}

/**
 * Create the auth context with default values
 * This context will be used to provide auth state and methods throughout the app
 */
export const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  signOut: async () => {},
  loading: true,
  profileCompleted: false,
  accountType: null,
});
