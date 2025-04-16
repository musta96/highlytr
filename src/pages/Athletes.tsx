
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import AthleteCard from '@/components/athlete/AthleteCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import AthleteFilters from '@/components/athlete/AthleteFilters';
import { Athlete, searchAthletes } from '@/services/athleteService';
import { Loader2 } from 'lucide-react';

const Athletes = () => {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [filteredAthletes, setFilteredAthletes] = useState<Athlete[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    sport: '',
    position: '',
    ageRange: [14, 19],
    gpaMin: 3.0,
    location: '',
    gender: '',
    sortBy: 'name'
  });
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        setLoading(true);
        const data = await searchAthletes(searchQuery, filters);
        setAthletes(data);
        applyFiltersAndSort(data);
      } catch (error) {
        console.error('Error fetching athletes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAthletes();
  }, [searchQuery, filters]);

  const applyFiltersAndSort = (data: Athlete[]) => {
    let result = [...data];
    
    // Apply sorting
    switch(filters.sortBy) {
      case 'name':
        result.sort((a, b) => 
          `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`)
        );
        break;
      case 'age':
        result.sort((a, b) => {
          const dateA = a.date_of_birth ? new Date(a.date_of_birth) : new Date();
          const dateB = b.date_of_birth ? new Date(b.date_of_birth) : new Date();
          return dateA.getTime() - dateB.getTime(); // Younger first
        });
        break;
      case 'gpa':
        result.sort((a, b) => 
          (b.stats?.gpa || 0) - (a.stats?.gpa || 0)
        );
        break;
      case 'location':
        result.sort((a, b) => 
          (a.place_of_birth || '').localeCompare(b.place_of_birth || '')
        );
        break;
      default:
        break;
    }
    
    setFilteredAthletes(result);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 6, filteredAthletes.length));
  };

  return (
    <Layout>
      <div className="container py-8">
        <AthleteFilters 
          onSearch={handleSearch} 
          onFilterChange={handleFilterChange} 
        />
        
        <div className="mt-8">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-highlyt-blue" />
            </div>
          ) : filteredAthletes.length === 0 ? (
            <div className="bg-white rounded-lg p-8 text-center border">
              <h3 className="text-lg font-medium mb-2">No athletes found</h3>
              <p className="text-gray-500">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {filteredAthletes.slice(0, visibleCount).map(athlete => (
                  <AthleteCard 
                    key={athlete.id} 
                    athlete={{
                      id: Number(athlete.id),
                      name: `${athlete.first_name} ${athlete.last_name}`,
                      sport: athlete.primary_sport || 'Unknown Sport',
                      position: athlete.primary_position || 'Unknown Position',
                      age: calculateAge(athlete.date_of_birth),
                      location: athlete.place_of_birth || 'Unknown',
                      image: athlete.image || 'https://images.unsplash.com/photo-1606131731446-5568d87113aa',
                      video: athlete.video || 'https://example.com/video',
                      stats: athlete.stats || { gpa: 0 }
                    }} 
                  />
                ))}
              </div>
              
              {visibleCount < filteredAthletes.length && (
                <div className="mt-8 text-center">
                  <Button variant="outline" onClick={loadMore}>
                    Load More Athletes
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

// Helper function to calculate age from date of birth
const calculateAge = (dateOfBirth: string | null): number => {
  if (!dateOfBirth) return 0;
  
  const dob = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  
  if (
    today.getMonth() < dob.getMonth() || 
    (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
  ) {
    age--;
  }
  
  return age;
};

export default Athletes;
