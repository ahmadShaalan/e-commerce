import { createBrowserRouter } from 'react-router-dom';

import { LoginPage } from '../features/auth/pages/LoginPage';
import { OverviewPage } from '../features/overviwe/pages/OverviwePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/dashboard',
    element: <OverviewPage />,
  },
]);
