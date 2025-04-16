
import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturedAthletes from '@/components/home/FeaturedAthletes';
import HowItWorks from '@/components/home/HowItWorks';
import Testimonials from '@/components/home/Testimonials';
import CTASection from '@/components/home/CTASection';
import FeaturedColleges from '@/components/home/FeaturedColleges';
import TopRecruits from '@/components/leaderboard/TopRecruits';

const LandingPage = () => {
  return (
    <Layout>
      <HeroSection />
      
      {/* Top Recruits Leaderboard */}
      <div className="container py-12">
        <TopRecruits />
      </div>
      
      <div className="bg-gray-50">
        <div className="container py-16">
          <FeaturedAthletes />
        </div>
      </div>
      
      <div className="container py-16">
        <HowItWorks />
      </div>
      
      <div className="bg-gray-50">
        <div className="container py-16">
          <FeaturedColleges />
        </div>
      </div>
      
      <div className="container py-16">
        <Testimonials />
      </div>
      
      <CTASection />
    </Layout>
  );
};

export default LandingPage;
