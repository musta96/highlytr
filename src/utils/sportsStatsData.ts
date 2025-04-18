// Sport-specific statistics definitions for different positions/roles

export interface StatDefinition {
  id: string;
  label: string;
  description?: string;
  unit?: string;
  category: 'offense' | 'defense' | 'physical' | 'general' | 'academic';
}

export interface PositionStats {
  [position: string]: StatDefinition[];
}

export interface SportStats {
  name: string;
  positions: string[];
  commonStats: StatDefinition[];
  positionStats: PositionStats;
}

export const sportsStatsData: { [sportKey: string]: SportStats } = {
  soccer: {
    name: 'Soccer',
    positions: ['Goalkeeper', 'Defender', 'Midfielder', 'Forward', 'Striker', 'Winger'],
    commonStats: [
      { id: 'games_played', label: 'Games Played', category: 'general' },
      { id: 'minutes_played', label: 'Minutes Played', category: 'general' },
      { id: 'goals', label: 'Goals', category: 'offense' },
      { id: 'assists', label: 'Assists', category: 'offense' },
      { id: 'yellow_cards', label: 'Yellow Cards', category: 'defense' },
      { id: 'red_cards', label: 'Red Cards', category: 'defense' },
      { id: 'pass_accuracy', label: 'Pass Accuracy', unit: '%', category: 'general' },
      { id: 'shot_accuracy', label: 'Shot Accuracy', unit: '%', category: 'offense' }
    ],
    positionStats: {
      'Goalkeeper': [
        { id: 'clean_sheets', label: 'Clean Sheets', category: 'defense' },
        { id: 'saves', label: 'Saves', category: 'defense' },
        { id: 'save_percentage', label: 'Save Percentage', unit: '%', category: 'defense' },
        { id: 'goals_conceded', label: 'Goals Conceded', category: 'defense' },
        { id: 'penalty_saves', label: 'Penalty Saves', category: 'defense' }
      ],
      'Defender': [
        { id: 'tackles', label: 'Tackles', category: 'defense' },
        { id: 'interceptions', label: 'Interceptions', category: 'defense' },
        { id: 'clearances', label: 'Clearances', category: 'defense' },
        { id: 'blocks', label: 'Blocks', category: 'defense' },
        { id: 'duels_won', label: 'Duels Won', category: 'defense' }
      ],
      'Midfielder': [
        { id: 'key_passes', label: 'Key Passes', category: 'offense' },
        { id: 'chances_created', label: 'Chances Created', category: 'offense' },
        { id: 'pass_completion', label: 'Pass Completion', unit: '%', category: 'offense' },
        { id: 'tackles', label: 'Tackles', category: 'defense' },
        { id: 'distance_covered', label: 'Distance Covered', unit: 'km', category: 'physical' }
      ],
      'Forward': [
        { id: 'shots', label: 'Shots', category: 'offense' },
        { id: 'shots_on_target', label: 'Shots on Target', category: 'offense' },
        { id: 'conversion_rate', label: 'Conversion Rate', unit: '%', category: 'offense' },
        { id: 'dribbles_completed', label: 'Successful Dribbles', category: 'offense' },
        { id: 'offsides', label: 'Offsides', category: 'offense' }
      ],
      'Striker': [
        { id: 'shots', label: 'Shots', category: 'offense' },
        { id: 'shots_on_target', label: 'Shots on Target', category: 'offense' },
        { id: 'conversion_rate', label: 'Conversion Rate', unit: '%', category: 'offense' },
        { id: 'headed_goals', label: 'Headed Goals', category: 'offense' },
        { id: 'offsides', label: 'Offsides', category: 'offense' }
      ],
      'Winger': [
        { id: 'crosses', label: 'Crosses', category: 'offense' },
        { id: 'successful_crosses', label: 'Successful Crosses', category: 'offense' },
        { id: 'dribbles_completed', label: 'Successful Dribbles', category: 'offense' },
        { id: 'chances_created', label: 'Chances Created', category: 'offense' },
        { id: 'sprints', label: 'Sprints', category: 'physical' }
      ]
    }
  },
  basketball: {
    name: 'Basketball',
    positions: ['Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center'],
    commonStats: [
      { id: 'games_played', label: 'Games Played', category: 'general' },
      { id: 'minutes_played', label: 'Minutes Played', category: 'general' },
      { id: 'points', label: 'Points', category: 'offense' },
      { id: 'rebounds', label: 'Rebounds', category: 'general' },
      { id: 'assists', label: 'Assists', category: 'offense' },
      { id: 'steals', label: 'Steals', category: 'defense' },
      { id: 'blocks', label: 'Blocks', category: 'defense' },
      { id: 'turnovers', label: 'Turnovers', category: 'general' },
      { id: 'field_goal_pct', label: 'FG%', unit: '%', category: 'offense' },
      { id: 'three_pt_pct', label: '3PT%', unit: '%', category: 'offense' },
      { id: 'free_throw_pct', label: 'FT%', unit: '%', category: 'offense' }
    ],
    positionStats: {
      'Point Guard': [
        { id: 'assist_turnover_ratio', label: 'Assist/Turnover Ratio', category: 'offense' },
        { id: 'steals_per_game', label: 'Steals Per Game', category: 'defense' },
        { id: 'assists_per_game', label: 'Assists Per Game', category: 'offense' }
      ],
      'Shooting Guard': [
        { id: 'three_pointers_made', label: '3-Pointers Made', category: 'offense' },
        { id: 'points_per_shot', label: 'Points Per Shot', category: 'offense' },
        { id: 'true_shooting_pct', label: 'True Shooting %', unit: '%', category: 'offense' }
      ],
      'Small Forward': [
        { id: 'fastbreak_points', label: 'Fastbreak Points', category: 'offense' },
        { id: 'offensive_rebounds', label: 'Offensive Rebounds', category: 'offense' },
        { id: 'defensive_rebounds', label: 'Defensive Rebounds', category: 'defense' }
      ],
      'Power Forward': [
        { id: 'rebounds_per_game', label: 'Rebounds Per Game', category: 'general' },
        { id: 'blocks_per_game', label: 'Blocks Per Game', category: 'defense' },
        { id: 'post_points', label: 'Points in the Paint', category: 'offense' }
      ],
      'Center': [
        { id: 'blocks_per_game', label: 'Blocks Per Game', category: 'defense' },
        { id: 'rebounds_per_game', label: 'Rebounds Per Game', category: 'general' },
        { id: 'field_goal_pct', label: 'Field Goal %', unit: '%', category: 'offense' }
      ]
    }
  },
  football: {
    name: 'Football',
    positions: ['Quarterback', 'Running Back', 'Wide Receiver', 'Tight End', 'Offensive Line', 'Defensive Line', 'Linebacker', 'Cornerback', 'Safety'],
    commonStats: [
      { id: 'games_played', label: 'Games Played', category: 'general' },
      { id: 'tackles', label: 'Tackles', category: 'defense' },
      { id: 'touchdowns', label: 'Touchdowns', category: 'offense' }
    ],
    positionStats: {
      'Quarterback': [
        { id: 'pass_yards', label: 'Passing Yards', category: 'offense' },
        { id: 'pass_touchdowns', label: 'Passing TDs', category: 'offense' },
        { id: 'interceptions', label: 'Interceptions', category: 'offense' },
        { id: 'completion_pct', label: 'Completion %', unit: '%', category: 'offense' },
        { id: 'qb_rating', label: 'QB Rating', category: 'offense' }
      ],
      'Running Back': [
        { id: 'rush_yards', label: 'Rushing Yards', category: 'offense' },
        { id: 'rush_attempts', label: 'Rush Attempts', category: 'offense' },
        { id: 'yards_per_carry', label: 'Yards Per Carry', category: 'offense' },
        { id: 'rush_touchdowns', label: 'Rushing TDs', category: 'offense' },
        { id: 'receptions', label: 'Receptions', category: 'offense' }
      ],
      'Wide Receiver': [
        { id: 'receptions', label: 'Receptions', category: 'offense' },
        { id: 'receiving_yards', label: 'Receiving Yards', category: 'offense' },
        { id: 'yards_per_catch', label: 'Yards Per Catch', category: 'offense' },
        { id: 'receiving_touchdowns', label: 'Receiving TDs', category: 'offense' },
        { id: 'drops', label: 'Drops', category: 'offense' }
      ]
      // Other positions omitted for brevity
    }
  },
  // Other sports data would be defined here
};

// Helper function to get stats suggestions based on sport and position
export function getStatSuggestions(sport: string, position?: string): StatDefinition[] {
  const sportKey = sport.toLowerCase();
  const sportData = sportsStatsData[sportKey];
  
  if (!sportData) {
    return [];
  }
  
  if (!position) {
    return sportData.commonStats;
  }
  
  const positionStats = sportData.positionStats[position] || [];
  return [...sportData.commonStats, ...positionStats];
}

export function getSportPositions(sport: string): string[] {
  const sportKey = sport.toLowerCase();
  const sportData = sportsStatsData[sportKey];
  
  if (!sportData) {
    return [];
  }
  
  return sportData.positions;
}

export const generalAthleticStats: StatDefinition[] = [
  { id: 'height', label: 'Height', category: 'physical' },
  { id: 'weight', label: 'Weight', category: 'physical' },
  { id: 'wingspan', label: 'Wingspan', category: 'physical' },
  { id: 'vertical_jump', label: 'Vertical Jump', unit: 'inches', category: 'physical' },
  { id: 'speed_40yd', label: '40-yard Dash', unit: 'seconds', category: 'physical' },
  { id: 'agility_drill', label: 'Agility Drill', unit: 'seconds', category: 'physical' },
  { id: 'bench_press', label: 'Bench Press', unit: 'lbs', category: 'physical' },
  { id: 'squat', label: 'Squat', unit: 'lbs', category: 'physical' },
  { id: 'deadlift', label: 'Deadlift', unit: 'lbs', category: 'physical' }
];

export const academicStats: StatDefinition[] = [
  { id: 'gpa', label: 'GPA', category: 'academic' },
  { id: 'sat', label: 'SAT Score', category: 'academic' },
  { id: 'act', label: 'ACT Score', category: 'academic' },
  { id: 'class_rank', label: 'Class Rank', category: 'academic' },
  { id: 'toefl', label: 'TOEFL Score', category: 'academic' },
  { id: 'ielts', label: 'IELTS Score', category: 'academic' }
];
