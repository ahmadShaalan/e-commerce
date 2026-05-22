import { create } from 'zustand';
import type { Session } from '@supabase/supabase-js';
import { getCurrentProfile } from '../api/authApi';
import { supabase } from '../../../lib/supabase';
import { devtools } from 'zustand/middleware';

interface Profile {
  id: string;
  avatar_url: string;
  role: 'admin' | 'customer';
  full_name: string;
  phone: string;
}

interface AuthState {
  session: Session | null;
  profile: Profile | null;
}

interface AuthAction {
  setSession: (session: Session | null) => void;
  loadProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState & AuthAction>()(
  devtools(
    (set, get) => ({
      session: null,
      profile: null,
      setSession: (session) => set({ session }, false, 'auth/setSession'),
      loadProfile: async () => {
        const userId = get().session?.user.id;
        if (!userId) {
          set({ profile: null }, false, 'auth/clearProfile');
          return;
        }
        const { data, error } = await getCurrentProfile(userId);
        if (error) {
          console.log(error);
          set({ profile: null }, false, 'auth/profileError');
          return;
        }
        set({ profile: data as Profile }, false, 'auth/loadProfile');
      },
    }),
    { name: 'auth-store' },
  ),
);

export const initAuth = async () => {
  const { setSession, loadProfile } = useAuthStore.getState();

  //   1- check if there is a session in localStorage already?
  const { data } = await supabase.auth.getSession();

  setSession(data.session);

  if (data.session) {
    await loadProfile();
  }

  // 2- watch for any change signin - signout.
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(async (event, session) => {
    setSession(session);

    if (session) {
      if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        await loadProfile();
      }
    }
  });

  return () => subscription.unsubscribe();
};
