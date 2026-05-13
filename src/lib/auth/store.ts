import { create } from 'zustand';
import type { Maker } from '@/types/domain';
import { setAuthTokenGetter } from '@/lib/api/client';

/**
 * Auth store — token + signed-in maker live only in memory.
 *
 * Why not localStorage / sessionStorage?
 *   - localStorage is readable by ANY script on origin. Token theft via XSS
 *     becomes one-line. Memory + httpOnly refresh-cookie (server-issued) is
 *     industry-standard for SPAs.
 *   - On full page reload the user re-authenticates via the silent /auth/me
 *     call using the refresh cookie. The backend handles rotation.
 *
 * This store deliberately exposes only minimum surface; refresh logic should
 * live in a HTTP interceptor (TODO when backend is wired up).
 */
interface AuthState {
  accessToken: string | null;
  maker: Maker | null;
  status: 'idle' | 'authenticated' | 'unauthenticated';
  setSession: (token: string, maker: Maker) => void;
  clear: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  accessToken: null,
  maker: null,
  status: 'idle',
  setSession: (accessToken, maker) => set({ accessToken, maker, status: 'authenticated' }),
  clear: () => set({ accessToken: null, maker: null, status: 'unauthenticated' }),
}));

// Wire the api client to read tokens from the store. Done once at module init.
setAuthTokenGetter(() => useAuth.getState().accessToken);
