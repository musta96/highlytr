
import React from 'react';
import Layout from '@/components/layout/Layout';
import SearchFilters from '@/components/common/SearchFilters';
import AthleteCard from '@/components/athlete/AthleteCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const athleteData = [
  {
    id: 1,
    name: 'Marco Rossi',
    sport: 'Soccer',
    position: 'Forward',
    age: 18,
    location: 'Milan, Italy',
    image: 'https://images.unsplash.com/photo-1606131731446-5568d87113aa',
    video: 'https://example.com/video1',
    stats: {
      gpa: 3.8,
      goals: 25,
      assists: 12
    }
  },
  {
    id: 2,
    name: 'Sofia Bianchi',
    sport: 'Soccer',
    position: 'Midfielder',
    age: 17,
    location: 'Rome, Italy',
    image: 'https://images.unsplash.com/photo-1591117207239-788bf8de6c3b',
    video: 'https://example.com/video2',
    stats: {
      gpa: 3.9,
      goals: 15,
      assists: 22
    }
  },
  {
    id: 3,
    name: 'Luca Ferrari',
    sport: 'Soccer',
    position: 'Goalkeeper',
    age: 19,
    location: 'Naples, Italy',
    image: 'https://images.unsplash.com/photo-1625631976793-a9f11bbb0738',
    video: 'https://example.com/video3',
    stats: {
      gpa: 3.6,
      cleanSheets: 12,
      savePercentage: 87
    }
  },
  {
    id: 4,
    name: 'Giuseppe Romano',
    sport: 'Soccer',
    position: 'Defender',
    age: 18,
    location: 'Florence, Italy',
    image: 'https://images.unsplash.com/photo-1539701938214-0d9736e1c16b',
    video: 'https://example.com/video4',
    stats: {
      gpa: 3.5,
      goals: 5,
      assists: 3
    }
  },
  {
    id: 5,
    name: 'Elena Moretti',
    sport: 'Soccer',
    position: 'Forward',
    age: 16,
    location: 'Turin, Italy',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f',
    video: 'https://example.com/video5',
    stats: {
      gpa: 4.0,
      goals: 18,
      assists: 7
    }
  },
  {
    id: 6,
    name: 'Antonio Esposito',
    sport: 'Soccer',
    position: 'Midfielder',
    age: 19,
    location: 'Palermo, Italy',
    image: 'https://images.unsplash.com/photo-1513090690262-31f025305e91',
    video: 'https://example.com/video6',
    stats: {
      gpa: 3.7,
      goals: 10,
      assists: 15
    }
  }
];

const Athletes = () => {
  return (
    <Layout>
      <div className="container py-8">
        <SearchFilters userType="college" />
        
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {athleteData.map(athlete => (
              <AthleteCard key={athlete.id} athlete={athlete} />
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Button variant="outline">Load More Athletes</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Athletes;
