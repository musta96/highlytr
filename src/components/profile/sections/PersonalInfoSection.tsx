
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import BasicInfoFields from './BasicInfoFields';
import DateOfBirthPicker from './DateOfBirthPicker';
import PlaceOfBirthField from './PlaceOfBirthField';
import CitizenshipField from './CitizenshipField';

interface PersonalInfoSectionProps {
  form: UseFormReturn<any>;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BasicInfoFields form={form} />
        <DateOfBirthPicker form={form} />
        <PlaceOfBirthField form={form} />
        <CitizenshipField form={form} />
      </div>
    </div>
  );
};

export default PersonalInfoSection;
