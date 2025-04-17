
import React, { useState, useEffect } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
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
  const [animateField, setAnimateField] = useState<string | null>(null);

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
    setAnimateField('region');
    setTimeout(() => setAnimateField(null), 1000);
  };

  const handleRegionChange = (newRegion: string) => {
    setRegion(newRegion);
    setAnimateField('city');
    setTimeout(() => setAnimateField(null), 1000);
  };

  // Handle city input, accepting either event or direct string value
  const handleCityChange = (eventOrValue: React.ChangeEvent<HTMLInputElement> | string) => {
    // Check if it's a string or event
    if (typeof eventOrValue === 'string') {
      setCity(eventOrValue);
    } else if (eventOrValue && eventOrValue.target) {
      // It's an event
      setCity(eventOrValue.target.value);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className={`transition-all duration-300 ${animateField === 'country' ? 'scale-105' : ''}`}>
          <CountrySelect 
            value={country} 
            onChange={handleCountryChange} 
          />
        </div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="p-1.5 rounded-full hover:bg-muted cursor-help">
                <Info className="h-4 w-4 text-muted-foreground" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm max-w-60">Your place of birth helps personalize your experience and connect you with others from your region</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {country && (
        <div className={`transition-all duration-300 ${animateField === 'region' ? 'animate-fade-in' : ''}`}>
          <RegionSelect 
            country={country}
            value={region}
            onChange={handleRegionChange}
          />
        </div>
      )}

      {country && (
        <div className={`transition-all duration-300 ${animateField === 'city' ? 'animate-fade-in' : ''}`}>
          <CityInput 
            value={city}
            onChange={handleCityChange}
          />
        </div>
      )}
    </div>
  );
};

export default PlaceOfBirthInput;
