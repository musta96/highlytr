
import React, { useState } from 'react';
import AnalyticsDashboardHeader from './AnalyticsDashboardHeader';
import AnalyticsTabs from './AnalyticsTabs';

const AnalyticsDashboard = () => {
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  
  return (
    <div className="space-y-6">
      <AnalyticsDashboardHeader dateRange={dateRange} setDateRange={setDateRange} />
      <AnalyticsTabs dateRange={dateRange} />
    </div>
  );
};

export default AnalyticsDashboard;
