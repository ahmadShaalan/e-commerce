import { supabase } from '../../../lib/supabase';

export const loginWithEmail = async (email: string, password: string) => {
  await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export const getCurrentProfile = (userId: string) => {
  return supabase
    .from('profiles')
    .select('id, full_name, phone, avatar_url, role')
    .eq('id', userId)
    .single();
};

export const signOut = async () => {
  await supabase.auth.signOut();
};
