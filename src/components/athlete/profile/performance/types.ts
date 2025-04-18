
import { StatDefinition } from '@/utils/sportsStatsData';
import { ProfileData } from '@/types/profile';

export interface PerformanceStatsProps {
  profile: ProfileData;
  isEditing: boolean;
}

export interface AddStatFormData {
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
}

export interface StatDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStat: (data: AddStatFormData) => void;
  primarySport?: string;
  primaryPosition?: string;
}
