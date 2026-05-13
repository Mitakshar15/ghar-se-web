/**
 * Tiny fetch wrapper. Centralises:
 *   - Base URL prepending (so feature code never hard-codes `/api`)
 *   - Auth-token attach (via getter so tokens can rotate without re-importing)
 *   - JSON parse + structured error type
 *   - Same-origin credentials (so the server can use httpOnly cookies if it wants)
 *
 * NEVER read JWTs from localStorage. They live in either:
 *   1. An httpOnly cookie set by the backend (preferred), or
 *   2. Memory only (zustand store) for SPA-only flows.
 */
import { env } from '@/config/env';

export class ApiError extends Error {
  status: number;
  body: unknown;
  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

type TokenGetter = () => string | null;
let tokenGetter: TokenGetter = () => null;

export function setAuthTokenGetter(fn: TokenGetter) {
  tokenGetter = fn;
}

export interface ApiOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  /** Skip auth header (e.g. for /auth/otp/request). Default: false. */
  skipAuth?: boolean;
  /** Abort after N ms. Default: 15_000. */
  timeoutMs?: number;
}

export async function api<T = unknown>(path: string, opts: ApiOptions = {}): Promise<T> {
  const { body, skipAuth, timeoutMs = 15_000, headers, ...rest } = opts;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  const url = (env.VITE_API_BASE_URL || '') + path;
  const finalHeaders = new Headers(headers as HeadersInit);
  if (!finalHeaders.has('Content-Type') && body !== undefined) {
    finalHeaders.set('Content-Type', 'application/json');
  }
  finalHeaders.set('Accept', 'application/json');
  if (!skipAuth) {
    const t = tokenGetter();
    if (t) finalHeaders.set('Authorization', `Bearer ${t}`);
  }

  try {
    const res = await fetch(url, {
      ...rest,
      headers: finalHeaders,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      credentials: 'same-origin',
      signal: controller.signal,
    });

    const text = await res.text();
    const data = text ? safeJson(text) : null;

    if (!res.ok) {
      const message =
        (data as { message?: string; error?: string } | null)?.message ||
        (data as { message?: string; error?: string } | null)?.error ||
        res.statusText;
      throw new ApiError(message, res.status, data);
    }
    return data as T;
  } finally {
    clearTimeout(timer);
  }
}

function safeJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

// Convenience verbs
export const apiGet = <T>(path: string, opts: ApiOptions = {}) => api<T>(path, { ...opts, method: 'GET' });
export const apiPost = <T>(path: string, body?: unknown, opts: ApiOptions = {}) =>
  api<T>(path, { ...opts, method: 'POST', body });
export const apiPatch = <T>(path: string, body?: unknown, opts: ApiOptions = {}) =>
  api<T>(path, { ...opts, method: 'PATCH', body });
export const apiDelete = <T>(path: string, opts: ApiOptions = {}) =>
  api<T>(path, { ...opts, method: 'DELETE' });
