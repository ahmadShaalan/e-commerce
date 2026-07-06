import type { ReactNode } from 'react';
import { useAuthStore } from '../features/auth/store/authStore';
import { Navigate } from 'react-router-dom';
import { Spinner } from '../components/Spinner';

interface ProtectedRoutesProps {
  children: ReactNode;
}

const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const session = useAuthStore((state) => state.session);
  const loading = useAuthStore((state) => state.loading);

  if (loading) {
    return <Spinner />;
  }

  if (!session) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
