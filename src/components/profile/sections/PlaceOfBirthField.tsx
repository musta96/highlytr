
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import PlaceOfBirthInputContainer from '../place-of-birth/PlaceOfBirthInputContainer';

interface PlaceOfBirthFieldProps {
  form: UseFormReturn<any>;
}

const PlaceOfBirthField: React.FC<PlaceOfBirthFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="placeOfBirth"
      render={({ field }) => (
        <FormItem className="col-span-2">
          <FormLabel className="mb-1 block">Place of Birth</FormLabel>
          <FormControl>
            <PlaceOfBirthInputContainer 
              value={field.value} 
              onChange={field.onChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PlaceOfBirthField;
