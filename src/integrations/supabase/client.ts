
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://qneiwhmnaygltxorwqlp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFuZWl3aG1uYXlnbHR4b3J3cWxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3OTY4MjYsImV4cCI6MjA2MDM3MjgyNn0.Uk5YgC-FMqimo4fq_DrX9xgWrv5c0wB3qOSbI4bHH3s";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
