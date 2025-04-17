
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Filter } from 'lucide-react';
import { SearchType, Filters } from './types';
import { mockAthletes, mockColleges } from './constants';
import SearchFilters from './components/SearchFilters';
import AthleteCard from './components/AthleteCard';
import CollegeCard from './components/CollegeCard';

interface SearchPageProps {
  type: SearchType;
}

const SearchPage: React.FC<SearchPageProps> = ({ type }) => {
  const [query, setQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    sport: '',
    position: '',
    ageMin: 14,
    ageMax: 19,
    gpaMin: 2.0,
    countryOrState: '',
    divisionLevel: '',
    hasScholarship: false,
  });

  const handleFilterChange = (key: keyof Filters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      sport: '',
      position: '',
      ageMin: 14,
      ageMax: 19,
      gpaMin: 2.0,
      countryOrState: '',
      divisionLevel: '',
      hasScholarship: false,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          {type === 'athletes' ? 'Find Athletes' : type === 'colleges' ? 'Find Colleges' : 'Find Agencies'}
        </h1>
        
        <Button 
          variant="outline" 
          className="md:hidden" 
          onClick={() => setShowMobileFilters(true)}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      <div className="relative">
        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          placeholder={`Search ${type}...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <SearchFilters
          type={type}
          filters={filters}
          showMobileFilters={showMobileFilters}
          onFilterChange={handleFilterChange}
          onMobileFiltersToggle={setShowMobileFilters}
          onResetFilters={resetFilters}
        />
        
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {type === 'athletes' ? (
              mockAthletes.map(athlete => (
                <AthleteCard key={athlete.id} athlete={athlete} />
              ))
            ) : (
              mockColleges.map(college => (
                <CollegeCard key={college.id} college={college} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
