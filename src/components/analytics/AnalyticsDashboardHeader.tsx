
import React from 'react';
import DateRangeSelector from './DateRangeSelector';

interface AnalyticsDashboardHeaderProps {
  dateRange: '7d' | '30d' | '90d' | '1y';
  setDateRange: (range: '7d' | '30d' | '90d' | '1y') => void;
}

const AnalyticsDashboardHeader = ({ 
  dateRange, 
  setDateRange 
}: AnalyticsDashboardHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <p className="text-muted-foreground">Track your recruitment progress and engagement</p>
      </div>
      
      <DateRangeSelector dateRange={dateRange} setDateRange={setDateRange} />
    </div>
  );
};

export default AnalyticsDashboardHeader;
