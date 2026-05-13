import { HowItWorksContentSchema, type HowItWorksContent } from '../schema/landing';

/**
 * "How it works" — the three-step explainer. Stable content; edits are rare.
 *
 * The `iconName` field is a string that the component maps to a lucide-react
 * icon. The component owns that mapping so we keep tree-shaking — only icons
 * actually referenced get bundled.
 */
export const howItWorks: HowItWorksContent = HowItWorksContentSchema.parse({
  eyebrow: { en: 'How it works' },
  headline: { en: 'Three steps to a home-cooked festival.' },
  italicWord: { en: 'home-cooked' },
  steps: [
    {
      id: 'discover',
      title: { en: 'Discover a maker' },
      body: { en: 'Browse 47 verified home cooks in Sirsi. Filter by festival, dietary, or distance.' },
      iconName: 'Search',
    },
    {
      id: 'preorder',
      title: { en: 'Pre-order with lead time' },
      body: { en: 'Booking opens 60 days before each festival. Pick your delivery date, pay via UPI.' },
      iconName: 'Calendar',
    },
    {
      id: 'deliver',
      title: { en: 'Cooked fresh & delivered' },
      body: { en: 'Your maker cooks to order. Tamper-evident packaging. Money in escrow until you confirm.' },
      iconName: 'Truck',
    },
  ],
});
