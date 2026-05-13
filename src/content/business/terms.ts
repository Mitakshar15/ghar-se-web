import { BusinessTermsSchema, type BusinessTerms } from '../schema/business';

/**
 * BUSINESS — the single source of truth for contractual numbers.
 *
 * If you find yourself typing "8%" or "₹500" anywhere in component code,
 * STOP. Import the corresponding field from here and let the display helpers
 * format it. That way one change here propagates everywhere — landing page,
 * FAQ answer, onboarding wizard, dashboard tooltip, terms of service.
 *
 * To change a term:
 *   1. Edit the value below.
 *   2. Run `npm test` — schemas validate at module load.
 *   3. Commit. Every consumer picks up the new value on next build.
 */
export const BUSINESS: BusinessTerms = BusinessTermsSchema.parse({
  commissionPct: 8,
  securityDepositInr: 500,
  platformFeeInr: 10,
  plusYearlyInr: 199,
  payoutWindowHours: { min: 24, max: 48 },
  refundWindowHours: 24,
  fssaiRegistrationCostInr: 0, // free for makers via Ghar Se
});

/* -----------------------------------------------------------------------
 * Display helpers — format a term for UI. Keep these here (next to the
 * source values) so the formatting and the value travel together.
 * -------------------------------------------------------------------- */

export const commissionDisplay = (): string => `${BUSINESS.commissionPct}% commission`;

export const securityDepositDisplay = (): string =>
  `₹${BUSINESS.securityDepositInr} refundable security deposit`;

export const payoutWindowDisplay = (): string => {
  const { min, max } = BUSINESS.payoutWindowHours;
  return `${min}-${max}h after delivery`;
};

export const refundWindowDisplay = (): string => `${BUSINESS.refundWindowHours}-hour refund window`;

export const plusYearlyDisplay = (): string => `₹${BUSINESS.plusYearlyInr}/year`;

/** Pre-built strings used in the For Makers fine-print line. */
export const forMakersFineprint = (): string =>
  [
    'Free to join',
    securityDepositDisplay(),
    commissionDisplay(),
    'No subscription',
  ].join(' · ');
