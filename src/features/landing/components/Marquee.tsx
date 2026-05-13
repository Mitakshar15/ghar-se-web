import { useMemo } from 'react';

import { marqueeCampaigns } from '@/content/landing/marquee';
import { pickActive, localized } from '@/content';

/**
 * Marquee — scrolling dish strip below the hero.
 *
 * Renders the dish list from whichever marquee campaign is currently active
 * (date-windowed). The evergreen entry at the end of the array is the
 * fallback when no seasonal campaign matches `now`.
 *
 * The campaign list is in src/content/landing/marquee.ts. Edit there to swap
 * which dishes scroll across the strip.
 */
export function Marquee() {
  // Memoize the resolved campaign per page-mount. `now` doesn't change while
  // the user is on the page, and we don't want a re-render to re-pick.
  const items = useMemo(() => {
    const active = pickActive(marqueeCampaigns);
    // pickActive should always find at least the evergreen entry — but guard
    // anyway so a misconfigured content file doesn't crash the landing.
    return (active?.items ?? []).map((s) => localized(s));
  }, []);

  if (items.length === 0) return null;

  return (
    <section
      className="overflow-hidden border-y border-line py-5"
      style={{ background: '#063C32', color: '#FBF7F0' }}
    >
      {/* Duplicate the list so the CSS marquee animation can loop seamlessly. */}
      <div className="flex animate-marquee">
        {[...items, ...items].map((label, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-5 text-[15px] font-extrabold whitespace-nowrap"
          >
            {label}
            <span className="text-brass">·</span>
          </div>
        ))}
      </div>
    </section>
  );
}
