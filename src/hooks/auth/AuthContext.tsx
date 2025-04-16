
import { createContext } from 'react';
import { AuthContextType } from './types';

// Create the auth context with default values
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
