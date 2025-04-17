
import React, { useState, useEffect } from 'react';
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
import { ChevronRight, Save } from 'lucide-react';
import PersonalInfoSection from './sections/PersonalInfoSection';
import SportsInfoSection from './sections/SportsInfoSection';
import ProfileSetupProgress from './ProfileSetupProgress';
import ProfilePreview from './ProfilePreview';
import ProfileSetupTips from './ProfileSetupTips';
import ProfileSetupRewards from './ProfileSetupRewards';

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
  const [formProgress, setFormProgress] = useState(10); // Start with 10% for opening the form
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);

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
    mode: 'onChange', // Validate on change for real-time progress updates
  });
  
  // Calculate form progress based on valid fields
  useEffect(() => {
    const formValues = form.getValues();
    const requiredFields = ['firstName', 'lastName', 'dateOfBirth', 'placeOfBirth', 'citizenship', 'primarySport', 'primaryPosition'];
    
    // Calculate how many required fields have valid values
    let completedFields = 0;
    requiredFields.forEach(field => {
      if (formValues[field as keyof FormValues]) completedFields++;
    });
    
    // Base progress (10%) + valid fields percentage of remaining 90%
    const newProgress = 10 + Math.floor((completedFields / requiredFields.length) * 90);
    setFormProgress(newProgress);
    
    // Show preview when at least 3 fields are completed
    if (completedFields >= 3 && !showPreview) {
      setShowPreview(true);
    }
  }, [form.watch(), form]);

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
      
      toast.success('Profile set up successfully!', {
        description: 'Your profile is now visible to recruiters and colleges.'
      });
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(`Error setting up profile: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Navigate between steps
  const goToNextStep = () => {
    setCurrentStep(2);
  };
  
  const goToPrevStep = () => {
    setCurrentStep(1);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ProfileSetupProgress currentStep={currentStep} totalSteps={2} />
        
        <ProfileSetupTips />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {currentStep === 1 ? (
              <div className="animate-fade-in">
                <PersonalInfoSection form={form} />
                
                <div className="flex justify-end mt-6">
                  <Button 
                    type="button" 
                    onClick={goToNextStep}
                    className="gap-2"
                  >
                    Continue <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="animate-fade-in">
                <SportsInfoSection form={form} />
                
                <div className="flex justify-between mt-6">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={goToPrevStep}
                  >
                    Back to Personal Info
                  </Button>
                  
                  <Button type="submit" disabled={isSubmitting} className="min-w-32 gap-2">
                    {isSubmitting ? 'Saving...' : (
                      <>
                        <Save className="h-4 w-4" />
                        Complete Setup
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            {showPreview && (
              <div className="animate-fade-in">
                <h3 className="text-sm font-medium mb-3 text-muted-foreground">Profile Preview</h3>
                <ProfilePreview 
                  firstName={form.watch('firstName')}
                  lastName={form.watch('lastName')}
                  dateOfBirth={form.watch('dateOfBirth')}
                  placeOfBirth={form.watch('placeOfBirth')}
                  primarySport={form.watch('primarySport')}
                  primaryPosition={form.watch('primaryPosition')}
                />
              </div>
            )}
            
            <ProfileSetupRewards formProgress={formProgress} />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ProfileSetupForm;
