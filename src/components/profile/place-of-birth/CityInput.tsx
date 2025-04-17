
import React, { useState, useEffect } from 'react';
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
import { Button } from '@/components/ui/button';
import { citiesByRegion } from './data';

interface CityInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | string) => void;
  country: string;
  region: string;
}

const CityInput: React.FC<CityInputProps> = ({ value, onChange, country, region }) => {
  const [open, setOpen] = useState(false);
  const [otherCity, setOtherCity] = useState<string>(value);
  const [isOther, setIsOther] = useState(false);
  
  // Get cities based on country and region
  const getCitiesByRegion = (): string[] => {
    // If country and region exist in our data
    if (citiesByRegion[country]?.[region]) {
      return citiesByRegion[country][region];
    }
    
    // Return empty array if no cities found
    return [];
  };

  const cities = getCitiesByRegion();

  // Check if the current value is not in the list and set isOther accordingly
  useEffect(() => {
    if (value && !cities.includes(value) && value !== 'other') {
      setIsOther(true);
      setOtherCity(value);
    } else {
      setIsOther(value === 'other');
    }
  }, [value, cities]);

  const handleSelect = (currentValue: string) => {
    if (currentValue === 'other') {
      setIsOther(true);
      onChange('other');
    } else {
      setIsOther(false);
      onChange(currentValue);
    }
    setOpen(false);
  };

  const handleOtherCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherCity(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="w-full space-y-3">
      <Label htmlFor="city">City</Label>
      
      {cities.length > 0 ? (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
              id="city"
            >
              {isOther ? otherCity || "Other" : value || "Select city"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">
            <Command>
              <CommandInput placeholder="Search cities..." />
              <CommandList>
                <CommandEmpty>No city found.</CommandEmpty>
                <CommandGroup heading="Cities">
                  {cities.map((city) => (
                    <CommandItem
                      key={city}
                      value={city}
                      onSelect={() => handleSelect(city)}
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
                  <CommandItem
                    key="other"
                    value="other"
                    onSelect={() => handleSelect('other')}
                    className="cursor-pointer"
                  >
                    Other
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        isOther ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      ) : (
        <Input
          id="city"
          value={value}
          onChange={(e) => onChange(e)}
          placeholder="Enter city"
          className="w-full"
        />
      )}
      
      {isOther && cities.length > 0 && (
        <div className="pt-2 animate-fade-in">
          <Label htmlFor="otherCity">Specify City</Label>
          <Input
            id="otherCity"
            value={otherCity}
            onChange={handleOtherCityChange}
            placeholder="Enter city name"
            className="w-full"
          />
        </div>
      )}
    </div>
  );
};

export default CityInput;
