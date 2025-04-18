
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StatTable } from './StatTable';
import { PerformanceStatsProps } from './types';

const PerformanceStats = ({ profile, isEditing }: PerformanceStatsProps) => {
  const [selectedSeason, setSelectedSeason] = useState('23/24');

  // For demo purposes - in real app this would come from the profile data
  const demoStats = [
    {
      competition: 'Premier League',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Premier_League_Logo.svg/1200px-Premier_League_Logo.svg.png',
      appearances: 32,
      goals: 2,
      assists: 1,
      yellowCards: 3,
      redCards: 0,
      minutesPlayed: 2880
    },
    {
      competition: 'Champions League',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/UEFA_Champions_League_logo_2.svg/1200px-UEFA_Champions_League_logo_2.svg.png',
      appearances: 9,
      goals: 1,
      assists: 0,
      yellowCards: 2,
      redCards: 0,
      minutesPlayed: 840
    },
    {
      competition: 'EFL Cup',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/EFL_Cup_Logo.svg/1200px-EFL_Cup_Logo.svg.png',
      appearances: 3,
      goals: 1,
      assists: 0,
      yellowCards: 0,
      redCards: 0,
      minutesPlayed: 267
    }
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">Performance Statistics</CardTitle>
          <Select value={selectedSeason} onValueChange={setSelectedSeason}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Season" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="23/24">23/24</SelectItem>
              <SelectItem value="22/23">22/23</SelectItem>
              <SelectItem value="21/22">21/22</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <StatTable stats={demoStats} />
      </CardContent>
    </Card>
  );
};

export default PerformanceStats;
