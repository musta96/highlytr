
export interface Stat {
  id: string;
  category: string;
  label: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
}
