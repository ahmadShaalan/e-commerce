import { createBrowserRouter, Outlet } from 'react-router-dom';
import { LoginPage } from '../features/auth/pages/LoginPage';
import { OverviewPage } from '../features/overview/pages/OverviewPage';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import { ForgotPasswordPage } from '../features/auth/pages/ForgotPasswordPage';

export const router = createBrowserRouter([
  // public Routes
  {
    path: '/',
    element: (
      <PublicRoute>
        <Outlet />
      </PublicRoute>
    ),

    children: [
      { path: '/', element: <LoginPage /> },
      { path: '/forgot-password', element: <ForgotPasswordPage /> },
    ],
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
