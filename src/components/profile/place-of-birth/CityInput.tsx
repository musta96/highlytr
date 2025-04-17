
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// Common cities for auto-suggestions
const commonCities = [
  'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 
  'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Francisco',
  'Rome', 'Milan', 'Naples', 'Turin', 'Palermo',
  'Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice',
  'Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt',
  'London', 'Manchester', 'Liverpool', 'Birmingham', 'Glasgow'
];

interface CityInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | string) => void;
}

const CityInput: React.FC<CityInputProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  
  const handleSelect = (currentValue: string) => {
    if (typeof onChange === 'function') {
      if (typeof onChange === 'function' && onChange.length === 1) {
        // If it accepts an event
        const syntheticEvent = {
          target: { value: currentValue },
          currentTarget: { value: currentValue }
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      } else {
        // If it accepts a direct string value
        onChange(currentValue);
      }
    }
    setOpen(false);
  };

  return (
    <div className="w-full">
      <Label htmlFor="city">City</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="flex items-center gap-1">
            <Input
              id="city"
              value={value}
              onChange={(e) => onChange(e)}
              placeholder="Enter city"
              className="w-full"
            />
            <div className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer">
              <ChevronsUpDown className="h-4 w-4 opacity-50" />
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search cities..." />
            <CommandList>
              <CommandEmpty>No city found.</CommandEmpty>
              <CommandGroup heading="Common Cities">
                {commonCities.map((city) => (
                  <CommandItem
                    key={city}
                    value={city}
                    onSelect={handleSelect}
                    className="cursor-pointer"
                  >
                    {city}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === city ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CityInput;
