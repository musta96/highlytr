
import React from 'react';
import FilterCategory from './FilterCategory';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface LocationFilterProps {
  addFilter: (filter: string) => void;
  userType?: 'athlete' | 'college' | 'agency';
}

const LocationFilter = ({ addFilter, userType = 'college' }: LocationFilterProps) => {
  return (
    <FilterCategory title="Location" value="location">
      <div className="space-y-4">
        <Select onValueChange={(value) => addFilter(`Country: ${value}`)}>
          <SelectTrigger>
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="italy">Italy</SelectItem>
            <SelectItem value="spain">Spain</SelectItem>
            <SelectItem value="france">France</SelectItem>
            <SelectItem value="germany">Germany</SelectItem>
          </SelectContent>
        </Select>
        
        {userType === 'athlete' && (
          <Select onValueChange={(value) => addFilter(`State: ${value}`)}>
            <SelectTrigger>
              <SelectValue placeholder="Select US state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="california">California</SelectItem>
              <SelectItem value="new-york">New York</SelectItem>
              <SelectItem value="texas">Texas</SelectItem>
              <SelectItem value="florida">Florida</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>
    </FilterCategory>
  );
};

export default LocationFilter;
