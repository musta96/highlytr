
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { ProfileData } from '@/types/profile';

interface PersonalInfoFormProps {
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData | null>>;
}

const PersonalInfoForm = ({ profileData, setProfileData }: PersonalInfoFormProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => {
      if (!prev) return prev;
      return { ...prev, [name]: value };
    });
  };

  const handleDateChange = (date: Date | undefined) => {
    if (!date) return;
    setProfileData(prev => {
      if (!prev) return prev;
      return { ...prev, date_of_birth: date.toISOString() };
    });
  };

  // Convert ISO string to Date object for the calendar
  const dateOfBirth = profileData.date_of_birth 
    ? new Date(profileData.date_of_birth) 
    : undefined;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="first_name">First Name</Label>
            <Input
              id="first_name"
              name="first_name"
              value={profileData.first_name || ''}
              onChange={handleInputChange}
              placeholder="Enter your first name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="last_name">Last Name</Label>
            <Input
              id="last_name"
              name="last_name"
              value={profileData.last_name || ''}
              onChange={handleInputChange}
              placeholder="Enter your last name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date_of_birth">Date of Birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  {dateOfBirth ? (
                    format(dateOfBirth, "PP")
                  ) : (
                    <span className="text-muted-foreground">Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateOfBirth}
                  onSelect={handleDateChange}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="place_of_birth">Place of Birth</Label>
            <Input
              id="place_of_birth"
              name="place_of_birth"
              value={profileData.place_of_birth || ''}
              onChange={handleInputChange}
              placeholder="City, Country"
            />
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="citizenship">Citizenship</Label>
            <Input
              id="citizenship"
              name="citizenship"
              value={profileData.citizenship || ''}
              onChange={handleInputChange}
              placeholder="Your citizenship"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoForm;
