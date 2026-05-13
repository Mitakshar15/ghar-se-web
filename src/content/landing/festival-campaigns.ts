import { z } from 'zod';
import { FestivalCampaignSchema, type FestivalCampaign } from '../schema/landing';

/**
 * Festival CTA campaigns.
 *
 * Each entry is a banner that runs above-the-fold on the buyer landing page
 * between `activeFrom` and `activeUntil`. When NO campaign is active, the
 * FestivalCTA component renders nothing — no point in a "Diwali in 182 days"
 * banner taking up screen real estate today.
 *
 * The countdown ("119 days away") is computed at render time against
 * `festivalDate` via `daysUntil()`, so it ticks daily without redeploys.
 *
 * Ordering rule: most-specific (narrowest window, soonest festival) FIRST.
 * `pickActive` returns the first match.
 *
 * To launch a new festival banner:
 *   1. Add an entry to this array.
 *   2. Set `festivalDate` (the actual day of the festival).
 *   3. Set `activeFrom` (when the banner should appear) and `activeUntil`
 *      (when it should auto-retire — usually the festival day itself).
 *   4. Write the eyebrow / headlinePrefix / sub / cta.
 *   5. Commit, preview, merge.
 *
 * Style note: `headlinePrefix` should end with " · " so the rendered countdown
 * reads "Ganesh Chaturthi · 119 days away." The component appends the
 * countdown and the trailing period.
 */
export const festivalCampaigns: FestivalCampaign[] = z
  .array(FestivalCampaignSchema)
  .parse([
    {
      id: 'naga-panchami-2026',
      name: { en: 'Naga Panchami' },
      emoji: '🐍',
      festivalDate: '2026-07-28',
      activeFrom: '2026-06-28',
      activeUntil: '2026-07-28',
      eyebrow: { en: 'Pre-orders open' },
      headlinePrefix: { en: 'Naga Panchami · ' },
      sub: { en: 'Tambittu, sweet puri, milk-rice — order from Sirsi makers.' },
      cta: { en: 'Browse festival kitchen' },
    },
    {
      id: 'ganesh-chaturthi-2026',
      name: { en: 'Ganesh Chaturthi' },
      emoji: '🪔',
      festivalDate: '2026-09-06',
      activeFrom: '2026-07-01',
      activeUntil: '2026-09-06',
      eyebrow: { en: 'Pre-orders open' },
      headlinePrefix: { en: 'Ganesh Chaturthi · ' },
      sub: { en: 'Modaka, holige, karanji — book your home cook now before slots fill up.' },
      cta: { en: 'Browse festival kitchen' },
    },
    {
      id: 'deepavali-2026',
      name: { en: 'Deepavali' },
      emoji: '🪔',
      festivalDate: '2026-11-08',
      activeFrom: '2026-10-01',
      activeUntil: '2026-11-08',
      eyebrow: { en: 'Pre-orders open' },
      headlinePrefix: { en: 'Deepavali · ' },
      sub: { en: 'Sweets boxes, chakli, mysore pak — book Sirsi makers now.' },
      cta: { en: 'Browse festival kitchen' },
    },
  ]);
