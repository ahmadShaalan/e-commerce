import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { Spinner } from '../components/Spinner';
import { useAuthStore } from '../features/auth/store';

interface GuestRouteProps {
  children: ReactNode;
}

export function GuestRoute({ children }: GuestRouteProps) {
  const loading = useAuthStore((s) => s.loading);
  const session = useAuthStore((s) => s.session);
  const profile = useAuthStore((s) => s.profile);

  if (loading) {
    return <Spinner />;
  }

  // لو عامل login بالفعل
  if (session && profile?.role === 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
