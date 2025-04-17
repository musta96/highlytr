
import React, { useState, useEffect } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import CountrySelect from './CountrySelect';
import RegionSelect from './RegionSelect';
import CityInput from './CityInput';
import PlaceOfBirthTooltip from './PlaceOfBirthTooltip';
import { AnimatePresence, motion } from 'framer-motion';

interface PlaceOfBirthInputContainerProps {
  value?: string;
  onChange?: (value: string) => void;
}

const PlaceOfBirthInputContainer: React.FC<PlaceOfBirthInputContainerProps> = ({ value = '', onChange }) => {
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
    setCity(''); // Reset city when country changes
    setAnimateField('region');
    setTimeout(() => setAnimateField(null), 1000);
  };

  const handleRegionChange = (newRegion: string) => {
    setRegion(newRegion);
    setCity(''); // Reset city when region changes
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
        <div className="flex-1">
          <CountrySelect 
            value={country} 
            onChange={handleCountryChange} 
          />
        </div>
        
        <div className="px-2">
          <TooltipProvider>
            <PlaceOfBirthTooltip />
          </TooltipProvider>
        </div>
      </div>

      <AnimatePresence>
        {country && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <RegionSelect 
              country={country}
              value={region}
              onChange={handleRegionChange}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {country && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <CityInput 
              value={city}
              onChange={handleCityChange}
              country={country}
              region={region}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PlaceOfBirthInputContainer;
