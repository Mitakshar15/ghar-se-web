import { SurakshaContentSchema, type SurakshaContent } from '../schema/landing';
import { BUSINESS } from '../business/terms';

/**
 * Sirsi Suraksha — the five trust pillars. Stable content.
 *
 * One pillar interpolates a business term (refund window hours) so it stays
 * in sync with the canonical value in business/terms.ts. Pattern: when a
 * content string references a contractual number, interpolate from BUSINESS
 * — that's why the content file is TypeScript, not JSON.
 */
export const suraksha: SurakshaContent = SurakshaContentSchema.parse({
  eyebrow: { en: 'Sirsi Suraksha' },
  headlinePrefix: { en: 'Trust, ' },
  headlineItalic: { en: 'built in.' },
  sub: {
    en: 'Five quiet promises that protect both buyer and maker. Not bolted on — written into how Ghar Se works.',
  },
  pillars: [
    {
      id: 'kyc',
      iconName: 'BadgeCheck',
      title: { en: 'KYC verified makers' },
      sub: { en: 'Aadhaar + PAN linked. Real names, real kitchens.' },
    },
    {
      id: 'hygiene',
      iconName: 'Shield',
      title: { en: 'Hygiene grading' },
      sub: { en: 'In-person inspections. Public A+/A/B grade on every profile.' },
    },
    {
      id: 'escrow',
      iconName: 'Lock',
      title: { en: 'Escrow payments' },
      sub: { en: 'Your money is held safely. Released only after you confirm delivery.' },
    },
    {
      id: 'refund',
      iconName: 'RotateCw',
      // Interpolated from business/terms.ts — the only place "24" is set.
      title: { en: `${BUSINESS.refundWindowHours}-hour refund window` },
      sub: { en: 'Not happy? Full refund, no maker-side questions, no buyer-side haggling.' },
    },
    {
      id: 'packaging',
      iconName: 'Award',
      title: { en: 'Tamper-evident packaging' },
      sub: { en: 'Every order sealed at the kitchen and again at handover.' },
    },
  ],
});
