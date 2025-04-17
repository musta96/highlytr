
import React from 'react';
import PlaceOfBirthInputContainer from './place-of-birth/PlaceOfBirthInputContainer';

interface PlaceOfBirthInputProps {
  value?: string;
  onChange?: (value: string) => void;
}

// This wrapper component maintains the same interface as the original component
// to ensure backward compatibility with existing code
const PlaceOfBirthInput: React.FC<PlaceOfBirthInputProps> = ({ value, onChange }) => {
  return <PlaceOfBirthInputContainer value={value} onChange={onChange} />;
};

export default PlaceOfBirthInput;
