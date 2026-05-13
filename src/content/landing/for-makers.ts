import { ForMakersContentSchema, type ForMakersContent } from '../schema/landing';
import { payoutWindowProse } from '../business/terms';

/**
 * "For makers" section — the recruiting pitch on the buyer landing page.
 *
 * Fine print is generated separately via forMakersFineprint() since it
 * composes BUSINESS terms. The component imports both.
 *
 * The "Direct bank payouts" benefit body interpolates the payout window so it
 * tracks with business/terms.ts.
 */
export const forMakers: ForMakersContent = ForMakersContentSchema.parse({
  eyebrow: { en: 'For home cooks' },
  headlinePrefix: { en: 'Earn from your\n' },
  headlineItalic: { en: 'kitchen' },
  sub: {
    en: 'The marketplace built for home cooks. Verified buyers, escrow payments, festival pre-orders, free FSSAI registration. Keep cooking — we handle the rest.',
  },
  benefits: [
    {
      id: 'earn',
      iconName: 'Wallet',
      title: { en: 'Earn ₹15K – ₹50K / month' },
      body: { en: 'Average maker earnings in year one.' },
    },
    {
      id: 'payouts',
      iconName: 'Lock',
      title: { en: 'Direct bank payouts' },
      body: { en: `Money in your account every ${payoutWindowProse()} after delivery.` },
    },
    {
      id: 'fssai',
      iconName: 'Shield',
      title: { en: 'We handle FSSAI' },
      body: { en: 'Free registration. Hygiene grading included.' },
    },
    {
      id: 'demand',
      iconName: 'TrendingUp',
      title: { en: 'Festival demand surges' },
      body: { en: 'Pre-orders 60 days out so you can plan and prep calmly.' },
    },
  ],
  primaryCtaLabel: { en: 'Apply to be a maker' },
  secondaryCtaLabel: { en: 'Sign in to your kitchen' },
  // Not used by the component anymore (it calls forMakersFineprint() directly),
  // but kept in the schema so future authors can override if needed.
  fineprintTemplate: {
    en: 'Free to join · ₹{deposit} refundable security deposit · {commission}% commission · No subscription',
  },
});
