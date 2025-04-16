
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface HelpHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearchSubmit: (e: React.FormEvent) => void;
}

const HelpHeader = ({ searchQuery, setSearchQuery, handleSearchSubmit }: HelpHeaderProps) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Help Center</h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
        Find answers to common questions and learn how to get the most out of HighLytr
      </p>
      
      <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <Input 
          placeholder="Search for help articles..." 
          className="pl-10" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button type="submit" className="absolute right-0 top-0 rounded-l-none">
          Search
        </Button>
      </form>
    </div>
  );
};

export default HelpHeader;
