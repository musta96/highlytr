
import { ProfileData } from '@/types/profile';

export interface PerformanceStatsProps {
  profile: ProfileData & {
    setProfile?: (updateFn: (prev: any) => any) => void;
  };
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
  isEditing?: boolean;
}

// Add missing interfaces for StatDialog component
export interface StatDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStat: (stat: AddStatFormData) => void;
  primarySport?: string | null;
  primaryPosition?: string | null;
}

export interface AddStatFormData {
  label: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
}
