
import React from 'react';
import { Button } from '@/components/ui/button';
import FilterCategory from './FilterCategory';

interface SportFilterProps {
  addFilter: (filter: string) => void;
}

const SportFilter = ({ addFilter }: SportFilterProps) => {
  return (
    <FilterCategory title="Sports" value="sport" defaultOpen>
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
        <Button variant="link" size="sm" className="p-0" onClick={() => addFilter('Soccer')}>
          Show more
        </Button>
      </div>
    </FilterCategory>
  );
};

export default SportFilter;
