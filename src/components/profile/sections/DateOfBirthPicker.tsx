
import React, { useState } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { 
  Select as DateSelect, 
  SelectContent as DateSelectContent, 
  SelectItem as DateSelectItem, 
  SelectTrigger as DateSelectTrigger, 
  SelectValue as DateSelectValue 
} from '@/components/ui/select';

interface DateOfBirthPickerProps {
  form: UseFormReturn<any>;
}

const DateOfBirthPicker: React.FC<DateOfBirthPickerProps> = ({ form }) => {
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date());
  
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
                  variant="outline"
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
  );
};

export default DateOfBirthPicker;
