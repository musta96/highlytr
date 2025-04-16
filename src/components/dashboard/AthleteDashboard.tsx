
import React from 'react';
import WelcomeHeader from './cards/WelcomeHeader';
import DetailedProfileCompletionCard from './cards/DetailedProfileCompletionCard';
import StatsOverviewCard from './cards/StatsOverviewCard';
import RecommendedCollegesCard from './cards/RecommendedCollegesCard';

const AthleteDashboard = () => {
  return (
    <div className="space-y-6">
      <WelcomeHeader />
      
      <div className="grid gap-6 md:grid-cols-2">
        <DetailedProfileCompletionCard />
        <StatsOverviewCard />
      </div>
      
      <RecommendedCollegesCard />
    </div>
  );
};

export default AthleteDashboard;
