
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

type FormData = {
  email: string;
};

const ForgotPassword = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  
  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: window.location.origin + '/reset-password',
      });
      
      if (error) throw error;
      
      setIsSuccess(true);
      toast({
        title: "Email sent",
        description: "Check your email for the password reset link",
      });
    } catch (error: any) {
      console.error("Error sending reset email:", error);
      toast({
        title: "Error",
        description: error?.message || "Failed to send password reset email",
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
            <h1 className="text-2xl font-bold">Reset your password</h1>
            <p className="text-muted-foreground mt-2">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>
          
          {isSuccess ? (
            <div className="text-center">
              <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md">
                Check your email for a password reset link. If you don't see it, check your spam folder.
              </div>
              <Link to="/login">
                <Button variant="outline">Back to login</Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  disabled={isLoading}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              
              <div className="flex flex-col gap-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? "Sending..." : "Send reset link"}
                </Button>
                <div className="text-center">
                  <Link
                    to="/login"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Back to login
                  </Link>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
