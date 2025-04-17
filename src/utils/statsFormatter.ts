
export const formatStatValue = (value: number | string): string => {
  if (typeof value === 'number') {
    // Format percentages
    if (value > 0 && value <= 1) {
      return `${(value * 100).toFixed(1)}%`;
    }
    // Format large numbers
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
  }
  return String(value);
};

export const getStatColor = (value: number): string => {
  if (value > 80) return 'text-green-500';
  if (value > 60) return 'text-blue-500';
  if (value > 40) return 'text-yellow-500';
  return 'text-gray-500';
};
