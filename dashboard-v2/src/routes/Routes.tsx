import { createBrowserRouter } from 'react-router-dom';
import { LoginPage } from '../features/auth/pages/LoginPage';
import { OverviewPage } from '../features/overview/pages/OverviewPage';
import ProtectedRoutes from './ProtectedRoutes';

export const router = createBrowserRouter([
  {
    element: <LoginPage />,
    path: '/',
  },
  {
    element: (
      <ProtectedRoutes>
        <OverviewPage />
      </ProtectedRoutes>
    ),
    path: '/dashboard',
  },
]);
