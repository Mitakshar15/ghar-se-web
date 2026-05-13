import { useEffect, type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/auth/store';
import { ROUTES } from '@/config/routes';

/**
 * ProtectedRoute — gates a tree behind authentication.
 *
 * Behavior:
 *   - If user is `authenticated`, render children.
 *   - If user is `unauthenticated`, redirect to /sign-in (preserve return path).
 *   - If user is `idle` (initial load with no token), this currently treats them
 *     as unauthenticated. When backend is wired, swap this to attempt a silent
 *     /auth/me refresh via the httpOnly cookie before redirecting.
 */
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const status = useAuth((s) => s.status);
  const location = useLocation();

  useEffect(() => {
    // TODO when backend is live: trigger silent re-auth via refresh cookie.
  }, []);

  if (status !== 'authenticated') {
    return <Navigate to={ROUTES.login} replace state={{ from: location }} />;
  }
  return <>{children}</>;
}
