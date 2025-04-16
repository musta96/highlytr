
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

type FormData = {
  password: string;
  confirmPassword: string;
};

const ResetPassword = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>();
  const password = watch("password", "");
  
  useEffect(() => {
    // Check if we have the access token in the URL (from email link)
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    if (!params.get('access_token')) {
      toast({
        title: "Invalid reset link",
        description: "This password reset link is invalid or has expired.",
        variant: "destructive",
      });
      navigate('/forgot-password');
    }
  }, [navigate, toast]);
  
  const onSubmit = async (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords don't match",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.password
      });
      
      if (error) throw error;
      
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully.",
      });
      
      // Redirect to login page
      setTimeout(() => navigate('/login'), 1500);
    } catch (error: any) {
      console.error("Error resetting password:", error);
      toast({
        title: "Error",
        description: error?.message || "Failed to reset password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Layout>
      <div className="py-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="mb-8 text-center">
            <Link to="/" className="inline-flex items-center gap-2 mb-8">
              <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-highlyt-blue to-highlyt-green">
                <span className="sr-only">HighLytr</span>
              </div>
              <span className="font-bold text-2xl">HighLytr</span>
            </Link>
            <h1 className="text-2xl font-bold">Create new password</h1>
            <p className="text-muted-foreground mt-2">
              Enter a new password for your account
            </p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium">
                New Password
              </label>
              <Input
                id="password"
                type="password"
                disabled={isLoading}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                disabled={isLoading}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: value => value === password || "Passwords do not match"
                })}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>
            
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Updating..." : "Reset Password"}
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ResetPassword;
