import { HeroContentSchema, type HeroContent } from '../schema/landing';

/**
 * Hero — the above-the-fold marketing block on the buyer landing.
 *
 * NOTE: a few values stay in the Hero component itself because they're
 * operational data, not content:
 *   - The "47 home cooks cooking right now" count — comes from API later.
 *   - The "4.9" rating star — same.
 * Both are deliberately not in this content file.
 *
 * The "supportingCards" are flavour copy in the side mockup. They DO live
 * in content because they're editorial choices (which dishes to feature
 * in the showcase) rather than live data.
 */
export const hero: HeroContent = HeroContentSchema.parse({
  eyebrow: { en: 'Live in Sirsi' },
  // Headline is split: "Home-made," (newline) "delivered" (underlined).
  // The component renders this layout literally.
  headlinePrefix: { en: 'Home-made,' },
  headlineUnderlined: { en: 'delivered' },
  sub: {
    en: 'From the kitchens of Sushma aunty, Lakshmi aunty, and 30+ other home cooks in Sirsi — straight to your door. Verified, escrow-protected, festival-ready.',
  },
  primaryCtas: [
    { label: { en: 'App Store' }, href: '#download' },
    { label: { en: 'Google Play' }, href: '#download' },
    { label: { en: 'How it works' }, href: '#how', variant: 'ghost' },
  ],
  socialProof: { en: 'Trusted by 4,800+ households in Sirsi' },
  supportingCards: [
    { id: 'sushma', label: { en: 'Sushma · Karanji ready in 4 days' } },
    { id: 'lakshmi', label: { en: 'Lakshmi · Mavinakai pickle, 12 jars left' } },
    { id: 'vidya', label: { en: 'Vidya · Bilona ghee, 500ml' } },
  ],
});
