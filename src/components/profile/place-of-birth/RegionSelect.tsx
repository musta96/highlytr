
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

interface RegionSelectProps {
  country: string;
  value: string;
  onChange: (value: string) => void;
}

const RegionSelect: React.FC<RegionSelectProps> = ({ country, value, onChange }) => {
  const [otherRegion, setOtherRegion] = useState<string>(
    !regionsByCountry[country]?.includes(value) && value ? value : ''
  );

  const handleRegionChange = (newRegion: string) => {
    onChange(newRegion);
  };

  const handleOtherRegionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherRegion(e.target.value);
    onChange(e.target.value);
  };

  // If no country selected or country is "Other" with no regions, or country doesn't exist in our data
  if (!country || !regionsByCountry[country] || regionsByCountry[country]?.length === 0) {
    return (
      <div>
        <Label htmlFor="region">
          {country === 'United States' ? 'State' : 
          country === 'Other' ? 'Region/Province' : 'Region'}
        </Label>
        <Input
          id="region"
          value={otherRegion}
          onChange={handleOtherRegionChange}
          placeholder={`Enter ${country === 'United States' ? 'state' : 'region/province'}`}
        />
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
          <Input
            id="otherRegion"
            value={otherRegion}
            onChange={handleOtherRegionChange}
            placeholder="Enter region/province"
          />
        </div>
      )}
    </div>
  );
};

export default RegionSelect;
