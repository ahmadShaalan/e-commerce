import { createBrowserRouter, Outlet } from 'react-router-dom';
import { LoginPage } from '../features/auth/pages/LoginPage';
import { OverviewPage } from '../features/overview/pages/OverviewPage';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import { ForgotPasswordPage } from '../features/auth/pages/ForgotPasswordPage';
import { ResetPasswordPage } from '../features/auth/pages/ResetPasswordPage';

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
  { path: '/reset-password', element: <ResetPasswordPage /> },

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
