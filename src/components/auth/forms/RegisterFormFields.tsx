
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AccountTypeSelector from './AccountTypeSelector';
import { AccountType } from '../types';
import { RegisterFormData } from './RegisterFormSchema';

interface RegisterFormFieldsProps {
  form: UseFormReturn<RegisterFormData>;
  accountType: AccountType;
  setAccountType: (type: AccountType) => void;
}

const RegisterFormFields: React.FC<RegisterFormFieldsProps> = ({ 
  form,
  accountType, 
  setAccountType 
}) => {
  const handleAccountTypeChange = (type: AccountType) => {
    setAccountType(type);
    form.setValue('accountType', type);
  };

  return (
    <>
      <div className="space-y-1">
        <div className="text-sm font-medium mb-2">I am registering as a:</div>
        <AccountTypeSelector 
          accountType={accountType} 
          onChange={handleAccountTypeChange} 
        />
        {form.formState.errors.accountType && (
          <p className="text-sm font-medium text-destructive mt-1">
            {form.formState.errors.accountType.message?.toString()}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
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
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="john.doe@example.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" placeholder="••••••••" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default RegisterFormFields;
