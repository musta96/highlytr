
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import PersonalInfoSection from './sections/PersonalInfoSection';
import SportsInfoSection from './sections/SportsInfoSection';

const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  dateOfBirth: z.date({ required_error: "Date of birth is required." }),
  placeOfBirth: z.string().min(2, { message: "Place of birth must be at least 2 characters." }),
  citizenship: z.string().min(2, { message: "Citizenship must be at least 2 characters." }),
  primarySport: z.string().min(1, { message: "Please select your primary sport." }),
  primaryPosition: z.string().min(1, { message: "Please select your position." }),
  secondarySport: z.string().optional(),
  secondaryPosition: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ProfileSetupForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      placeOfBirth: '',
      citizenship: '',
      primarySport: '',
      primaryPosition: '',
      secondarySport: '',
      secondaryPosition: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!user) {
      toast.error('You must be logged in to complete your profile.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: data.firstName,
          last_name: data.lastName,
          date_of_birth: data.dateOfBirth.toISOString(),
          place_of_birth: data.placeOfBirth,
          citizenship: data.citizenship,
          primary_sport: data.primarySport,
          primary_position: data.primaryPosition,
          secondary_sport: data.secondarySport || null,
          secondary_position: data.secondaryPosition || null,
          profile_completed: true,
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      toast.success('Profile set up successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(`Error setting up profile: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <PersonalInfoSection form={form} />

        <Separator />
        
        <SportsInfoSection form={form} />

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting} className="min-w-32">
            {isSubmitting ? 'Saving...' : 'Complete Setup'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileSetupForm;
