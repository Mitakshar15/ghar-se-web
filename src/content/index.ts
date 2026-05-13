/**
 * Public surface of the content layer.
 *
 * Components should import from here when they need primitives, selectors,
 * or business terms:
 *
 *   import { localized, pickActive, BUSINESS } from '@/content';
 *
 * For section-specific content, import directly from the relevant module:
 *
 *   import { hero } from '@/content/landing/hero';
 *   import { faqs } from '@/content/portal/faqs';
 */

export * from './primitives';
export * from './selectors';
export { BUSINESS } from './business/terms';
export {
  commissionDisplay,
  securityDepositDisplay,
  payoutWindowDisplay,
  refundWindowDisplay,
  plusYearlyDisplay,
  forMakersFineprint,
} from './business/terms';
