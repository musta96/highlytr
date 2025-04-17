
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface PlaceOfBirthInputProps {
  value?: string;
  onChange?: (value: string) => void;
}

// Sample data for countries
const countries = [
  'United States',
  'Italy',
  'Spain',
  'France',
  'Germany',
  'United Kingdom',
  'Canada',
  'Australia',
  'Brazil',
  'Japan',
  'Other'
];

// Sample data for regions/states by country
const regionsByCountry: Record<string, string[]> = {
  'United States': [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 
    'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 
    'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 
    'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ],
  'Italy': [
    'Abruzzo', 'Aosta Valley', 'Apulia', 'Basilicata', 'Calabria', 'Campania', 
    'Emilia-Romagna', 'Friuli-Venezia Giulia', 'Lazio', 'Liguria', 'Lombardy', 
    'Marche', 'Molise', 'Piedmont', 'Sardinia', 'Sicily', 'Trentino-Alto Adige', 
    'Tuscany', 'Umbria', 'Veneto'
  ],
  'Spain': [
    'Andalusia', 'Aragon', 'Asturias', 'Balearic Islands', 'Basque Country', 
    'Canary Islands', 'Cantabria', 'Castile and León', 'Castilla-La Mancha', 
    'Catalonia', 'Extremadura', 'Galicia', 'La Rioja', 'Madrid', 'Murcia', 
    'Navarre', 'Valencia'
  ],
  'France': [
    'Auvergne-Rhône-Alpes', 'Bourgogne-Franche-Comté', 'Brittany', 'Centre-Val de Loire', 
    'Corsica', 'Grand Est', 'Hauts-de-France', 'Île-de-France', 'Normandy', 
    'Nouvelle-Aquitaine', 'Occitanie', 'Pays de la Loire', "Provence-Alpes-Côte d'Azur"
  ],
  'Germany': [
    'Baden-Württemberg', 'Bavaria', 'Berlin', 'Brandenburg', 'Bremen', 'Hamburg', 
    'Hesse', 'Lower Saxony', 'Mecklenburg-Vorpommern', 'North Rhine-Westphalia', 
    'Rhineland-Palatinate', 'Saarland', 'Saxony', 'Saxony-Anhalt', 
    'Schleswig-Holstein', 'Thuringia'
  ],
  'United Kingdom': [
    'England', 'Northern Ireland', 'Scotland', 'Wales'
  ],
  'Canada': [
    'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador',
    'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island',
    'Quebec', 'Saskatchewan', 'Yukon'
  ],
  'Australia': [
    'Australian Capital Territory', 'New South Wales', 'Northern Territory', 'Queensland',
    'South Australia', 'Tasmania', 'Victoria', 'Western Australia'
  ],
  'Brazil': [
    'Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal',
    'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul',
    'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí',
    'Rio de Janeiro', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia',
    'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'
  ],
  'Japan': [
    'Hokkaido', 'Tohoku', 'Kanto', 'Chubu', 'Kinki', 'Chugoku', 'Shikoku', 'Kyushu'
  ],
  'Other': []
};

const PlaceOfBirthInput: React.FC<PlaceOfBirthInputProps> = ({ value = '', onChange }) => {
  // Parse initial value if it exists (format: "City, Region/State, Country")
  const parsedValue = value ? value.split(', ') : ['', '', ''];
  
  const [country, setCountry] = useState<string>(parsedValue[2] || '');
  const [region, setRegion] = useState<string>(parsedValue[1] || '');
  const [city, setCity] = useState<string>(parsedValue[0] || '');
  const [otherRegion, setOtherRegion] = useState<string>(
    !regionsByCountry[country]?.includes(region) && region ? region : ''
  );

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
    setOtherRegion('');
  };

  const handleRegionChange = (newRegion: string) => {
    setRegion(newRegion);
  };

  const handleOtherRegionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherRegion(e.target.value);
    setRegion(e.target.value);
  };

  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor="country">Country</Label>
        <Select value={country} onValueChange={handleCountryChange}>
          <SelectTrigger id="country">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {country && (
        <div>
          <Label htmlFor="region">
            {country === 'United States' ? 'State' : 
             country === 'Other' ? 'Region/Province' : 'Region'}
          </Label>
          
          {country !== 'Other' && regionsByCountry[country]?.length > 0 ? (
            <Select value={region} onValueChange={handleRegionChange}>
              <SelectTrigger id="region">
                <SelectValue placeholder={`Select ${country === 'United States' ? 'state' : 'region'}`} />
              </SelectTrigger>
              <SelectContent>
                {regionsByCountry[country]?.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
                <SelectItem key="other" value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <Input
              id="region"
              value={otherRegion}
              onChange={handleOtherRegionChange}
              placeholder={`Enter ${country === 'United States' ? 'state' : 'region/province'}`}
            />
          )}

          {region === 'other' && (
            <div className="mt-3">
              <Label htmlFor="otherRegion">Specify Region</Label>
              <Input
                id="otherRegion"
                value={otherRegion}
                onChange={handleOtherRegionChange}
                placeholder="Enter region/province"
              />
            </div>
          )}
        </div>
      )}

      {country && (
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
          />
        </div>
      )}
    </div>
  );
};

export default PlaceOfBirthInput;
