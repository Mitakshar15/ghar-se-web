import { z } from 'zod';

/**
 * LocalizedString — every user-visible string in `src/content/` uses this shape.
 *
 *   { en: 'Sign in', kn: 'ಲಾಗಿನ್', hi: 'साइन इन' }
 *
 * - `en` is the contract baseline (required).
 * - `kn` and `hi` are optional today; we ship English only.
 * - When we localize, fill in `kn` first (Kannada is our primary buyer language
 *   for Sirsi). The `localized()` selector falls back to `en` for any missing
 *   translation, so partial rollouts don't break the UI.
 *
 * Why a nested object instead of `{ key, en, kn, hi }` rows in a flat dictionary?
 * Because content lives next to the block it belongs to — a hero subhead is a
 * field on the hero content, not a row in a translations table. The structure
 * mirrors the rendered shape.
 */
export const LocalizedStringSchema = z.object({
  en: z.string().min(1),
  kn: z.string().optional(),
  hi: z.string().optional(),
});

export type LocalizedString = z.infer<typeof LocalizedStringSchema>;

export type Locale = 'en' | 'kn' | 'hi';
