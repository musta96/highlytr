
import { ProfileData } from '@/types/profile';

export interface PerformanceStatsProps {
  profile: ProfileData & { setProfile?: (updateFn: (prev: any) => any) => void };
  isEditing: boolean;
}

export interface StatDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStat: (stat: AddStatData) => void;
  primarySport?: string;
  primaryPosition?: string;
}

export interface AddStatData {
  label: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  details?: StatDetailItem[];
}

export interface AddStatFormData {
  label: string;
  value: string | number;
  change: string;
  isPositive: boolean;
}

export interface StatDetailItem {
  id: number;
  date: string;
  value: string | number;
  notes: string;
}

export interface StatsTabsProps {
  stats: Record<string, any>;
  isEditing: boolean;
  onUpdate: (key: string, newValue: any) => void;
  onAddStat: () => void;
}

export interface StatsHeaderProps {
  isEditing: boolean;
  onAddStat: () => void;
}
