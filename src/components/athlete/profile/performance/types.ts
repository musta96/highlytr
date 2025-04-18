
import { ProfileData } from '@/types/profile';

export interface PerformanceStatsProps {
  profile: ProfileData;
  isEditing: boolean;
}

export interface StatCardProps {
  title: string;
  stats: Record<string, any>;
  isEditing: boolean;
  onAddStat: () => void;
}

export interface StatDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStat: (data: AddStatFormData) => void;
  primarySport?: string;
  primaryPosition?: string;
}

export interface AddStatFormData {
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
}

export interface Stat {
  id: string;
  category: string;
  label: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
}
