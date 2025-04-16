
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useAuth } from '@/hooks/auth';
import { AccountType } from './types';
import { registerFormSchema, RegisterFormData } from './forms/RegisterFormSchema';
import RegisterFormFields from './forms/RegisterFormFields';

const RegisterForm = () => {
  const [accountType, setAccountType] = useState<AccountType>('athlete');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signUp } = useAuth();
  
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      accountType: 'athlete',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await signUp({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        accountType: data.accountType
      });

      if (error) {
        toast.error(error.message);
        setIsSubmitting(false);
        return;
      }

      toast.success('Registration successful! Please check your email to verify your account.', {
        id: 'registration',
        duration: 8000,
      });
    } catch (error: any) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Create your account</h1>
        <p className="text-gray-600">
          Join HighLytr to connect with athletes, colleges, and more.
        </p>
      </div>

      <FormProvider {...form}>
        <Form>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <RegisterFormFields 
              accountType={accountType}
              setAccountType={setAccountType}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : 'Create Account'}
            </Button>

            <div className="text-center text-sm">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-highlyt-blue hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </FormProvider>
    </div>
  );
};

export default RegisterForm;
