import { useMutation } from '@tanstack/react-query';
import { supabase } from '../../../lib/supabase';
import type { LoginFormValues } from '../../../types/schemas';

export const login = async ({ email, password }: LoginFormValues) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};
