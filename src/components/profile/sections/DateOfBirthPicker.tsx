
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface DateOfBirthPickerProps {
  form: UseFormReturn<any>;
}

const DateOfBirthPicker: React.FC<DateOfBirthPickerProps> = ({ form }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <FormField
      control={form.control}
      name="dateOfBirth"
      render={({ field }) => (
        <FormItem className="flex flex-col w-full">
          <FormLabel>Date of Birth</FormLabel>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full text-left font-normal justify-start",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Select date</span>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                captionLayout="dropdown-buttons"
                selected={field.value}
                onSelect={(date) => {
                  field.onChange(date);
                  setIsOpen(false);
                }}
                fromYear={1920}
                toYear={new Date().getFullYear() - 10} // Assuming minimum age of 10 years
                disabled={(date) => {
                  // Disable future dates and dates more than 100 years in the past
                  const today = new Date();
                  const hundredYearsAgo = new Date();
                  hundredYearsAgo.setFullYear(today.getFullYear() - 100);
                  
                  return date > today || date < hundredYearsAgo;
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DateOfBirthPicker;
