import { z } from 'zod';
import { LocalizedStringSchema } from '../primitives/locale';

/**
 * Schemas for maker-portal copy. Today: FAQs and the trust-pillar reuse from
 * the buyer-facing Suraksha section. Settings labels are next on the list.
 */

export const FaqEntrySchema = z.object({
  id: z.string(),
  q: LocalizedStringSchema,
  a: LocalizedStringSchema,
});

export const FaqContentSchema = z.object({
  eyebrow: LocalizedStringSchema,
  title: LocalizedStringSchema,
  entries: z.array(FaqEntrySchema).min(1),
});
export type FaqContent = z.infer<typeof FaqContentSchema>;

// Portal trust pillars (a subset of the landing pillars, reused in onboarding etc.)
export const TrustPillarSchema = z.object({
  id: z.string(),
  title: LocalizedStringSchema,
  body: LocalizedStringSchema,
  iconName: z.string(),
});

export const TrustContentSchema = z.object({
  pillars: z.array(TrustPillarSchema).min(1),
});
export type TrustContent = z.infer<typeof TrustContentSchema>;
