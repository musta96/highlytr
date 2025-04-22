export const formatStatValue = (value: any): string => {
  if (value === undefined || value === null) return '-';
  
  // If already a string, return as is
  if (typeof value === 'string') return value;
  
  // If number, format it
  if (typeof value === 'number') {
    // For percentages
    if (String(value).includes('%') || (value >= 0 && value <= 1 && String(value).includes('.'))) {
      return `${(value * 100).toFixed(1)}%`;
    }
    
    // For large numbers
    if (value >= 1000) {
      return value.toLocaleString();
    }
    
    // For decimals
    if (value % 1 !== 0) {
      return value.toFixed(1);
    }
  }
  
  return String(value);
};

export const getStatColor = (value: any): string => {
  if (value === undefined || value === null) return 'text-gray-500';
  
  // Special colors for specific value formats
  if (typeof value === 'string') {
    // GPA-like values (high is good)
    if (value.match(/^[3-4]\.\d+$/) || value === '4.0') {
      return 'text-green-600';
    }
    
    // Percentage-like values
    if (value.endsWith('%')) {
      const num = parseFloat(value);
      if (num >= 90) return 'text-green-600';
      if (num >= 75) return 'text-blue-600';
    }
    
    // Other string values
    return 'text-gray-800';
  }
  
  // Number values
  if (typeof value === 'number') {
    // Placeholder logic, in real world would be contextual to the stat type
    if (value > 20) return 'text-green-600';
    if (value > 10) return 'text-blue-600';
    return 'text-gray-800';
  }
  
  return 'text-gray-800';
};

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
