
import { User, Session } from '@supabase/supabase-js';

export type SignInCredentials = {
  email: string;
  password: string;
};

export type SignUpCredentials = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  accountType: 'athlete' | 'college' | 'agency';
};

export type AuthError = {
  message: string;
};

export type SignInResponse = {
  error: AuthError | null;
};

export type SignUpResponse = {
  error: AuthError | null;
};

export type AuthContextType = {
  user: User | null;
  session: Session | null;
  signIn: (credentials: SignInCredentials) => Promise<SignInResponse>;
  signUp: (credentials: SignUpCredentials) => Promise<SignUpResponse>;
  signOut: () => Promise<void>;
  loading: boolean;
  profileCompleted: boolean;
  accountType: 'athlete' | 'college' | 'agency' | null;
};
