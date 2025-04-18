
import { ProfileData } from '@/types/profile';

export interface PerformanceStatsProps {
  profile: ProfileData;
  isEditing: boolean;
}

export interface CompetitionStat {
  competition: string;
  logo?: string;
  appearances: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  minutesPlayed: number;
}

export interface StatTableProps {
  stats: CompetitionStat[];
  isEditing: boolean;
}
