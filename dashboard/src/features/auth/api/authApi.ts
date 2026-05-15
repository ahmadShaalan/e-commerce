import { supabase } from '../../../lib/supabase';

export const loginWithEmail = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export const getCurrentProfile = async (userId: string) => {
  return await supabase
    .from('profiles')
    .select('id, full_name, phone, avatar_url, role')
    .eq('id', userId)
    .single();
};
