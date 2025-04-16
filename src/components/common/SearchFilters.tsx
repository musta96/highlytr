
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Accordion } from '@/components/ui/accordion';
import { Filter } from 'lucide-react';
import FilterBadges from './filters/FilterBadges';
import SearchInput from './filters/SearchInput';
import SportFilter from './filters/SportFilter';
import LocationFilter from './filters/LocationFilter';
import AcademicFilter from './filters/AcademicFilter';
import PersonalFilter from './filters/PersonalFilter';
import DivisionFilter from './filters/DivisionFilter';
import ScholarshipsFilter from './filters/ScholarshipsFilter';

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
  
  const clearAllFilters = () => {
    setSelectedFilters([]);
    onFilterChange({ selectedFilters: [], gpaRange: [3.0], ageRange: [16] });
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
          <SearchInput 
            searchQuery={searchQuery} 
            onSearchChange={handleSearchChange}
            placeholder={userType === 'college' ? "Search athletes..." : "Search colleges..."}
          />
          
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
      
      <FilterBadges 
        selectedFilters={selectedFilters}
        removeFilter={removeFilter}
        clearAllFilters={clearAllFilters}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className={`md:block md:col-span-1 ${mobileFiltersOpen ? 'block' : 'hidden'}`}>
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="font-semibold mb-4">Filters</h3>
            
            <Accordion type="multiple" defaultValue={["sport", "location", "academic"]}>
              <SportFilter addFilter={addFilter} />
              <LocationFilter addFilter={addFilter} userType={userType} />
              
              {userType === 'college' && (
                <>
                  <AcademicFilter 
                    addFilter={addFilter}
                    gpaRange={gpaRange}
                    setGpaRange={setGpaRange}
                  />
                  
                  <PersonalFilter 
                    addFilter={addFilter}
                    ageRange={ageRange}
                    setAgeRange={setAgeRange}
                  />
                </>
              )}
              
              {userType === 'athlete' && (
                <>
                  <DivisionFilter />
                  <ScholarshipsFilter />
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
