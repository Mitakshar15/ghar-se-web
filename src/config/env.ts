import { z } from 'zod';

/**
 * Runtime-validated environment.
 *
 * - All client-side vars MUST be prefixed with VITE_.
 * - Schemas serve as documentation + bail-fast on misconfig.
 * - Add new keys here in lockstep with .env.example.
 */
const Schema = z.object({
  VITE_USE_MOCKS: z
    .string()
    .default('true')
    .transform((v) => v === 'true'),
  VITE_API_BASE_URL: z.string().default(''),
  VITE_APP_NAME: z.string().default('Ghar Se'),
  VITE_APP_TAGLINE: z.string().default('Home makers of Sirsi'),
  VITE_DEFAULT_CITY: z.string().default('Sirsi'),
  VITE_FEATURE_KANNADA_UI: z
    .string()
    .default('false')
    .transform((v) => v === 'true'),
  VITE_FEATURE_VOICE_ASSIST: z
    .string()
    .default('false')
    .transform((v) => v === 'true'),
  VITE_SENTRY_DSN: z.string().default(''),
});

const parsed = Schema.safeParse(import.meta.env);
if (!parsed.success) {
  // eslint-disable-next-line no-console
  console.error('Invalid env configuration:', parsed.error.flatten());
  throw new Error('Invalid environment configuration. See .env.example.');
}

export const env = parsed.data;

export type AppEnv = typeof env;
