
export interface StatDefinition {
  id: string;
  label: string;
  description?: string;
  unit?: string;
}

// General athletic measurements
export const generalAthleticStats: StatDefinition[] = [
  { id: 'height', label: 'Height', unit: 'cm/ft' },
  { id: 'weight', label: 'Weight', unit: 'kg/lbs' },
  { id: 'vertical_jump', label: 'Vertical Jump', unit: 'in/cm' },
  { id: 'speed', label: '40-yard Dash', unit: 'seconds' },
  { id: 'strength', label: 'Bench Press', unit: 'kg/lbs' },
  { id: 'endurance', label: 'Endurance', unit: 'score' }
];

// Academic stats
export const academicStats: StatDefinition[] = [
  { id: 'gpa', label: 'GPA' },
  { id: 'sat', label: 'SAT Score' },
  { id: 'act', label: 'ACT Score' },
  { id: 'class_rank', label: 'Class Rank' },
  { id: 'ap_classes', label: 'AP Classes' },
  { id: 'honors', label: 'Honors' }
];

// Soccer stats by position
const soccerForwardStats: StatDefinition[] = [
  { id: 'goals', label: 'Goals', description: 'Total goals scored' },
  { id: 'shots', label: 'Shots', description: 'Total shots taken' },
  { id: 'shots_on_target', label: 'Shots on Target', description: 'Shots that required a save' },
  { id: 'conversion_rate', label: 'Conversion Rate', description: 'Goals per shot ratio', unit: '%' },
  { id: 'assists', label: 'Assists', description: 'Passes that led to goals' }
];

const soccerMidfielderStats: StatDefinition[] = [
  { id: 'assists', label: 'Assists', description: 'Passes that led to goals' },
  { id: 'passes', label: 'Pass Completion', description: 'Successful passes percentage', unit: '%' },
  { id: 'chances_created', label: 'Chances Created', description: 'Opportunities created for teammates' },
  { id: 'distance_covered', label: 'Distance Covered', description: 'Total distance run', unit: 'km' },
  { id: 'goals', label: 'Goals', description: 'Total goals scored' }
];

const soccerDefenderStats: StatDefinition[] = [
  { id: 'tackles', label: 'Tackles', description: 'Successful tackles made' },
  { id: 'interceptions', label: 'Interceptions', description: 'Passes intercepted' },
  { id: 'clearances', label: 'Clearances', description: 'Balls cleared from danger' },
  { id: 'blocks', label: 'Blocks', description: 'Shots blocked' },
  { id: 'aerial_duels_won', label: 'Aerial Duels Won', description: 'Headers won', unit: '%' }
];

const soccerGoalkeeperStats: StatDefinition[] = [
  { id: 'clean_sheets', label: 'Clean Sheets', description: 'Games without conceding a goal' },
  { id: 'saves', label: 'Saves', description: 'Total saves made' },
  { id: 'save_percentage', label: 'Save Percentage', description: 'Percentage of shots saved', unit: '%' },
  { id: 'goals_conceded', label: 'Goals Conceded', description: 'Total goals conceded' },
  { id: 'penalties_saved', label: 'Penalties Saved', description: 'Penalty kicks saved' }
];

// Basketball stats by position
const basketballGuardStats: StatDefinition[] = [
  { id: 'points', label: 'Points', description: 'Total points scored' },
  { id: 'assists', label: 'Assists', description: 'Passes that led to baskets' },
  { id: 'steals', label: 'Steals', description: 'Possessions gained through defense' },
  { id: 'three_point_percentage', label: '3PT Percentage', description: 'Three-point shots made percentage', unit: '%' },
  { id: 'free_throw_percentage', label: 'FT Percentage', description: 'Free throw percentage', unit: '%' }
];

const basketballForwardStats: StatDefinition[] = [
  { id: 'points', label: 'Points', description: 'Total points scored' },
  { id: 'rebounds', label: 'Rebounds', description: 'Total rebounds collected' },
  { id: 'blocks', label: 'Blocks', description: 'Shots blocked' },
  { id: 'field_goal_percentage', label: 'FG Percentage', description: 'Field goal percentage', unit: '%' },
  { id: 'double_doubles', label: 'Double-Doubles', description: 'Games with double figures in two categories' }
];

const basketballCenterStats: StatDefinition[] = [
  { id: 'rebounds', label: 'Rebounds', description: 'Total rebounds collected' },
  { id: 'blocks', label: 'Blocks', description: 'Shots blocked' },
  { id: 'points', label: 'Points', description: 'Total points scored' },
  { id: 'field_goal_percentage', label: 'FG Percentage', description: 'Field goal percentage', unit: '%' },
  { id: 'offensive_rebounds', label: 'Offensive Rebounds', description: 'Rebounds on offensive end' }
];

// Function to get suggested stats based on sport and position
export const getStatSuggestions = (sport: string, position?: string): StatDefinition[] => {
  const sportLower = sport?.toLowerCase();
  const positionLower = position?.toLowerCase();
  
  // Soccer
  if (sportLower === 'soccer') {
    if (positionLower?.includes('forward') || positionLower?.includes('striker')) {
      return soccerForwardStats;
    } else if (positionLower?.includes('midfielder')) {
      return soccerMidfielderStats;
    } else if (positionLower?.includes('defender')) {
      return soccerDefenderStats;
    } else if (positionLower?.includes('goalkeeper') || positionLower?.includes('goalie')) {
      return soccerGoalkeeperStats;
    }
    // Default soccer stats if position not specified
    return [...soccerForwardStats, ...soccerMidfielderStats].slice(0, 5);
  }
  
  // Basketball
  if (sportLower === 'basketball') {
    if (positionLower?.includes('guard')) {
      return basketballGuardStats;
    } else if (positionLower?.includes('forward')) {
      return basketballForwardStats;
    } else if (positionLower?.includes('center')) {
      return basketballCenterStats;
    }
    // Default basketball stats if position not specified
    return [...basketballGuardStats, ...basketballForwardStats].slice(0, 5);
  }
  
  // Default general stats if sport is not recognized
  return [
    { id: 'games_played', label: 'Games Played', description: 'Total games participated in' },
    { id: 'minutes_played', label: 'Minutes Played', description: 'Total playing time', unit: 'min' },
    { id: 'games_started', label: 'Games Started', description: 'Games started in the starting lineup' },
    { id: 'score', label: 'Points/Goals', description: 'Total points or goals scored' },
    { id: 'team_contribution', label: 'Team Contribution', description: 'Overall contribution to team performance' }
  ];
};
