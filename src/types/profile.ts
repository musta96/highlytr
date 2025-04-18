
export interface ProfileData {
  id: string;
  created_at?: string;
  updated_at?: string;
  first_name: string | null;
  last_name: string | null;
  date_of_birth: string | null;
  place_of_birth: string | null;
  citizenship: string | null;
  primary_sport: string | null;
  primary_position: string | null;
  secondary_sport: string | null;
  secondary_position: string | null;
  profile_completed: boolean | null;
  account_type: string;
  athlete_stats?: Json | null; // Updated to match Supabase's JSONB type
}

// Type for Supabase JSONB
export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];
