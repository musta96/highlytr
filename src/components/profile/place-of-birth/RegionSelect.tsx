
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { regionsByCountry } from './data';
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

interface RegionSelectProps {
  country: string;
  value: string;
  onChange: (value: string) => void;
}

const RegionSelect: React.FC<RegionSelectProps> = ({ country, value, onChange }) => {
  const [otherRegion, setOtherRegion] = useState<string>(
    !regionsByCountry[country]?.includes(value) && value ? value : ''
  );
  const [open, setOpen] = useState(false);

  const handleRegionChange = (newRegion: string) => {
    onChange(newRegion);
  };

  const handleOtherRegionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherRegion(e.target.value);
    onChange(e.target.value);
  };

  const handleSelect = (selectedRegion: string) => {
    setOtherRegion(selectedRegion);
    onChange(selectedRegion);
    setOpen(false);
  };

  // Get common regions based on country
  const commonRegions = regionsByCountry[country] || [];

  // If no country selected or country is "Other" with no regions, or country doesn't exist in our data
  if (!country || !regionsByCountry[country] || regionsByCountry[country]?.length === 0) {
    return (
      <div>
        <Label htmlFor="region">
          {country === 'United States' ? 'State' : 
          country === 'Other' ? 'Region/Province' : 'Region'}
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div className="flex items-center gap-1">
              <Input
                id="region"
                value={otherRegion}
                onChange={handleOtherRegionChange}
                placeholder={`Enter ${country === 'United States' ? 'state' : 'region/province'}`}
                className="w-full"
              />
              <div className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer">
                <ChevronsUpDown className="h-4 w-4 opacity-50" />
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">
            <Command>
              <CommandInput placeholder={`Search ${country === 'United States' ? 'states' : 'regions'}`} />
              <CommandList>
                <CommandEmpty>No region found.</CommandEmpty>
                <CommandGroup heading={country === 'United States' ? 'Common States' : 'Common Regions'}>
                  {['North', 'South', 'East', 'West', 'Central'].map((region) => (
                    <CommandItem
                      key={region}
                      value={region}
                      onSelect={handleSelect}
                      className="cursor-pointer"
                    >
                      {region}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          otherRegion === region ? "opacity-100" : "opacity-0"
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
  }

  return (
    <div>
      <Label htmlFor="region">
        {country === 'United States' ? 'State' : 'Region'}
      </Label>
      
      <Select value={value} onValueChange={handleRegionChange}>
        <SelectTrigger id="region">
          <SelectValue placeholder={`Select ${country === 'United States' ? 'state' : 'region'}`} />
        </SelectTrigger>
        <SelectContent>
          {regionsByCountry[country]?.map((region) => (
            <SelectItem key={region} value={region}>
              {region}
            </SelectItem>
          ))}
          <SelectItem key="other" value="other">Other</SelectItem>
        </SelectContent>
      </Select>

      {value === 'other' && (
        <div className="mt-3">
          <Label htmlFor="otherRegion">Specify Region</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <div className="flex items-center gap-1">
                <Input
                  id="otherRegion"
                  value={otherRegion}
                  onChange={handleOtherRegionChange}
                  placeholder="Enter region/province"
                  className="w-full"
                />
                <div className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer">
                  <ChevronsUpDown className="h-4 w-4 opacity-50" />
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput placeholder={`Search ${country === 'United States' ? 'states' : 'regions'}`} />
                <CommandList>
                  <CommandEmpty>No region found.</CommandEmpty>
                  <CommandGroup heading={country === 'United States' ? 'Common States' : 'Common Regions'}>
                    {['North', 'South', 'East', 'West', 'Central'].map((region) => (
                      <CommandItem
                        key={region}
                        value={region}
                        onSelect={handleSelect}
                        className="cursor-pointer"
                      >
                        {region}
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            otherRegion === region ? "opacity-100" : "opacity-0"
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
      )}
    </div>
  );
};

export default RegionSelect;
