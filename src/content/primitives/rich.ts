import { z } from 'zod';
import { LocalizedStringSchema } from './locale';

/**
 * CTA — a call-to-action button or link.
 *
 * `href` is either a route path (`/sign-in`) or an anchor reference (`#how`).
 * `variant` maps to our Button component's visual variants.
 */
export const CTASchema = z.object({
  label: LocalizedStringSchema,
  /**
   * Optional secondary line above the main label — used for two-line app-store
   * buttons ("Download on" / "App Store"). Components decide whether to render.
   */
  subLabel: LocalizedStringSchema.optional(),
  href: z.string(),
  variant: z.enum(['primary', 'saffron', 'outline', 'ghost']).optional(),
});
export type CTA = z.infer<typeof CTASchema>;

/**
 * AssetRef — image or media reference. Used when real photography arrives.
 *
 * Required `alt` keeps every content entry accessible — there is no way to
 * ship an `<img>` without alt text because the schema demands it.
 */
export const AssetRefSchema = z.object({
  src: z.string().url().or(z.string().startsWith('/')),
  alt: LocalizedStringSchema,
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
});
export type AssetRef = z.infer<typeof AssetRefSchema>;

/**
 * EmojiOrIcon — for now we use emoji as visual content (chakli 🥨, modaka 🥥).
 * When real iconography lands, this schema gains an `iconName` discriminator
 * pointing at a lucide-react export.
 */
export const EmojiSchema = z.string().min(1).max(8);
export type Emoji = z.infer<typeof EmojiSchema>;
