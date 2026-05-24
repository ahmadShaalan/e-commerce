import axios from 'axios';
import { supabaseAnonKey, supabaseUrl } from '../constants';

export const httpClient = axios.create({
  baseURL: `${supabaseUrl}/rest/v1`,
  headers: {
    Authorization: `Bearer ${supabaseAnonKey}`,
    'Content-Type': 'application/json',
    apiKey: supabaseAnonKey,
    Prefer: 'return=representation',
  },
});
