
import React, { useState } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { 
  Select as DateSelect, 
  SelectContent as DateSelectContent, 
  SelectItem as DateSelectItem, 
  SelectTrigger as DateSelectTrigger, 
  SelectValue as DateSelectValue 
} from '@/components/ui/select';
import PlaceOfBirthInput from '../PlaceOfBirthInput';
import { countries } from '../place-of-birth/data';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';

interface PersonalInfoSectionProps {
  form: UseFormReturn<any>;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({ form }) => {
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date());
  const [openCitizenship, setOpenCitizenship] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const handleCalendarYearChange = (year: string) => {
    const newDate = new Date(calendarMonth);
    newDate.setFullYear(parseInt(year));
    setCalendarMonth(newDate);
  };

  const handleCalendarMonthChange = (month: string) => {
    const newDate = new Date(calendarMonth);
    newDate.setMonth(months.indexOf(month));
    setCalendarMonth(newDate);
  };

  return (
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
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="p-3 border-b">
                    <div className="flex items-center justify-between">
                      <DateSelect onValueChange={handleCalendarMonthChange} value={months[calendarMonth.getMonth()]}>
                        <DateSelectTrigger className="w-[120px]">
                          <DateSelectValue placeholder="Month" />
                        </DateSelectTrigger>
                        <DateSelectContent>
                          {months.map(month => (
                            <DateSelectItem key={month} value={month}>{month}</DateSelectItem>
                          ))}
                        </DateSelectContent>
                      </DateSelect>
                      <DateSelect onValueChange={handleCalendarYearChange} value={calendarMonth.getFullYear().toString()}>
                        <DateSelectTrigger className="w-[90px]">
                          <DateSelectValue placeholder="Year" />
                        </DateSelectTrigger>
                        <DateSelectContent className="max-h-[300px] overflow-y-auto">
                          {years.map(year => (
                            <DateSelectItem key={year} value={year.toString()}>{year}</DateSelectItem>
                          ))}
                        </DateSelectContent>
                      </DateSelect>
                    </div>
                  </div>
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    month={calendarMonth}
                    onMonthChange={setCalendarMonth}
                    initialFocus
                    className="p-3 pointer-events-auto"
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
                <PlaceOfBirthInput value={field.value} onChange={field.onChange} />
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
                <Popover open={openCitizenship} onOpenChange={setOpenCitizenship}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <div className="flex items-center gap-1">
                        <Input
                          placeholder="Your citizenship"
                          {...field}
                          className="w-full"
                        />
                        <div className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer">
                          <ChevronsUpDown className="h-4 w-4 opacity-50" />
                        </div>
                      </div>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0">
                    <Command>
                      <CommandInput placeholder="Search citizenship..." />
                      <CommandList>
                        <CommandEmpty>No country found.</CommandEmpty>
                        <CommandGroup>
                          {countries.map((country) => (
                            <CommandItem
                              key={country}
                              value={country}
                              onSelect={(currentValue) => {
                                field.onChange(currentValue);
                                setOpenCitizenship(false);
                              }}
                              className="cursor-pointer"
                            >
                              {country}
                              <Check
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  field.value === country ? "opacity-100" : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default PersonalInfoSection;
