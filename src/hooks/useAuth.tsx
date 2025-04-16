
import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { toast } from 'sonner';

type SignInCredentials = {
  email: string;
  password: string;
};

type SignUpCredentials = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  accountType: 'athlete' | 'college' | 'agency';
};

type AuthError = {
  message: string;
};

type SignInResponse = {
  error: AuthError | null;
};

type SignUpResponse = {
  error: AuthError | null;
};

type AuthContextType = {
  user: User | null;
  session: Session | null;
  signIn: (credentials: SignInCredentials) => Promise<SignInResponse>;
  signUp: (credentials: SignUpCredentials) => Promise<SignUpResponse>;
  signOut: () => Promise<void>;
  loading: boolean;
  profileCompleted: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  signOut: async () => {},
  loading: true,
  profileCompleted: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileCompleted, setProfileCompleted] = useState(false);

  // Check if user has completed their profile
  const checkProfileStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('profile_completed')
        .eq('id', userId)
        .single();

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

  useEffect(() => {
    // Set up listener for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('Auth state changed:', event, currentSession);
        setSession(currentSession);
        const currentUser = currentSession?.user ?? null;
        setUser(currentUser);
        
        // Check profile completion status when user authenticates
        if (currentUser) {
          const isCompleted = await checkProfileStatus(currentUser.id);
          setProfileCompleted(isCompleted);
        } else {
          setProfileCompleted(false);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      console.log('Retrieved session:', currentSession);
      setSession(currentSession);
      const currentUser = currentSession?.user ?? null;
      setUser(currentUser);
      
      // Check profile completion status
      if (currentUser) {
        const isCompleted = await checkProfileStatus(currentUser.id);
        setProfileCompleted(isCompleted);
      }
      
      setLoading(false);
    });

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async ({ email, password }: SignInCredentials): Promise<SignInResponse> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      // Check profile completion status after sign in
      if (data.user) {
        const isCompleted = await checkProfileStatus(data.user.id);
        setProfileCompleted(isCompleted);
      }
      
      return { error: null };
    } catch (error: any) {
      console.error('Sign in error:', error);
      return { error: { message: error.message } };
    }
  };

  const signUp = async ({ email, password, firstName, lastName, accountType }: SignUpCredentials): Promise<SignUpResponse> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            firstName,
            lastName,
            accountType
          }
        }
      });
      
      if (error) throw error;

      // Show helpful information about email verification
      toast.info(
        "We've sent a verification email. Please check your inbox and click the link to verify your account.", 
        { duration: 8000 }
      );
      
      return { error: null };
    } catch (error: any) {
      return { error: { message: error.message } };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfileCompleted(false);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      signIn, 
      signUp, 
      signOut, 
      loading,
      profileCompleted
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
