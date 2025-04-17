
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface CityInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CityInput: React.FC<CityInputProps> = ({ value, onChange }) => {
  return (
    <div>
      <Label htmlFor="city">City</Label>
      <Input
        id="city"
        value={value}
        onChange={onChange}
        placeholder="Enter city"
      />
    </div>
  );
};

export default CityInput;
