
import React from 'react';
import FilterCategory from './FilterCategory';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PersonalFilterProps {
  addFilter: (filter: string) => void;
  ageRange: number[];
  setAgeRange: (range: number[]) => void;
}

const PersonalFilter = ({ addFilter, ageRange, setAgeRange }: PersonalFilterProps) => {
  return (
    <FilterCategory title="Personal" value="personal">
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm">Age (Min: {ageRange[0]})</span>
          </div>
          <Slider
            defaultValue={[16]}
            min={14}
            max={19}
            step={1}
            onValueChange={(value) => {
              setAgeRange(value);
              addFilter(`Age: ${value[0]}+`);
            }}
          />
        </div>
        
        <Select onValueChange={(value) => addFilter(`Gender: ${value}`)}>
          <SelectTrigger>
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </FilterCategory>
  );
};

export default PersonalFilter;
