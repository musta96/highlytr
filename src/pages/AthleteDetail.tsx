
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import AthleteProfile from '@/components/athlete/AthleteProfile';

const AthleteDetail = () => {
  const { id } = useParams();
  
  return (
    <Layout>
      <div className="container py-8">
        <AthleteProfile athleteId={id} />
      </div>
    </Layout>
  );
};

export default AthleteDetail;
