
export const formatStatValue = (value: number | string): string => {
  if (typeof value === 'number') {
    // Format percentages
    if (value > 0 && value <= 1) {
      return `${(value * 100).toFixed(1)}%`;
    }
    // Format large numbers (thousands)
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    // Format decimal numbers
    if (value % 1 !== 0) {
      return value.toFixed(1);
    }
  }
  return String(value);
};

export const getStatColor = (value: number | string): string => {
  // If value is not a number, return neutral color
  if (typeof value !== 'number') {
    return 'text-gray-700';
  }
  
  // For percentages (values between 0 and 1)
  if (value > 0 && value <= 1) {
    value = value * 100;
  }
  
  if (value > 80) return 'text-green-500';
  if (value > 60) return 'text-blue-500';
  if (value > 40) return 'text-yellow-500';
  if (value <= 40 && value >= 0) return 'text-gray-500';
  
  // For negative values (like +/- stat in basketball)
  if (value < 0) return 'text-red-500';
  
  // Default
  return 'text-gray-700';
};

// Function to determine unit display for a stat
export const getStatUnit = (statType: string): string => {
  const statUnits: Record<string, string> = {
    'height': 'in',
    'weight': 'lbs',
    'wingspan': 'in',
    'vertical_jump': 'in',
    'speed_40yd': 's',
    'bench_press': 'lbs',
    'squat': 'lbs',
    'deadlift': 'lbs',
  };
  
  return statUnits[statType] || '';
};
