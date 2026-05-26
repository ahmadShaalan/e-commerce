import axios from 'axios';
import { supabaseUrl, supabaseAnonKey } from '../constants';
import { useAuthStore } from '../features/auth/store';

export const httpClient = axios.create({
  baseURL: `${supabaseUrl}/rest/v1`,
  headers: {
    'Content-Type': 'application/json',
    apiKey: supabaseAnonKey,
    Prefer: 'return=representation',
  },
});

httpClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().session?.access_token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
