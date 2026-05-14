import { HeroContentSchema, type HeroContent } from '../schema/landing';

/**
 * Hero — the above-the-fold marketing block on the buyer landing.
 *
 * Right column is a PhoneMockup containing the MiniHomeScreen (a stylised
 * preview of the buyer app's home tab). Three floating cards overlap the
 * mockup to evoke real in-app moments (escrow, maker card, order confirmed).
 *
 * Operational data NOT in this file (stays in components or pulls from API):
 *   - "47 home cooks" / "4.9★" rating value / "4,800+ households" — operational
 *   - The festival inside the phone mockup pulls from the active festival
 *     campaign in festival-campaigns.ts so the two surfaces stay aligned
 */
export const hero: HeroContent = HeroContentSchema.parse({
  eyebrow: { en: 'Live in Sirsi' },
  eyebrowAccent: { en: 'घर से' },

  headlinePrefix: { en: 'Home-made,' },
  headlineUnderlined: { en: 'delivered' },

  sub: {
    en: 'From the kitchens of Sushma aunty, Lakshmi aunty, and 30+ other home cooks in Sirsi — straight to your door. Verified, escrow-protected, festival-ready.',
  },

  primaryCtas: [
    {
      label: { en: 'App Store' },
      subLabel: { en: 'Download on' },
      href: '#download',
    },
    {
      label: { en: 'Google Play' },
      subLabel: { en: 'Get it on' },
      href: '#download',
    },
  ],

  // The four overlapping emoji avatars behind the rating row.
  socialAvatars: ['😊', '🤗', '😋', '😍'],
  socialRating: { stars: 5, score: '4.9' },
  socialProof: { en: 'Trusted by 4,800+ households in Sirsi' },

  // Kept for backward compatibility with the previous design; not rendered
  // anymore now that the phone mockup replaces the abstract card.
  supportingCards: [],

  floatingCards: [
    {
      id: 'escrow',
      iconName: 'Lock',
      tone: 'green',
      title: { en: '₹460 in escrow' },
      sub: { en: 'Safe till delivery' },
    },
    {
      id: 'maker',
      iconName: 'BadgeCheck',
      tone: 'brass',
      title: { en: "Sushma's Kitchen" },
      sub: { en: '4.9 · 1.2 km' },
      maker: {
        emoji: '🥥',
        emojiBg: '#FFE8D6',
        rating: 4.9,
        distance: { en: '4.9 · 1.2 km' },
      },
    },
    {
      id: 'order',
      iconName: 'Bell',
      tone: 'saffron',
      title: { en: 'Order confirmed!' },
      sub: { en: 'Ready by May 17, 10 AM' },
    },
  ],
});
