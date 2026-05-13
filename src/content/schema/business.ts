import { z } from 'zod';

/**
 * BusinessTerms — the contractual numbers that appear all over the app.
 *
 * Everything here is treated as the canonical source. Components must IMPORT
 * these values, never re-type them inline. If the commission rate changes from
 * 8% to 9%, exactly one line in `src/content/business/terms.ts` changes — and
 * every component referencing it picks it up.
 *
 * Why it matters: these terms have legal/contractual weight. Drift between
 * the landing page ("8% commission") and the FAQ ("8% commission") and the
 * maker onboarding flow ("9% commission") is a real compliance risk.
 */
export const BusinessTermsSchema = z.object({
  commissionPct: z.number().nonnegative().lte(100),
  securityDepositInr: z.number().int().nonnegative(),
  platformFeeInr: z.number().int().nonnegative(),
  plusYearlyInr: z.number().int().nonnegative(),
  payoutWindowHours: z.object({
    min: z.number().int().positive(),
    max: z.number().int().positive(),
  }),
  refundWindowHours: z.number().int().positive(),
  fssaiRegistrationCostInr: z.number().int().nonnegative(),
});

export type BusinessTerms = z.infer<typeof BusinessTermsSchema>;
