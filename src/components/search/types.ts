
export type SearchType = 'athletes' | 'colleges' | 'agencies';

export type Filters = {
  sport: string;
  position: string;
  ageMin: number;
  ageMax: number;
  gpaMin: number;
  countryOrState: string;
  divisionLevel: string;
  hasScholarship: boolean;
};

export interface Athlete {
  id: number;
  name: string;
  sport: string;
  position: string;
  age: number;
  gpa: number;
  location: string;
  image: string;
  highlights: number;
  verified: boolean;
}

export interface College {
  id: number;
  name: string;
  location: string;
  division: string;
  sports: string[];
  image: string;
  hasScholarships: boolean;
  openPositions: number;
}
