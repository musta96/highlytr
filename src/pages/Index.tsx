
import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import HowItWorks from '@/components/home/HowItWorks';
import FeaturedAthletes from '@/components/home/FeaturedAthletes';
import FeaturedColleges from '@/components/home/FeaturedColleges';
import Testimonials from '@/components/home/Testimonials';
import CTASection from '@/components/home/CTASection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <HowItWorks />
      <FeaturedAthletes />
      <FeaturedColleges />
      <Testimonials />
      <CTASection />
    </Layout>
  );
};

export default Index;
