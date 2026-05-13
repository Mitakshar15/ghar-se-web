import { z } from 'zod';
import { MarqueeCampaignSchema, type MarqueeCampaign } from '../schema/landing';

/**
 * Marquee — the scrolling dish strip below the hero.
 *
 * Date-windowed: each entry is active between `activeFrom` and `activeUntil`.
 * The component calls `pickActive(marqueeCampaigns, now)` and renders whichever
 * campaign is currently live. The last entry is the evergreen fallback with
 * no `activeFrom`/`activeUntil`, so it always wins when nothing else matches.
 *
 * Ordering rule: most-specific (narrowest window) campaigns FIRST, evergreen
 * fallback LAST. `pickActive` returns the first match.
 *
 * To launch a new seasonal strip:
 *   1. Add an entry above the evergreen one.
 *   2. Set `activeFrom`/`activeUntil` to the campaign window.
 *   3. Curate the dish list to highlight what's being featured.
 *   4. Commit, preview, merge.
 */
export const marqueeCampaigns: MarqueeCampaign[] = z
  .array(MarqueeCampaignSchema)
  .parse([
    {
      id: 'ganesh-chaturthi-2026',
      activeFrom: '2026-07-15',
      activeUntil: '2026-09-06',
      items: [
        { en: '🥥 Kayi modaka' },
        { en: '🫓 Holige' },
        { en: '🥟 Karanji' },
        { en: '🪔 Festival hampers' },
        { en: '🫙 Bilona ghee' },
        { en: '🧁 Mysore pak' },
        { en: '🌿 Banana leaves' },
        { en: '🥥 Coconut burfi' },
      ],
    },
    {
      id: 'deepavali-2026',
      activeFrom: '2026-10-15',
      activeUntil: '2026-11-08',
      items: [
        { en: '🪔 Deepavali sweets box' },
        { en: '🥨 Chakli' },
        { en: '🧁 Mysore pak' },
        { en: '🥜 Mixture' },
        { en: '🍯 Boondi laddu' },
        { en: '🥟 Karanji' },
        { en: '🫓 Holige' },
        { en: '🫙 Pure ghee' },
      ],
    },
    {
      id: 'evergreen',
      // No activeFrom / activeUntil — always live as the fallback.
      items: [
        { en: '🥥 Karanji' },
        { en: '🫓 Holige' },
        { en: '🥨 Chakli' },
        { en: '🫙 Bilona ghee' },
        { en: '🌶️ Mavinakai pickle' },
        { en: '🪔 Festival hampers' },
        { en: '🍯 Stone-ground masalas' },
        { en: '🧁 Mysore pak' },
      ],
    },
  ]);
