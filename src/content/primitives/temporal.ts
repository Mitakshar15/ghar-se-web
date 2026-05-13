import { z } from 'zod';

/**
 * DateWindow — used by any content that should auto-publish and auto-retire.
 *
 *   { activeFrom: '2026-07-01', activeUntil: '2026-09-06' }
 *
 * Both fields are optional:
 *   - Omit `activeFrom` to make the entry active from when it's committed.
 *   - Omit `activeUntil` to make the entry active forever (rare; usually you
 *     want an expiry so stale banners don't linger).
 *
 * Dates are ISO 8601, interpreted in the user's local time zone. Sirsi audience
 * is in IST and the server will be in IST too, so for now we treat dates as
 * effectively IST. If we ever serve non-IST users, switch to explicit time
 * zones at the selector layer, not on every content entry.
 */
export const DateWindowSchema = z.object({
  activeFrom: z.string().optional(), // ISO 8601 date or datetime
  activeUntil: z.string().optional(),
});

export type DateWindow = z.infer<typeof DateWindowSchema>;
