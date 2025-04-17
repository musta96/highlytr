
import React, { useState, useEffect } from 'react';
import CountrySelect from './place-of-birth/CountrySelect';
import RegionSelect from './place-of-birth/RegionSelect';
import CityInput from './place-of-birth/CityInput';

interface PlaceOfBirthInputProps {
  value?: string;
  onChange?: (value: string) => void;
}

const PlaceOfBirthInput: React.FC<PlaceOfBirthInputProps> = ({ value = '', onChange }) => {
  // Parse initial value if it exists (format: "City, Region/State, Country")
  const parsedValue = value ? value.split(', ') : ['', '', ''];
  
  const [country, setCountry] = useState<string>(parsedValue[2] || '');
  const [region, setRegion] = useState<string>(parsedValue[1] || '');
  const [city, setCity] = useState<string>(parsedValue[0] || '');

  // Update the parent component whenever any value changes
  useEffect(() => {
    if (onChange) {
      const formattedValue = [city, region, country].filter(Boolean).join(', ');
      onChange(formattedValue);
    }
  }, [city, region, country, onChange]);

  const handleCountryChange = (newCountry: string) => {
    setCountry(newCountry);
    setRegion(''); // Reset region when country changes
  };

  const handleRegionChange = (newRegion: string) => {
    setRegion(newRegion);
  };

  return (
    <div className="space-y-3">
      <CountrySelect 
        value={country} 
        onChange={handleCountryChange} 
      />

      {country && (
        <RegionSelect 
          country={country}
          value={region}
          onChange={handleRegionChange}
        />
      )}

      {country && (
        <CityInput 
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      )}
    </div>
  );
};

export default PlaceOfBirthInput;
