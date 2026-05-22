import { supabase } from '../../../lib/supabase';

export const signInWithEmail = async (email: string, password: string) => {
  return supabase.auth.signInWithPassword({ email, password });
};

export const logOut = async () => {
  return supabase.auth.signOut();
};

export async function getCurrentProfile(userId: string) {
  return supabase
    .from('profiles')
    .select('id, full_name, phone, avatar_url, role')
    .eq('id', userId)
    .single();
}
