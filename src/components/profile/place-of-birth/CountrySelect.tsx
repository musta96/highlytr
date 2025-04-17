
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
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
import { countries } from './data';

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-2 w-full">
      <Label htmlFor="country">Country</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            id="country"
          >
            {value || "Select country"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search countries..." />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup heading="Countries" className="max-h-[300px] overflow-y-auto">
                {countries.map((country) => (
                  <CommandItem
                    key={country}
                    value={country}
                    onSelect={() => {
                      onChange(country);
                      setOpen(false);
                    }}
                    className="cursor-pointer"
                  >
                    {country}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === country ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
                {!countries.includes(value) && value && (
                  <CommandItem
                    value={value}
                    onSelect={() => {
                      setOpen(false);
                    }}
                    className="cursor-pointer"
                  >
                    {value}
                    <Check className="ml-auto h-4 w-4 opacity-100" />
                  </CommandItem>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CountrySelect;
