import { Navigate } from 'react-router-dom';
import { Spinner } from '../components/Spinner';
import { useAuthStore } from '../features/auth/store';
import type { ReactNode } from 'react';

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const session = useAuthStore((state) => state.session);
  const profile = useAuthStore((state) => state.profile);
  const loading = useAuthStore((state) => state.loading);

  if (loading) {
    return <Spinner />;
  }

  if (session && profile?.role === 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
