import { createClient } from '@supabase/supabase-js';
import { supabaseAnonKey, supabaseUrl } from '../constants';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase env vars — check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
