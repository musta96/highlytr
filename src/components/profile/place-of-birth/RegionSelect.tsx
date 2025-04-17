
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
import { regionsByCountry } from './data';

interface RegionSelectProps {
  country: string;
  value: string;
  onChange: (value: string) => void;
}

const RegionSelect: React.FC<RegionSelectProps> = ({ country, value, onChange }) => {
  const [open, setOpen] = useState(false);
  
  // Get regions for selected country
  const regions = country ? regionsByCountry[country] || [] : [];

  return (
    <div className="space-y-2">
      <Label htmlFor="region">Region/State</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            id="region"
          >
            {value || "Select region/state"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search regions..." />
            <CommandList>
              <CommandEmpty>No region found.</CommandEmpty>
              <CommandGroup heading={`Regions in ${country}`} className="max-h-[300px] overflow-y-auto">
                {regions.map((region) => (
                  <CommandItem
                    key={region}
                    value={region}
                    onSelect={() => {
                      onChange(region);
                      setOpen(false);
                    }}
                    className="cursor-pointer"
                  >
                    {region}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === region ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
                {!regions.includes(value) && value && (
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

export default RegionSelect;
