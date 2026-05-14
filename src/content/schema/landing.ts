import { z } from 'zod';
import { LocalizedStringSchema } from '../primitives/locale';
import { DateWindowSchema } from '../primitives/temporal';
import { CTASchema, EmojiSchema } from '../primitives/rich';

/**
 * Schemas for the buyer-facing landing page. Each block lives in its own file
 * under `src/content/landing/`. Components import from there, never from the
 * schemas directly.
 *
 * NOTE: this PR establishes the schemas only — component migration happens in
 * subsequent PRs so each section can be reviewed independently.
 */

// ---- Hero ----
export const HeroSupportingCardSchema = z.object({
  id: z.string(),
  label: LocalizedStringSchema,
});

/**
 * A small white card that floats over the phone mockup (e.g. "₹460 in escrow ·
 * Safe till delivery"). Position is decided by the component — content carries
 * the copy, the icon name, and the tone.
 */
export const HeroFloatingCardSchema = z.object({
  id: z.string(),
  iconName: z.string(),
  tone: z.enum(['green', 'saffron', 'brass']),
  title: LocalizedStringSchema,
  sub: LocalizedStringSchema,
  /**
   * Optional "verified maker"-style card with a featured emoji and a star
   * rating chip. When set, the floating card renders the maker variant
   * instead of the icon-+-text variant. We only support one maker variant
   * at a time today.
   */
  maker: z
    .object({
      emoji: z.string(),
      emojiBg: z.string(),
      rating: z.number(),
      distance: LocalizedStringSchema,
    })
    .optional(),
});
export type HeroFloatingCard = z.infer<typeof HeroFloatingCardSchema>;

export const HeroContentSchema = z.object({
  eyebrow: LocalizedStringSchema,
  /** Ornamental Hindi/Kannada accent shown next to the eyebrow pill. */
  eyebrowAccent: LocalizedStringSchema.optional(),
  // Headline is split into two parts so we can underline the second word in JSX.
  headlinePrefix: LocalizedStringSchema,
  headlineUnderlined: LocalizedStringSchema,
  sub: LocalizedStringSchema,
  primaryCtas: z.array(CTASchema).min(1).max(3),
  /** Emoji avatars overlapping behind the star rating in the social-proof row. */
  socialAvatars: z.array(z.string()).max(8).optional(),
  socialProof: LocalizedStringSchema,
  /** Rating value (string) and review count text shown next to the avatars. */
  socialRating: z
    .object({
      stars: z.number().int().min(1).max(5),
      score: z.string(),
    })
    .optional(),
  supportingCards: z.array(HeroSupportingCardSchema).max(5),
  /** Floating UI fragment cards that overlap the phone mockup on the right. */
  floatingCards: z.array(HeroFloatingCardSchema).max(4).optional(),
});
export type HeroContent = z.infer<typeof HeroContentSchema>;

// ---- How it works ----
export const HowItWorksStepSchema = z.object({
  id: z.string(),
  title: LocalizedStringSchema,
  body: LocalizedStringSchema,
  iconName: z.string(), // lucide icon name (e.g. 'Search', 'Calendar', 'Truck')
});

export const HowItWorksContentSchema = z.object({
  eyebrow: LocalizedStringSchema,
  headline: LocalizedStringSchema, // may contain a placeholder for the italic word, handled by component
  italicWord: LocalizedStringSchema,
  steps: z.array(HowItWorksStepSchema).min(2).max(5),
});
export type HowItWorksContent = z.infer<typeof HowItWorksContentSchema>;

// ---- Sirsi Suraksha ----
export const SurakshaPillarSchema = z.object({
  id: z.string(),
  title: LocalizedStringSchema,
  sub: LocalizedStringSchema,
  iconName: z.string(),
});

export const SurakshaContentSchema = z.object({
  eyebrow: LocalizedStringSchema,
  headlinePrefix: LocalizedStringSchema,
  headlineItalic: LocalizedStringSchema,
  sub: LocalizedStringSchema,
  pillars: z.array(SurakshaPillarSchema).min(3).max(7),
});
export type SurakshaContent = z.infer<typeof SurakshaContentSchema>;

// ---- For Makers ----
export const ForMakersBenefitSchema = z.object({
  id: z.string(),
  title: LocalizedStringSchema,
  body: LocalizedStringSchema,
  iconName: z.string(),
});

export const ForMakersContentSchema = z.object({
  eyebrow: LocalizedStringSchema,
  headlinePrefix: LocalizedStringSchema,
  headlineItalic: LocalizedStringSchema,
  sub: LocalizedStringSchema,
  benefits: z.array(ForMakersBenefitSchema).min(2).max(6),
  primaryCtaLabel: LocalizedStringSchema,
  secondaryCtaLabel: LocalizedStringSchema,
  // The fine-print line is rendered with values resolved from business/terms.ts
  // — see the ForMakers component for how the template is filled in.
  fineprintTemplate: LocalizedStringSchema,
});
export type ForMakersContent = z.infer<typeof ForMakersContentSchema>;

// ---- Numbers (operational data values come from API; only labels are content) ----
export const NumberCardCopySchema = z.object({
  id: z.string(),
  label: LocalizedStringSchema,
  sub: LocalizedStringSchema,
  kannada: z.string().optional(), // The ornamental Kannada subtitle ("ಕುಟುಂಬಗಳು")
});

export const NumbersCopySchema = z.object({
  eyebrow: LocalizedStringSchema,
  headlinePrefix: LocalizedStringSchema,
  headlineItalic: LocalizedStringSchema,
  kannadaSubtitle: z.string().optional(),
  cards: z.array(NumberCardCopySchema).min(2).max(8),
});
export type NumbersCopy = z.infer<typeof NumbersCopySchema>;

// ---- Cities (live city list comes from API; narrative copy is content) ----
export const CitiesCopySchema = z.object({
  eyebrow: LocalizedStringSchema,
  headline: LocalizedStringSchema,
  liveSectionLabel: LocalizedStringSchema,
  comingSoonLabel: LocalizedStringSchema,
});
export type CitiesCopy = z.infer<typeof CitiesCopySchema>;

// ---- Testimonials ----
export const TestimonialSchema = z.object({
  id: z.string(),
  text: LocalizedStringSchema,
  name: z.string(),
  role: LocalizedStringSchema,
  note: LocalizedStringSchema,
});

export const TestimonialsContentSchema = z.object({
  eyebrow: LocalizedStringSchema,
  headlinePrefix: LocalizedStringSchema,
  headlineItalic: LocalizedStringSchema,
  items: z.array(TestimonialSchema).min(1).max(12),
});
export type TestimonialsContent = z.infer<typeof TestimonialsContentSchema>;

// ---- Festival campaigns (date-windowed) ----
export const FestivalCampaignSchema = DateWindowSchema.extend({
  id: z.string(),
  name: LocalizedStringSchema,
  emoji: EmojiSchema,
  // The actual festival date (different from when the CTA goes live/retires).
  // Used for the countdown calculation.
  festivalDate: z.string(), // ISO date
  eyebrow: LocalizedStringSchema,
  headlinePrefix: LocalizedStringSchema, // "Ganesh Chaturthi · "
  sub: LocalizedStringSchema,
  cta: LocalizedStringSchema,
});
export type FestivalCampaign = z.infer<typeof FestivalCampaignSchema>;

// ---- Marquee (date-windowed dish strip) ----
export const MarqueeCampaignSchema = DateWindowSchema.extend({
  id: z.string(),
  items: z.array(LocalizedStringSchema).min(3).max(20),
});
export type MarqueeCampaign = z.infer<typeof MarqueeCampaignSchema>;

// ---- Download CTA ----
export const DownloadCTAContentSchema = z.object({
  headlinePrefix: LocalizedStringSchema,
  headlineItalic: LocalizedStringSchema,
  sub: LocalizedStringSchema,
  appStoreLabel: LocalizedStringSchema,
  playStoreLabel: LocalizedStringSchema,
});
export type DownloadCTAContent = z.infer<typeof DownloadCTAContentSchema>;

// ---- Footer ----
export const FooterColumnSchema = z.object({
  heading: LocalizedStringSchema,
  links: z.array(
    z.object({
      label: LocalizedStringSchema,
      href: z.string(),
    }),
  ),
});

export const FooterContentSchema = z.object({
  tagline: LocalizedStringSchema,
  description: LocalizedStringSchema,
  columns: z.array(FooterColumnSchema).min(1).max(5),
  // Footer legal/info row — rendered as-is, no template resolution.
  legalLinks: z.array(
    z.object({
      label: LocalizedStringSchema,
      href: z.string(),
    }),
  ),
  copyright: LocalizedStringSchema,
});
export type FooterContent = z.infer<typeof FooterContentSchema>;
