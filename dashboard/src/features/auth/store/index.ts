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
  loading: boolean;
}

interface AuthAction {
  setSession: (session: Session | null) => void;
  loadProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState & AuthAction>((set, get) => ({
  session: null,
  profile: null,
  loading: true,

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

  try {
    // Initial session check
    const {
      data: { session },
    } = await supabase.auth.getSession();

    setSession(session);

    if (session) {
      await loadProfile();
    }
  } catch (error) {
    console.error('Init auth failed', error);
  } finally {
    useAuthStore.setState({
      loading: false,
    });
  }

  // Listen for auth changes
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(async (_event, session) => {
    setSession(session);

    if (session) {
      await loadProfile();
    } else {
      useAuthStore.setState({
        profile: null,
        loading: false,
      });
    }
  });

  return () => subscription.unsubscribe();
}
