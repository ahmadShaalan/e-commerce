import type { Session } from '@supabase/supabase-js';
import { create } from 'zustand';
import { supabase } from '../../../lib/supabase';
import { getCurrentProfile } from '../api/authApi';

export interface Profile {
  id: string;
  full_name: string;
  phone: string | null;
  avatar_url: string | null;
  role: 'admin' | 'customer';
}

interface AuthState {
  session: Session | null;
  profile: Profile | null;
}

interface AuthAction {
  setSession: (session: Session | null) => void;
  loadProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState & AuthAction>((set, get) => ({
  session: null,
  profile: null,

  setSession: (session) =>
    set({
      session: session,
    }),

  loadProfile: async () => {
    const userId = get().session?.user.id;

    if (!userId) {
      set({
        profile: null,
      });
      return;
    }

    const { data, error } = await getCurrentProfile(userId);

    if (error) {
      console.error('failed to load profile', error);
      return;
    }

    set({
      profile: data as Profile,
    });
  },
}));

/**
 * Wires the store to Supabase's auth events.
 * Call this once when the app starts.
 */

export async function initAuth() {
  const { setSession, loadProfile } = useAuthStore.getState();

  //   1. Initial check — is there a session in localStorage already?
  const {
    data: { session },
  } = await supabase.auth.getSession();

  setSession(session);

  if (session) {
    await loadProfile();
  }

  // 2. Subscribe to future changes — sign-in, sign-out, token refresh.

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(async (_event, session) => {
    setSession(session);

    if (session) {
      await loadProfile();
    } else {
      useAuthStore.setState({
        profile: null,
      });
    }
  });

  return () => subscription.unsubscribe();
}
