
import React from 'react';
import WelcomeHeader from './cards/WelcomeHeader';
import DetailedProfileCompletionCard from './cards/DetailedProfileCompletionCard';
import StatsOverviewCard from './cards/StatsOverviewCard';
import RecommendedCollegesCard from './cards/RecommendedCollegesCard';
import ProgressCard from './cards/ProgressCard';

const AthleteDashboard = () => {
  // Sample badges data
  const badges = [
    { 
      name: 'Profile Master', 
      icon: 'Award', 
      description: 'Completed 100% of your profile' 
    },
    { 
      name: 'Rising Star', 
      icon: 'Star', 
      description: 'Reached level 3 in recruiting journey' 
    }
  ];

  return (
    <div className="space-y-6">
      <WelcomeHeader />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ProgressCard badges={badges} />
        <DetailedProfileCompletionCard />
        <StatsOverviewCard />
      </div>
      
      <RecommendedCollegesCard />
    </div>
  );
};

export default AthleteDashboard;
