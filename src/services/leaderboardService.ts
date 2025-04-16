
import { useState, useEffect } from 'react';

// Types for our leaderboard data
export type Sport = 'Soccer' | 'Basketball' | 'Baseball' | 'Swimming' | 'Volleyball' | 'Tennis' | 'Track' | 'Football' | 'Hockey';
export type Region = 'Global' | 'North America' | 'Europe' | 'South America' | 'Asia' | 'Africa' | 'Oceania';
export type Badge = 'rising-star' | 'top-scouted' | 'all-star';

export interface AthleteLeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  profilePic?: string;
  sport: Sport;
  region: Region;
  score: number;
  badges: Badge[];
  change?: number; // Position change since last period
}

// This would normally be fetched from an API endpoint
export const useLeaderboardData = (sport?: Sport, region?: Region) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AthleteLeaderboardEntry[]>([]);

  useEffect(() => {
    // Simulate API fetch with a timeout
    setLoading(true);
    
    const timer = setTimeout(() => {
      try {
        // In a real application, this would be an API call
        // For now we're using the mock data directly in the component
        // This service is prepared for future integration with a real backend
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch leaderboard data');
        setLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [sport, region]);

  return { data, loading, error };
};

// Future expansion: Add functions for athlete details, sharing functionality, etc.
export const shareAthleteProfile = (athleteId: string, platform: 'twitter' | 'facebook' | 'instagram') => {
  // This would implement sharing logic based on the platform
  console.log(`Sharing athlete ${athleteId} on ${platform}`);
  
  // Return share URL or success status
  return true;
};
