import { supabase } from '../../../lib/supabase';

export const signInWithEmail = async (email: string, password: string) => {
  return supabase.auth.signInWithPassword({ email, password });
};

export const logOut = async () => {
  return supabase.auth.signOut();
};
