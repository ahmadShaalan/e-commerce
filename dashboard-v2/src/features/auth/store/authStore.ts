import type { Session } from '@supabase/supabase-js';
import { create } from 'zustand';
import { supabase } from '../../../lib/supabase';

interface AuthState {
  session: Session | null;
  loading: boolean;
}

interface AuthAction {
  setSession: (session: Session | null) => void;
}

export const useAuthStore = create<AuthState & AuthAction>((set) => ({
  session: null,
  loading: true,

  setSession: (session) => set({ session, loading: false }),
}));

export const initAuth = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (data.session && !error) {
    useAuthStore.getState().setSession(data.session);
  }

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_, session) => {
    useAuthStore.getState().setSession(session);
  });

  return () => {
    subscription.unsubscribe();
  };
};
