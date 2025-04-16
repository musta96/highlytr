
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface FilterBadgesProps {
  selectedFilters: string[];
  removeFilter: (filter: string) => void;
  clearAllFilters: () => void;
}

const FilterBadges = ({ selectedFilters, removeFilter, clearAllFilters }: FilterBadgesProps) => {
  if (selectedFilters.length === 0) return null;
  
  return (
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
      <button
        onClick={clearAllFilters}
        className="text-xs text-gray-500 hover:text-gray-700"
      >
        Clear all
      </button>
    </div>
  );
};

export default FilterBadges;
