
import { ProfileData } from '@/types/profile';

export interface HighlightVideo {
  id: string;
  title: string;
  description?: string;
  thumbnail: string;
  videoUrl: string;
  source: 'upload' | 'youtube';
  uploadDate: string;
  isPlaying?: boolean; // Add this to track play state for lazy loading
}

export interface AthleteProfileData extends ProfileData {
  isPublic: boolean;
  bio: string;
  avatar_url?: string | null; // Added this field that's in the Supabase profile
  achievements: string[];
  physicalAttributes: {
    height: string;
    weight: string;
    wingspan?: string;
    verticalJump?: string;
    speed40yd?: string;
    dominantFoot?: 'Left' | 'Right' | 'Both';
  };
  education: {
    school: string;
    graduationYear: number;
    gpa: number;
    testScores?: {
      sat?: number;
      act?: number;
      toefl?: number;
      ielts?: number;
    };
  };
  stats: {
    [key: string]: {
      value: number;
      label: string;
    };
  };
  highlights: HighlightVideo[];
}

// Optimized mock data with lighter thumbnail references
export const mockAthleteProfile: AthleteProfileData = {
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
  isPublic: true,
  bio: "I've been playing soccer since I was 5 years old. My passion for the game started when my father took me to see AC Milan play. Since then, I've been dedicated to improving my skills and reaching the highest level possible.",
  achievements: [
    'Team MVP 2023',
    'Regional Championship Winner 2022',
    'All-State Team Selection 2023',
    'Top Scorer in League (23 goals)',
    'Team Captain 2022-2023'
  ],
  physicalAttributes: {
    height: '6\'2"',
    weight: '175 lbs',
    wingspan: '6\'3"',
    verticalJump: '28 inches',
    speed40yd: '4.7s',
    dominantFoot: 'Right'
  },
  education: {
    school: 'Milan International High School',
    graduationYear: 2025,
    gpa: 3.8,
    testScores: {
      sat: 1350,
      toefl: 105
    }
  },
  stats: {
    goals: {
      value: 25,
      label: 'Goals'
    },
    assists: {
      value: 12,
      label: 'Assists'
    },
    gamesPlayed: {
      value: 34,
      label: 'Games'
    },
    minutesPlayed: {
      value: 2856,
      label: 'Minutes'
    },
    yellowCards: {
      value: 5,
      label: 'Yellow Cards'
    },
    redCards: {
      value: 1,
      label: 'Red Cards'
    }
  },
  highlights: [
    {
      id: '1',
      title: 'Game Winner vs. Rivals',
      description: 'Scored the winning goal in the last minute of the championship game.',
      thumbnail: 'https://images.unsplash.com/photo-1631194758628-71ec7c35137e?q=80&w=800&auto=format',
      videoUrl: 'https://youtu.be/DGe2uaq8xYo',
      source: 'youtube',
      uploadDate: '2023-05-15T14:30:00Z'
    },
    {
      id: '2',
      title: 'Season Highlights',
      description: 'A compilation of my best moments from the 2022-2023 season.',
      thumbnail: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=800&auto=format',
      videoUrl: 'https://youtu.be/DGe2uaq8xYo',
      source: 'youtube',
      uploadDate: '2023-04-02T10:15:00Z'
    },
    {
      id: '3',
      title: 'Skills Demo',
      description: 'Technical skills showcase including dribbling, shooting, and free kicks.',
      thumbnail: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=800&auto=format',
      videoUrl: 'https://youtu.be/DGe2uaq8xYo', 
      source: 'youtube',
      uploadDate: '2023-02-28T09:45:00Z'
    }
  ]
};
