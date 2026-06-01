import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from '../components/Toast';

const queryClient = new QueryClient();

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
