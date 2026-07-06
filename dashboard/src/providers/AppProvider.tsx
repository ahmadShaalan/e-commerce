import type { ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from '../components/Toast';
import { queryClient } from '../lib/queryClient';

interface AppProviderProps {
  children: ReactNode;
}

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <Toaster />

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
