import { QueryClient } from '@tanstack/react-query';

/**
 * Shared QueryClient. Defaults err on the side of fresh data because most
 * Ghar Se portal views (orders, payouts) are time-sensitive.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      gcTime: 5 * 60_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

/** Centralised query keys to keep refetches/invalidations consistent across files. */
export const qk = {
  me: ['me'] as const,
  dashboard: ['dashboard'] as const,
  orders: (status?: string) => ['orders', status ?? 'all'] as const,
  menu: ['menu'] as const,
  calendar: (year: number, month: number) => ['calendar', year, month] as const,
  earnings: ['earnings'] as const,
  reviews: ['reviews'] as const,
  profile: ['profile'] as const,
  featuredMakers: ['featuredMakers'] as const,
};
