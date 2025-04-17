
import React, { useState } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { countries } from '../place-of-birth/data';

interface CitizenshipFieldProps {
  form: UseFormReturn<any>;
}

const CitizenshipField: React.FC<CitizenshipFieldProps> = ({ form }) => {
  const [openCitizenship, setOpenCitizenship] = useState(false);

  return (
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
  );
};

export default CitizenshipField;
