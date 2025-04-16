
import React from 'react';
import FilterCategory from './FilterCategory';

const ScholarshipsFilter = () => {
  return (
    <FilterCategory title="Scholarships" value="scholarships">
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
    </FilterCategory>
  );
};

export default ScholarshipsFilter;
