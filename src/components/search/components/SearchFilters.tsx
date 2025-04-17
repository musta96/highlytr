
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Filter, X } from 'lucide-react';
import { SearchType, Filters } from '../types';
import { usStates, sportOptions } from '../constants';

interface SearchFiltersProps {
  type: SearchType;
  filters: Filters;
  showMobileFilters: boolean;
  onFilterChange: (key: keyof Filters, value: any) => void;
  onMobileFiltersToggle: (show: boolean) => void;
  onResetFilters: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  type,
  filters,
  showMobileFilters,
  onFilterChange,
  onMobileFiltersToggle,
  onResetFilters,
}) => {
  return (
    <>
      <div className="hidden md:block">
        <div className="bg-white rounded-lg border p-6 sticky top-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold text-lg">Filters</h2>
            <Button variant="ghost" size="sm" onClick={onResetFilters}>
              Reset
            </Button>
          </div>

          <Accordion type="multiple" defaultValue={["sport", "location", "academic"]}>
            {/* Sport Filter */}
            <AccordionItem value="sport">
              <AccordionTrigger>Sport</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="sport">Sport</Label>
                    <Select 
                      value={filters.sport} 
                      onValueChange={(value) => onFilterChange('sport', value)}
                    >
                      <SelectTrigger id="sport">
                        <SelectValue placeholder="Select sport" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Sport</SelectItem>
                        {sportOptions.map(sport => (
                          <SelectItem key={sport} value={sport}>{sport}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Location Filter */}
            <AccordionItem value="location">
              <AccordionTrigger>Location</AccordionTrigger>
              <AccordionContent>
                <div>
                  <Label htmlFor="location">State</Label>
                  <Select 
                    value={filters.countryOrState} 
                    onValueChange={(value) => onFilterChange('countryOrState', value)}
                  >
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any State</SelectItem>
                      {usStates.map((state) => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </AccordionContent>
            </AccordionItem>

            {type === 'athletes' && (
              <AccordionItem value="academic">
                <AccordionTrigger>Academic</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label>GPA (Min: {filters.gpaMin.toFixed(1)})</Label>
                      </div>
                      <Slider
                        defaultValue={[filters.gpaMin]}
                        min={2.0}
                        max={4.0}
                        step={0.1}
                        onValueChange={(value) => onFilterChange('gpaMin', value[0])}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}

            {type === 'colleges' && (
              <>
                <AccordionItem value="division">
                  <AccordionTrigger>Division Level</AccordionTrigger>
                  <AccordionContent>
                    <Select 
                      value={filters.divisionLevel} 
                      onValueChange={(value) => onFilterChange('divisionLevel', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select division" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Division</SelectItem>
                        <SelectItem value="NCAA Division I">NCAA Division I</SelectItem>
                        <SelectItem value="NCAA Division II">NCAA Division II</SelectItem>
                        <SelectItem value="NCAA Division III">NCAA Division III</SelectItem>
                      </SelectContent>
                    </Select>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="scholarships">
                  <AccordionTrigger>Scholarships</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={filters.hasScholarship}
                        onCheckedChange={(checked) => onFilterChange('hasScholarship', checked)}
                      />
                      <Label>Offers Scholarships</Label>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </>
            )}
          </Accordion>
        </div>
      </div>

      {/* Mobile Filters */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 bg-black/50 md:hidden">
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white p-6 overflow-y-auto animate-slide-in-right">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-semibold text-lg">Filters</h2>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => onMobileFiltersToggle(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <Accordion type="multiple" defaultValue={['sport']}>
              {/* Same content as desktop filters */}
            </Accordion>
            
            <div className="flex gap-4 mt-8">
              <Button variant="outline" className="flex-1" onClick={onResetFilters}>
                Reset
              </Button>
              <Button className="flex-1" onClick={() => onMobileFiltersToggle(false)}>
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchFilters;
