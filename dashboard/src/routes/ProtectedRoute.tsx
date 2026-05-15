import { useEffect, type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthStore } from '../features/auth/store';
import { Spinner } from '../components/Spinner';
import { signOut } from '../features/auth/api/authApi';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const loading = useAuthStore((s) => s.loading);
  const session = useAuthStore((s) => s.session);
  const profile = useAuthStore((s) => s.profile);

  // If a non-admin sneaks in (e.g. signed in as customer), sign them out.
  useEffect(() => {
    if (!loading && profile && profile.role !== 'admin') {
      signOut();
    }
  }, [loading, profile]);

  // 1. Still checking — render nothing yet
  if (loading) {
    return <Spinner />;
  }

  // 2. Not signed in — go to login
  if (!session) {
    return <Navigate to="/" replace />;
  }

  // 3. Signed in but profile hasn't loaded yet — wait
  if (!profile) {
    return <Spinner />;
  }

  // 4. Signed in but not an admin — also go to login (the useEffect above signed them out)
  if (profile.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // 5. All good — render the wrapped page
  return <>{children}</>;
}
