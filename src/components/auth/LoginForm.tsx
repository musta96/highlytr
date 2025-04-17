
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from '@/hooks/auth';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, user, accountType, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirect path from location state or default to dashboard
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // Redirect if user is already logged in
  useEffect(() => {
    if (!loading && user) {
      console.log("[LoginForm] User already logged in, redirecting", { accountType });
      
      // If they have an account type, go to the dashboard
      if (accountType) {
        navigate("/dashboard");
      } else {
        // If no account type yet, they need to complete profile setup
        navigate("/profile-setup");
      }
    }
  }, [user, accountType, navigate, loading]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      console.log("[LoginForm] Attempting login with:", data.email);
      const { error } = await signIn({
        email: data.email,
        password: data.password,
      });

      if (error) {
        console.error("[LoginForm] Login error:", error.message);
        
        // Set form errors based on the error message
        if (error.message.includes("Invalid login credentials")) {
          setError("email", { message: "Invalid email or password" });
          setError("password", { message: "Invalid email or password" });
        } else {
          toast.error(`Error: ${error.message}`, {
            description: "Please check your credentials and try again.",
          });
        }
        
        setIsLoading(false);
        return;
      }

      toast.success(`Login successful!`, {
        description: "Redirecting to dashboard...",
      });
      
      // Note: We'll let the useEffect handle the redirect
      // when the user state is updated
    } catch (error: any) {
      console.error("[LoginForm] Unexpected login error:", error);
      toast.error(`Sign in failed`, {
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email?.message}</p>
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
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password?.message}</p>
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
