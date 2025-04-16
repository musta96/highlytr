import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { X, Search, Filter } from 'lucide-react';

interface SearchFiltersProps {
  userType?: 'athlete' | 'college' | 'agency';
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: any) => void;
}

const SearchFilters = ({ 
  userType = 'college', 
  onSearch = () => {}, 
  onFilterChange = () => {} 
}: SearchFiltersProps) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false);
  const [selectedFilters, setSelectedFilters] = React.useState<string[]>([]);
  const [gpaRange, setGpaRange] = React.useState([3.0]);
  const [ageRange, setAgeRange] = React.useState([16]);
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const addFilter = (filter: string) => {
    if (!selectedFilters.includes(filter)) {
      const newFilters = [...selectedFilters, filter];
      setSelectedFilters(newFilters);
      onFilterChange({ selectedFilters: newFilters, gpaRange, ageRange });
    }
  };
  
  const removeFilter = (filter: string) => {
    const newFilters = selectedFilters.filter(f => f !== filter);
    setSelectedFilters(newFilters);
    onFilterChange({ selectedFilters: newFilters, gpaRange, ageRange });
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };
  
  const handleApplyFilters = () => {
    onFilterChange({ selectedFilters, gpaRange, ageRange });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">
          {userType === 'college' ? 'Find Athletes' : 'Find Colleges'}
        </h2>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              type="search" 
              placeholder={userType === 'college' ? "Search athletes..." : "Search colleges..."} 
              className="pl-9"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="sm:hidden"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {selectedFilters.map((filter) => (
          <Badge key={filter} variant="outline" className="flex items-center gap-1">
            {filter}
            <button
              onClick={() => removeFilter(filter)}
              className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        {selectedFilters.length > 0 && (
          <button
            onClick={() => {
              setSelectedFilters([]);
              onFilterChange({ selectedFilters: [], gpaRange: [3.0], ageRange: [16] });
            }}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            Clear all
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className={`md:block md:col-span-1 ${mobileFiltersOpen ? 'block' : 'hidden'}`}>
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="font-semibold mb-4">Filters</h3>
            
            <Accordion type="multiple" defaultValue={["sport", "location", "academic"]}>
              <AccordionItem value="sport">
                <AccordionTrigger>Sports</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input id="soccer" type="checkbox" className="rounded" />
                      <label htmlFor="soccer" className="ml-2 text-sm">Soccer</label>
                    </div>
                    <div className="flex items-center">
                      <input id="basketball" type="checkbox" className="rounded" />
                      <label htmlFor="basketball" className="ml-2 text-sm">Basketball</label>
                    </div>
                    <div className="flex items-center">
                      <input id="tennis" type="checkbox" className="rounded" />
                      <label htmlFor="tennis" className="ml-2 text-sm">Tennis</label>
                    </div>
                    <div className="flex items-center">
                      <input id="swimming" type="checkbox" className="rounded" />
                      <label htmlFor="swimming" className="ml-2 text-sm">Swimming</label>
                    </div>
                    <div className="flex items-center">
                      <input id="track" type="checkbox" className="rounded" />
                      <label htmlFor="track" className="ml-2 text-sm">Track & Field</label>
                    </div>
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="p-0"
                      onClick={() => addFilter('Soccer')}
                    >
                      Show more
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="location">
                <AccordionTrigger>Location</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <Select onValueChange={(value) => addFilter(`Country: ${value}`)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="italy">Italy</SelectItem>
                        <SelectItem value="spain">Spain</SelectItem>
                        <SelectItem value="france">France</SelectItem>
                        <SelectItem value="germany">Germany</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    {userType === 'athlete' && (
                      <Select onValueChange={(value) => addFilter(`State: ${value}`)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select US state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="california">California</SelectItem>
                          <SelectItem value="new-york">New York</SelectItem>
                          <SelectItem value="texas">Texas</SelectItem>
                          <SelectItem value="florida">Florida</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              {userType === 'college' && (
                <>
                  <AccordionItem value="academic">
                    <AccordionTrigger>Academic</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm">GPA (Min: {gpaRange[0]})</span>
                          </div>
                          <Slider
                            defaultValue={[3.0]}
                            min={2.0}
                            max={4.0}
                            step={0.1}
                            onValueChange={(value) => {
                              setGpaRange(value);
                              addFilter(`GPA: ${value[0]}+`);
                            }}
                          />
                        </div>
                        
                        <Select onValueChange={(value) => addFilter(`English Level: ${value}`)}>
                          <SelectTrigger>
                            <SelectValue placeholder="English proficiency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                            <SelectItem value="native">Native/Fluent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="personal">
                    <AccordionTrigger>Personal</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm">Age (Min: {ageRange[0]})</span>
                          </div>
                          <Slider
                            defaultValue={[16]}
                            min={14}
                            max={19}
                            step={1}
                            onValueChange={(value) => {
                              setAgeRange(value);
                              addFilter(`Age: ${value[0]}+`);
                            }}
                          />
                        </div>
                        
                        <Select onValueChange={(value) => addFilter(`Gender: ${value}`)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </>
              )}
              
              {userType === 'athlete' && (
                <>
                  <AccordionItem value="division">
                    <AccordionTrigger>Division</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input id="ncaa-1" type="checkbox" className="rounded" />
                          <label htmlFor="ncaa-1" className="ml-2 text-sm">NCAA Division I</label>
                        </div>
                        <div className="flex items-center">
                          <input id="ncaa-2" type="checkbox" className="rounded" />
                          <label htmlFor="ncaa-2" className="ml-2 text-sm">NCAA Division II</label>
                        </div>
                        <div className="flex items-center">
                          <input id="ncaa-3" type="checkbox" className="rounded" />
                          <label htmlFor="ncaa-3" className="ml-2 text-sm">NCAA Division III</label>
                        </div>
                        <div className="flex items-center">
                          <input id="naia" type="checkbox" className="rounded" />
                          <label htmlFor="naia" className="ml-2 text-sm">NAIA</label>
                        </div>
                        <div className="flex items-center">
                          <input id="njcaa" type="checkbox" className="rounded" />
                          <label htmlFor="njcaa" className="ml-2 text-sm">NJCAA</label>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="scholarships">
                    <AccordionTrigger>Scholarships</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input id="full" type="checkbox" className="rounded" />
                          <label htmlFor="full" className="ml-2 text-sm">Full Scholarship Available</label>
                        </div>
                        <div className="flex items-center">
                          <input id="partial" type="checkbox" className="rounded" />
                          <label htmlFor="partial" className="ml-2 text-sm">Partial Scholarship Available</label>
                        </div>
                        <div className="flex items-center">
                          <input id="international" type="checkbox" className="rounded" />
                          <label htmlFor="international" className="ml-2 text-sm">International Scholarships</label>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </>
              )}
            </Accordion>
            
            <div className="mt-6">
              <Button className="w-full" onClick={handleApplyFilters}>Apply Filters</Button>
            </div>
          </div>
        </div>
        
        <div className="col-span-1 md:col-span-3">
          <div className="bg-white p-4 rounded-lg border h-96 flex items-center justify-center">
            <p className="text-gray-500 text-center">
              Search results will appear here.<br />
              Use the filters to narrow down your search.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
