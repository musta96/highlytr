
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
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { X, Search, Filter, SortDesc } from 'lucide-react';

export interface AthleteFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: any) => void;
}

export interface FilterState {
  sport: string;
  position: string;
  ageRange: [number, number];
  gpaMin: number;
  location: string;
  gender: string;
  sortBy: string;
}

const AthleteFilters: React.FC<AthleteFiltersProps> = ({ onSearch, onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    sport: '',
    position: '',
    ageRange: [14, 19],
    gpaMin: 3.0,
    location: '',
    gender: '',
    sortBy: 'name',
  });
  
  const addFilter = (filter: string) => {
    if (!selectedFilters.includes(filter)) {
      const newFilters = [...selectedFilters, filter];
      setSelectedFilters(newFilters);
    }
  };
  
  const removeFilter = (filter: string) => {
    const newFilters = selectedFilters.filter(f => f !== filter);
    setSelectedFilters(newFilters);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };
  
  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Find Athletes</h2>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              type="search" 
              placeholder="Search athletes..." 
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
              setFilters({
                sport: '',
                position: '',
                ageRange: [14, 19],
                gpaMin: 3.0,
                location: '',
                gender: '',
                sortBy: 'name',
              });
              onFilterChange({
                sport: '',
                position: '',
                ageRange: [14, 19],
                gpaMin: 3.0,
                location: '',
                gender: '',
                sortBy: 'name',
              });
            }}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            Clear all
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Desktop Filters */}
        <div className={`md:block md:col-span-1 ${mobileFiltersOpen ? 'block' : 'hidden'}`}>
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="font-semibold mb-4">Filters</h3>
            
            <Accordion type="multiple" defaultValue={["sport", "location", "academic"]}>
              <AccordionItem value="sport">
                <AccordionTrigger>Sports</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {['Soccer', 'Basketball', 'Swimming', 'Tennis', 'Track & Field'].map((sport) => (
                      <div key={sport} className="flex items-center space-x-2">
                        <Checkbox 
                          id={sport.toLowerCase()}
                          checked={filters.sport === sport}
                          onCheckedChange={() => {
                            if (filters.sport === sport) {
                              updateFilter('sport', '');
                            } else {
                              updateFilter('sport', sport);
                              addFilter(`Sport: ${sport}`);
                            }
                          }}
                        />
                        <Label htmlFor={sport.toLowerCase()} className="text-sm">{sport}</Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="position">
                <AccordionTrigger>Position</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <Select
                      value={filters.position}
                      onValueChange={(value) => {
                        updateFilter('position', value);
                        if (value) addFilter(`Position: ${value}`);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="forward">Forward</SelectItem>
                        <SelectItem value="midfielder">Midfielder</SelectItem>
                        <SelectItem value="defender">Defender</SelectItem>
                        <SelectItem value="goalkeeper">Goalkeeper</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="location">
                <AccordionTrigger>Location</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <Select onValueChange={(value) => {
                      updateFilter('location', value);
                      if (value) addFilter(`Country: ${value}`);
                    }}>
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
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="academic">
                <AccordionTrigger>Academic</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">GPA (Min: {filters.gpaMin})</span>
                      </div>
                      <Slider
                        defaultValue={[filters.gpaMin]}
                        min={2.0}
                        max={4.0}
                        step={0.1}
                        onValueChange={(value) => {
                          updateFilter('gpaMin', value[0]);
                          addFilter(`GPA: ${value[0]}+`);
                        }}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="personal">
                <AccordionTrigger>Personal</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Age Range: {filters.ageRange[0]} - {filters.ageRange[1]}</span>
                      </div>
                      <Slider
                        defaultValue={filters.ageRange}
                        min={14}
                        max={19}
                        step={1}
                        onValueChange={(value) => {
                          if (value.length === 2) {
                            updateFilter('ageRange', value);
                            addFilter(`Age: ${value[0]}-${value[1]}`);
                          }
                        }}
                      />
                    </div>
                    
                    <Select onValueChange={(value) => {
                      updateFilter('gender', value);
                      if (value) addFilter(`Gender: ${value}`);
                    }}>
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
              
              <AccordionItem value="sort">
                <AccordionTrigger>Sort By</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <Select
                      value={filters.sortBy}
                      onValueChange={(value) => updateFilter('sortBy', value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sort by..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="age">Age</SelectItem>
                        <SelectItem value="gpa">GPA (Highest First)</SelectItem>
                        <SelectItem value="location">Location</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="mt-6">
              <Button className="w-full" onClick={() => onFilterChange(filters)}>
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
        
        {/* Right side - will contain the search results */}
        <div className="col-span-1 md:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">all</span> athletes
            </div>
            <div className="flex gap-2">
              <Select 
                value={filters.sortBy}
                onValueChange={(value) => updateFilter('sortBy', value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SortDesc className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="age">Age</SelectItem>
                  <SelectItem value="gpa">GPA (Highest)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Content section for child components */}
          <div className="content-container">
            {/* This will be filled by the parent component */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AthleteFilters;
