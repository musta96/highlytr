
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

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

// Sport options and their positions
const sportPositions = {
  soccer: ['Goalkeeper', 'Defender', 'Midfielder', 'Forward', 'Striker', 'Winger', 'Other'],
  basketball: ['Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center', 'Other'],
  baseball: ['Pitcher', 'Catcher', 'First Base', 'Second Base', 'Third Base', 'Shortstop', 'Outfield', 'Other'],
  football: ['Quarterback', 'Running Back', 'Wide Receiver', 'Tight End', 'Offensive Line', 'Defensive Line', 'Linebacker', 'Cornerback', 'Safety', 'Kicker', 'Punter', 'Other'],
  volleyball: ['Outside Hitter', 'Opposite', 'Middle Blocker', 'Setter', 'Libero', 'Other'],
  tennis: ['Singles Player', 'Doubles Specialist', 'Other'],
  swimming: ['Freestyle', 'Backstroke', 'Breaststroke', 'Butterfly', 'Individual Medley', 'Other'],
  track: ['Sprinter', 'Middle Distance', 'Long Distance', 'Hurdler', 'Jumper', 'Thrower', 'Other'],
  other: ['Not Specified'],
};

const sportsList = [
  'Soccer',
  'Basketball',
  'Baseball',
  'Football',
  'Volleyball', 
  'Tennis',
  'Swimming',
  'Track',
  'Gymnastics',
  'Hockey',
  'Rugby',
  'Lacrosse',
  'Golf',
  'Wrestling',
  'Other'
];

const ProfileSetupForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [primarySport, setPrimarySport] = useState('');
  const [secondarySport, setSecondarySport] = useState('');

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

  const getSportKey = (sportName: string) => {
    return sportName.toLowerCase();
  };

  const getPositionsForSport = (sport: string) => {
    const sportKey = getSportKey(sport);
    return sportPositions[sportKey as keyof typeof sportPositions] || sportPositions.other;
  };

  const onSubmit = async (data: FormValues) => {
    if (!user) {
      toast.error('You must be logged in to complete your profile.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Save profile data to database
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
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of Birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={`w-full pl-3 text-left font-normal ${!field.value ? "text-muted-foreground" : ""}`}
                        >
                          {field.value ? (
                            format(field.value, "PP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="placeOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Place of Birth</FormLabel>
                  <FormControl>
                    <Input placeholder="City, Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="citizenship"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Citizenship</FormLabel>
                  <FormControl>
                    <Input placeholder="Your citizenship" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator />
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Sport Information</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="primarySport"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Sport</FormLabel>
                    <Select 
                      onValueChange={(value) => {
                        field.onChange(value);
                        setPrimarySport(value);
                        // Reset position when sport changes
                        form.setValue('primaryPosition', '');
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your main sport" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sportsList.map((sport) => (
                          <SelectItem key={sport} value={sport}>
                            {sport}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="primaryPosition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Position</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={!primarySport}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={primarySport ? "Select position" : "Select sport first"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {primarySport && getPositionsForSport(primarySport).map((position) => (
                          <SelectItem key={position} value={position}>
                            {position}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="secondarySport"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secondary Sport (Optional)</FormLabel>
                    <Select 
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSecondarySport(value);
                        // Reset position when sport changes
                        form.setValue('secondaryPosition', '');
                      }}
                      value={field.value || ''}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select another sport (optional)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        {sportsList.map((sport) => (
                          <SelectItem key={sport} value={sport}>
                            {sport}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="secondaryPosition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secondary Position (Optional)</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ''}
                      disabled={!secondarySport}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={secondarySport ? "Select position" : "Select sport first"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        {secondarySport && getPositionsForSport(secondarySport).map((position) => (
                          <SelectItem key={position} value={position}>
                            {position}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

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
