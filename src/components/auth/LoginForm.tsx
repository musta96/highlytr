import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Loader2, AlertCircle } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginTimeout, setLoginTimeout] = useState<NodeJS.Timeout | null>(null);
  const [loginAttempted, setLoginAttempted] = useState(false);
  const { signIn, user, accountType, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirect path from location state or default to dashboard
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    watch,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  // For better debugging
  const watchedValues = watch();
  
  useEffect(() => {
    console.log("[LoginForm] Form state:", { 
      errors, 
      values: {
        email: watchedValues.email?.length > 0 ? "provided" : "empty",
        password: watchedValues.password?.length > 0 ? "provided" : "empty"
      },
      isLoading,
      loginAttempted,
      authLoading,
      user: !!user,
      accountType
    });
  }, [watchedValues, errors, isLoading, loginAttempted, authLoading, user, accountType]);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (loginTimeout) {
        clearTimeout(loginTimeout);
      }
    };
  }, [loginTimeout]);

  // Redirect if user is already logged in
  useEffect(() => {
    if (!authLoading && user) {
      console.log("[LoginForm] User already logged in, redirecting", { accountType });
      
      // If they have an account type, go to the dashboard
      if (accountType) {
        navigate("/dashboard", { replace: true });
      } else {
        // If no account type yet, they need to complete profile setup
        navigate("/profile-setup", { replace: true });
      }
    }
  }, [user, accountType, navigate, authLoading]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (isLoading) return; // Prevent multiple submissions
    
    setIsLoading(true);
    setLoginAttempted(true);
    
    // Set a timeout to handle stuck login attempts
    const timeout = setTimeout(() => {
      if (isLoading) {
        console.error("[LoginForm] Login request timed out");
        setIsLoading(false);
        toast.error("Login request timed out", {
          description: "Please try again. If the problem persists, refresh the page.",
        });
        reset({ email: data.email, password: "" });
      }
    }, 15000); // 15 seconds timeout
    
    setLoginTimeout(timeout);
    
    try {
      console.log("[LoginForm] Attempting login with:", data.email);
      toast.info("Signing in...");
      
      const { error } = await signIn({
        email: data.email,
        password: data.password,
      });

      // Clear the timeout since we got a response
      if (loginTimeout) {
        clearTimeout(loginTimeout);
        setLoginTimeout(null);
      }

      if (error) {
        console.error("[LoginForm] Login error:", error.message);
        
        // Set form errors based on the error message
        if (error.message.includes("Invalid login credentials")) {
          setError("email", { message: "Invalid email or password" });
          setError("password", { message: "Invalid email or password" });
          toast.error("Invalid login credentials", {
            description: "Please check your email and password."
          });
        } else {
          toast.error(`Login failed`, {
            description: error.message || "Please check your credentials and try again.",
          });
        }
        
        reset({ email: data.email, password: "" });
        setIsLoading(false);
        return;
      }

      toast.success(`Login successful!`, {
        description: "Redirecting to dashboard...",
      });
      
      // Note: We'll let the useEffect handle the redirect
      // when the user state is updated
      
      // If we've made it here, login was initiated - keep loading state
      // The redirect will happen via the useEffect
    } catch (error: any) {
      console.error("[LoginForm] Unexpected login error:", error);
      toast.error(`Sign in failed`, {
        description: "An unexpected error occurred. Please try again.",
      });
      setIsLoading(false);
    }
  };

  // Keep track of form errors in console for debugging
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log("[LoginForm] Form errors:", errors);
    }
  }, [errors]);

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isLoading}
            {...register("email")}
            aria-describedby="email-error"
          />
          {errors.email && (
            <p id="email-error" className="text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.email?.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block"
          >
            Password
          </label>
          <Input
            id="password"
            type="password"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isLoading}
            {...register("password")}
            aria-describedby="password-error"
          />
          {errors.password && (
            <p id="password-error" className="text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.password?.message}
            </p>
          )}
        </div>
        <Button disabled={isLoading} className="w-full" type="submit">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging in...
            </>
          ) : "Sign In"}
        </Button>
        <div className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Sign up
          </Link>
        </div>
        <div className="text-sm text-muted-foreground">
          <Link to="/forgot-password" className="text-primary hover:underline">
            Forgot password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
