
import React from 'react';

interface DateRangeSelectorProps {
  dateRange: '7d' | '30d' | '90d' | '1y';
  setDateRange: (range: '7d' | '30d' | '90d' | '1y') => void;
}

const DateRangeSelector = ({ dateRange, setDateRange }: DateRangeSelectorProps) => {
  return (
    <div className="inline-flex items-center rounded-md border border-input bg-background p-1">
      {['7d', '30d', '90d', '1y'].map((range) => (
        <button
          key={range}
          onClick={() => setDateRange(range as '7d' | '30d' | '90d' | '1y')}
          className={`px-3 py-1.5 text-sm transition-colors ${
            dateRange === range
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          } rounded-sm`}
        >
          {range}
        </button>
      ))}
    </div>
  );
};

export default DateRangeSelector;
