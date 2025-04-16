
import { supabase } from '@/integrations/supabase/client';
import { ProfileData } from '@/types/profile';

export interface Athlete extends ProfileData {
  stats?: {
    gpa: number;
    goals?: number;
    assists?: number;
    cleanSheets?: number;
    savePercentage?: number;
  };
  image?: string;
  video?: string;
}

// Mock data helper
export const getMockAthletes = (): Athlete[] => [
  {
    id: '1',
    first_name: 'Marco',
    last_name: 'Rossi',
    primary_sport: 'Soccer',
    primary_position: 'Forward',
    secondary_sport: null,
    secondary_position: null,
    date_of_birth: '2007-04-12',
    place_of_birth: 'Milan, Italy',
    citizenship: 'Italian',
    profile_completed: true,
    account_type: 'athlete',
    stats: {
      gpa: 3.8,
      goals: 25,
      assists: 12
    },
    image: 'https://images.unsplash.com/photo-1606131731446-5568d87113aa',
    video: 'https://example.com/video1'
  },
  {
    id: '2',
    first_name: 'Sofia',
    last_name: 'Bianchi',
    primary_sport: 'Soccer',
    primary_position: 'Midfielder',
    secondary_sport: null,
    secondary_position: null,
    date_of_birth: '2008-03-15',
    place_of_birth: 'Rome, Italy',
    citizenship: 'Italian',
    profile_completed: true,
    account_type: 'athlete',
    stats: {
      gpa: 3.9,
      goals: 15,
      assists: 22
    },
    image: 'https://images.unsplash.com/photo-1591117207239-788bf8de6c3b',
    video: 'https://example.com/video2'
  },
  {
    id: '3',
    first_name: 'Luca',
    last_name: 'Ferrari',
    primary_sport: 'Soccer',
    primary_position: 'Goalkeeper',
    secondary_sport: null,
    secondary_position: null,
    date_of_birth: '2006-10-20',
    place_of_birth: 'Naples, Italy',
    citizenship: 'Italian',
    profile_completed: true,
    account_type: 'athlete',
    stats: {
      gpa: 3.6,
      cleanSheets: 12,
      savePercentage: 87
    },
    image: 'https://images.unsplash.com/photo-1625631976793-a9f11bbb0738',
    video: 'https://example.com/video3'
  },
  {
    id: '4',
    first_name: 'Giuseppe',
    last_name: 'Romano',
    primary_sport: 'Soccer',
    primary_position: 'Defender',
    secondary_sport: null,
    secondary_position: null,
    date_of_birth: '2007-07-08',
    place_of_birth: 'Florence, Italy',
    citizenship: 'Italian',
    profile_completed: true,
    account_type: 'athlete',
    stats: {
      gpa: 3.5,
      goals: 5,
      assists: 3
    },
    image: 'https://images.unsplash.com/photo-1539701938214-0d9736e1c16b',
    video: 'https://example.com/video4'
  },
  {
    id: '5',
    first_name: 'Elena',
    last_name: 'Moretti',
    primary_sport: 'Soccer',
    primary_position: 'Forward',
    secondary_sport: null,
    secondary_position: null,
    date_of_birth: '2009-01-30',
    place_of_birth: 'Turin, Italy',
    citizenship: 'Italian',
    profile_completed: true,
    account_type: 'athlete',
    stats: {
      gpa: 4.0,
      goals: 18,
      assists: 7
    },
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f',
    video: 'https://example.com/video5'
  },
  {
    id: '6',
    first_name: 'Antonio',
    last_name: 'Esposito',
    primary_sport: 'Soccer',
    primary_position: 'Midfielder',
    secondary_sport: null,
    secondary_position: null,
    date_of_birth: '2006-05-15',
    place_of_birth: 'Palermo, Italy',
    citizenship: 'Italian',
    profile_completed: true,
    account_type: 'athlete',
    stats: {
      gpa: 3.7,
      goals: 10,
      assists: 15
    },
    image: 'https://images.unsplash.com/photo-1513090690262-31f025305e91',
    video: 'https://example.com/video6'
  }
];

// In a real app, this would fetch data from the backend
export const searchAthletes = async (query: string, filters: any): Promise<Athlete[]> => {
  // For demo purposes, we're using the mock data
  // In a real app, this would be a call to a backend API
  
  console.log('Search query:', query);
  console.log('Filters:', filters);
  
  const athletes = getMockAthletes();
  
  // Filter athletes based on search query and filters
  return athletes.filter(athlete => {
    const fullName = `${athlete.first_name} ${athlete.last_name}`.toLowerCase();
    const searchMatches = !query || fullName.includes(query.toLowerCase());
    
    // Apply filters
    const sportMatches = !filters.sport || athlete.primary_sport?.toLowerCase() === filters.sport.toLowerCase();
    const positionMatches = !filters.position || athlete.primary_position?.toLowerCase() === filters.position.toLowerCase();
    
    // Calculate age from date_of_birth
    let age = 0;
    if (athlete.date_of_birth) {
      const dob = new Date(athlete.date_of_birth);
      const today = new Date();
      age = today.getFullYear() - dob.getFullYear();
      
      // Adjust age if birthday hasn't occurred yet this year
      if (
        today.getMonth() < dob.getMonth() || 
        (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
      ) {
        age--;
      }
    }
    
    const ageMatches = age >= filters.ageRange[0] && age <= filters.ageRange[1];
    const gpaMatches = !athlete.stats?.gpa || athlete.stats.gpa >= filters.gpaMin;
    
    // Location is from place_of_birth which is "City, Country"
    const location = athlete.place_of_birth?.split(',')[1]?.trim().toLowerCase();
    const locationMatches = !filters.location || 
      (location && location === filters.location.toLowerCase());
    
    // We don't have gender in our mock data, so skipping that filter
    
    return searchMatches && sportMatches && positionMatches && 
      ageMatches && gpaMatches && locationMatches;
  });
};
