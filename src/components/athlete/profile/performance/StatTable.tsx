
import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { CompetitionStat } from './types';

interface StatTableProps {
  stats: CompetitionStat[];
}

export const StatTable = ({ stats }: StatTableProps) => {
  const totalStats = stats.reduce((acc, stat) => ({
    competition: 'Total',
    appearances: acc.appearances + stat.appearances,
    goals: acc.goals + stat.goals,
    assists: acc.assists + stat.assists,
    yellowCards: acc.yellowCards + stat.yellowCards,
    redCards: acc.redCards + stat.redCards,
    minutesPlayed: acc.minutesPlayed + stat.minutesPlayed,
  }), {
    competition: '',
    appearances: 0,
    goals: 0,
    assists: 0,
    yellowCards: 0,
    redCards: 0,
    minutesPlayed: 0,
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Competition</TableHead>
          <TableHead className="text-center">Apps</TableHead>
          <TableHead className="text-center">Goals</TableHead>
          <TableHead className="text-center">Assists</TableHead>
          <TableHead className="text-center">Yellow</TableHead>
          <TableHead className="text-center">Red</TableHead>
          <TableHead className="text-right">Minutes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stats.map((stat, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium flex items-center gap-2">
              {stat.logo && <img src={stat.logo} alt={stat.competition} className="w-6 h-6" />}
              {stat.competition}
            </TableCell>
            <TableCell className="text-center">{stat.appearances}</TableCell>
            <TableCell className="text-center">{stat.goals}</TableCell>
            <TableCell className="text-center">{stat.assists}</TableCell>
            <TableCell className="text-center">{stat.yellowCards}</TableCell>
            <TableCell className="text-center">{stat.redCards}</TableCell>
            <TableCell className="text-right">{stat.minutesPlayed}'</TableCell>
          </TableRow>
        ))}
        <TableRow className="font-bold">
          <TableCell>Total</TableCell>
          <TableCell className="text-center">{totalStats.appearances}</TableCell>
          <TableCell className="text-center">{totalStats.goals}</TableCell>
          <TableCell className="text-center">{totalStats.assists}</TableCell>
          <TableCell className="text-center">{totalStats.yellowCards}</TableCell>
          <TableCell className="text-center">{totalStats.redCards}</TableCell>
          <TableCell className="text-right">{totalStats.minutesPlayed}'</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
