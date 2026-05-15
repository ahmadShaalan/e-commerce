import { createBrowserRouter } from 'react-router-dom';

import { LoginPage } from '../features/auth/pages/LoginPage';
import { OverviewPage } from '../features/overview/pages/OverviewPage';
import { ProtectedRoute } from './ProtectedRoute';

export const router = createBrowserRouter([
  // Public Routes
  {
    path: '/',
    element: <LoginPage />,
  },

  // Protected Routes
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <OverviewPage />
      </ProtectedRoute>
    ),
  },
]);
