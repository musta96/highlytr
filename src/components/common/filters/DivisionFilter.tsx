
import React from 'react';
import FilterCategory from './FilterCategory';

const DivisionFilter = () => {
  return (
    <FilterCategory title="Division" value="division">
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
    </FilterCategory>
  );
};

export default DivisionFilter;
