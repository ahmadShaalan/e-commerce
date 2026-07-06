import { createBrowserRouter, Outlet } from 'react-router-dom';
import { LoginPage } from '../features/auth/pages/LoginPage';
import { OverviewPage } from '../features/overview/pages/OverviewPage';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import { ForgotPasswordPage } from '../features/auth/pages/ForgotPasswordPage';
import { ResetPasswordPage } from '../features/auth/pages/ResetPasswordPage';
import ProductPage from '../features/products/pages/ProductPage';
import { AppLayout } from '../layout/AppLayout';
import { CreateProductPage } from '../features/products/pages/CreateProductPage';

export const router = createBrowserRouter([
  // public Routes
  {
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
        <AppLayout />
      </ProtectedRoute>
    ),

    children: [
      // overview feature
      {
        index: true,
        element: <OverviewPage />,
      },

      // products feature
      {
        path: 'products',
        element: <ProductPage />,
      },
      {
        path: 'products/new',
        element: <CreateProductPage />,
      },
    ],
  },
]);
