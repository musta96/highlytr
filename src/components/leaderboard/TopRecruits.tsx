
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trophy, 
  Medal, 
  Share2, 
  ChevronRight, 
  Filter,
  Star,
  TrendingUp 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Types for our athlete and leaderboard data
type Sport = 'Soccer' | 'Basketball' | 'Baseball' | 'Swimming' | 'Volleyball' | 'Tennis' | 'Track' | 'Football' | 'Hockey';
type Region = 'Global' | 'North America' | 'Europe' | 'South America' | 'Asia' | 'Africa' | 'Oceania';

interface AthleteLeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  profilePic?: string;
  sport: Sport;
  region: Region;
  score: number;
  badges: Array<'rising-star' | 'top-scouted' | 'all-star'>;
  change?: number; // Position change since last period (positive = improved rank)
}

interface TopRecruitsProps {
  className?: string;
}

// Mock data for our leaderboard
const mockAthletes: AthleteLeaderboardEntry[] = [
  {
    id: '1',
    rank: 1,
    name: 'Maria Rodriguez',
    sport: 'Soccer',
    region: 'South America',
    score: 287,
    badges: ['all-star'],
    profilePic: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    change: 2
  },
  {
    id: '2',
    rank: 2,
    name: 'James Johnson',
    sport: 'Basketball',
    region: 'North America',
    score: 274,
    badges: ['rising-star', 'top-scouted'],
    profilePic: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    change: -1
  },
  {
    id: '3',
    rank: 3,
    name: 'Liam Chen',
    sport: 'Swimming',
    region: 'Asia',
    score: 256,
    badges: ['all-star'],
    profilePic: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    change: 1
  },
  {
    id: '4',
    rank: 4,
    name: 'Sophia Kim',
    sport: 'Tennis',
    region: 'Asia',
    score: 241,
    badges: ['top-scouted'],
    profilePic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    change: 3
  },
  {
    id: '5',
    rank: 5,
    name: 'Alexander Volkov',
    sport: 'Hockey',
    region: 'Europe',
    score: 229,
    badges: ['rising-star'],
    profilePic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    change: 0
  },
  {
    id: '6',
    rank: 6,
    name: 'Emma Williams',
    sport: 'Volleyball',
    region: 'North America',
    score: 215,
    badges: [],
    profilePic: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e',
    change: -2
  },
  {
    id: '7',
    rank: 7,
    name: 'Alejandro Gomez',
    sport: 'Soccer',
    region: 'South America',
    score: 203,
    badges: ['rising-star'],
    profilePic: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6',
    change: 5
  },
  {
    id: '8',
    rank: 8,
    name: 'Sarah Johnson',
    sport: 'Track',
    region: 'North America',
    score: 198,
    badges: [],
    profilePic: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    change: -3
  },
  {
    id: '9',
    rank: 9,
    name: 'David Thompson',
    sport: 'Football',
    region: 'North America',
    score: 189,
    badges: [],
    profilePic: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6',
    change: 1
  },
  {
    id: '10',
    rank: 10,
    name: 'Isabella Martinez',
    sport: 'Basketball',
    region: 'North America',
    score: 176,
    badges: ['rising-star'],
    change: 4
  },
];

// Filter options
const sportOptions: Sport[] = ['Soccer', 'Basketball', 'Baseball', 'Swimming', 'Volleyball', 'Tennis', 'Track', 'Football', 'Hockey'];
const regionOptions: Region[] = ['Global', 'North America', 'Europe', 'South America', 'Asia', 'Africa', 'Oceania'];

const TopRecruits: React.FC<TopRecruitsProps> = ({ className }) => {
  const [activeSport, setActiveSport] = useState<Sport | 'All'>('All');
  const [activeRegion, setActiveRegion] = useState<Region>('Global');
  
  // Filter the athletes based on the selected sport and region
  const filteredAthletes = mockAthletes.filter(athlete => 
    (activeSport === 'All' || athlete.sport === activeSport) &&
    (activeRegion === 'Global' || athlete.region === activeRegion)
  );

  // Function to render the appropriate badge icon
  const renderBadgeIcon = (badge: 'rising-star' | 'top-scouted' | 'all-star') => {
    switch (badge) {
      case 'rising-star':
        return <TrendingUp className="h-4 w-4 text-highlyt-blue" />;
      case 'top-scouted':
        return <Star className="h-4 w-4 text-amber-500" />;
      case 'all-star':
        return <Medal className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  // Function to render the badge tooltip text
  const getBadgeTooltip = (badge: 'rising-star' | 'top-scouted' | 'all-star') => {
    switch (badge) {
      case 'rising-star':
        return 'Rising Star: Climbed 5+ ranks in a week';
      case 'top-scouted':
        return 'Top Scouted: Saved by 3+ coaches in 7 days';
      case 'all-star':
        return 'All-Star: Top 3 in monthly rankings';
      default:
        return '';
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <Trophy className="h-6 w-6 text-highlyt-blue mr-2" />
          <h2 className="text-2xl font-bold">Top Recruits of the Month</h2>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Select value={activeSport} onValueChange={(value) => setActiveSport(value as Sport | 'All')}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Sport" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Sports</SelectItem>
              {sportOptions.map(sport => (
                <SelectItem key={sport} value={sport}>{sport}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={activeRegion} onValueChange={(value) => setActiveRegion(value as Region)}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              {regionOptions.map(region => (
                <SelectItem key={region} value={region}>{region}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="pb-2 w-12 text-gray-500">Rank</th>
              <th className="pb-2 text-gray-500">Athlete</th>
              <th className="pb-2 text-gray-500 hidden md:table-cell">Sport</th>
              <th className="pb-2 text-gray-500 hidden md:table-cell">Region</th>
              <th className="pb-2 text-gray-500 text-right">Score</th>
              <th className="pb-2 w-16"></th>
            </tr>
          </thead>
          <tbody>
            {filteredAthletes.length > 0 ? (
              filteredAthletes.map(athlete => (
                <tr key={athlete.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 relative">
                    <span className={`font-bold ${
                      athlete.rank === 1 ? 'text-yellow-500' : 
                      athlete.rank === 2 ? 'text-gray-400' : 
                      athlete.rank === 3 ? 'text-amber-700' : 'text-gray-700'
                    }`}>
                      {athlete.rank}
                    </span>
                    {athlete.change !== undefined && athlete.change !== 0 && (
                      <span className={`text-xs ml-1 ${
                        athlete.change > 0 ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {athlete.change > 0 ? '+' : ''}{athlete.change}
                      </span>
                    )}
                  </td>
                  <td className="py-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 mr-3 rounded-full overflow-hidden bg-gray-200">
                        {athlete.profilePic ? (
                          <img src={athlete.profilePic} alt={athlete.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-500">
                            {athlete.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{athlete.name}</div>
                        <div className="flex gap-1 mt-1">
                          {athlete.badges.map((badge, index) => (
                            <span 
                              key={index}
                              className="inline-flex items-center" 
                              title={getBadgeTooltip(badge)}
                            >
                              {renderBadgeIcon(badge)}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 hidden md:table-cell">{athlete.sport}</td>
                  <td className="py-3 hidden md:table-cell">{athlete.region}</td>
                  <td className="py-3 text-right font-medium">{athlete.score}</td>
                  <td className="py-3 text-right">
                    <Link to={`/athletes/${athlete.id}`} className="text-highlyt-blue hover:underline flex items-center justify-end">
                      <span className="text-sm">View</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-6 text-center text-gray-500">
                  No athletes match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="text-sm text-gray-500 mb-3 sm:mb-0">
          Rankings updated: April 15, 2025
        </div>
        <Link to="/leaderboard">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <span>View Full Leaderboard</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TopRecruits;
