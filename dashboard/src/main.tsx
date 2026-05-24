import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import './index.css';
import { router } from './routes';
import { initAuth } from './features/auth/store';
import AppProvider from './providers/AppProvider';

initAuth();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>,
);
