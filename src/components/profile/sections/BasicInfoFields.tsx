
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';

interface BasicInfoFieldsProps {
  form: UseFormReturn<any>;
}

const BasicInfoFields: React.FC<BasicInfoFieldsProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>First Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter your first name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="lastName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Last Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter your last name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default BasicInfoFields;
