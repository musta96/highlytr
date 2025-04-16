
import React from 'react';
import Layout from '@/components/layout/Layout';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';

const Analytics = () => {
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Recruitment Analytics</h1>
        <AnalyticsDashboard />
      </div>
    </Layout>
  );
};

export default Analytics;
