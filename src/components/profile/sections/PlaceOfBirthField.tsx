
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import PlaceOfBirthInput from '../PlaceOfBirthInput';

interface PlaceOfBirthFieldProps {
  form: UseFormReturn<any>;
}

const PlaceOfBirthField: React.FC<PlaceOfBirthFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="placeOfBirth"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Place of Birth</FormLabel>
          <FormControl>
            <PlaceOfBirthInput value={field.value} onChange={field.onChange} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PlaceOfBirthField;
