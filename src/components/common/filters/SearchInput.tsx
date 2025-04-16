
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchInputProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const SearchInput = ({ searchQuery, onSearchChange, placeholder }: SearchInputProps) => {
  return (
    <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
      <Input 
        type="search" 
        placeholder={placeholder}
        className="pl-9"
        value={searchQuery}
        onChange={onSearchChange}
      />
    </div>
  );
};

export default SearchInput;
