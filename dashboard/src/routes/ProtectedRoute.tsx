import { useEffect, type ReactNode } from 'react';
import { logOut } from '../features/auth/api/authApi';
import { useAuthStore } from '../features/auth/store';
import { Spinner } from '../components/Spinner';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const session = useAuthStore((state) => state.session);
  const profile = useAuthStore((state) => state.profile);
  const loading = useAuthStore((state) => state.loading);

  useEffect(() => {
    if (!loading && (!session || profile?.role !== 'admin')) {
      logOut();
    }
  }, [session, profile, loading]);

  if (loading) {
    return <Spinner />;
  }

  if (!session) {
    return <Navigate to="/" replace />;
  }

  if (!profile) {
    return <Spinner />;
  }

  if (profile.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
