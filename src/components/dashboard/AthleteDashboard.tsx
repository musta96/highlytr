import React from 'react';
import WelcomeHeader from './cards/WelcomeHeader';
import DetailedProfileCompletionCard from './cards/DetailedProfileCompletionCard';
import EnhancedStatsCard from './cards/EnhancedStatsCard';
import RecommendedCollegesCard from './cards/RecommendedCollegesCard';
import ProgressCard from './cards/ProgressCard';
import { motion } from 'framer-motion';

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={container}
      className="space-y-6 px-4 md:px-6 py-6 max-w-7xl mx-auto"
    >
      <motion.div variants={item}>
        <WelcomeHeader />
      </motion.div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <motion.div variants={item} className="col-span-full lg:col-span-1">
          <ProgressCard 
            badges={badges} 
            className="hover-card glass-effect h-full"
          />
        </motion.div>
        
        <motion.div variants={item} className="col-span-full md:col-span-1">
          <DetailedProfileCompletionCard 
            className="hover-card glass-effect h-full"
          />
        </motion.div>
        
        <motion.div variants={item} className="col-span-full md:col-span-1">
          <EnhancedStatsCard 
            className="hover-card glass-effect h-full"
          />
        </motion.div>
      </div>
      
      <motion.div variants={item}>
        <RecommendedCollegesCard />
      </motion.div>
    </motion.div>
  );
};

export default AthleteDashboard;
