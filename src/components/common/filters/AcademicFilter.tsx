
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

interface AcademicFilterProps {
  addFilter: (filter: string) => void;
  gpaRange: number[];
  setGpaRange: (range: number[]) => void;
}

const AcademicFilter = ({ addFilter, gpaRange, setGpaRange }: AcademicFilterProps) => {
  return (
    <FilterCategory title="Academic" value="academic">
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm">GPA (Min: {gpaRange[0]})</span>
          </div>
          <Slider
            defaultValue={[3.0]}
            min={2.0}
            max={4.0}
            step={0.1}
            onValueChange={(value) => {
              setGpaRange(value);
              addFilter(`GPA: ${value[0]}+`);
            }}
          />
        </div>
        
        <Select onValueChange={(value) => addFilter(`English Level: ${value}`)}>
          <SelectTrigger>
            <SelectValue placeholder="English proficiency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
            <SelectItem value="native">Native/Fluent</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </FilterCategory>
  );
};

export default AcademicFilter;
