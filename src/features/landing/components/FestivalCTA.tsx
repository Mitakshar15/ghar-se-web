import { useMemo } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

import { festivalCampaigns } from '@/content/landing/festival-campaigns';
import { pickActive, localized, daysUntil, formatDaysAway } from '@/content';

/**
 * FestivalCTA — above-the-fold seasonal banner.
 *
 * Renders nothing when no campaign is currently active — we don't want a
 * "Diwali in 182 days" banner taking up screen real estate today.
 *
 * The countdown ("119 days away") is computed at render time against the
 * campaign's `festivalDate`, so it ticks daily without redeploying. The
 * `headlinePrefix` (e.g. "Ganesh Chaturthi · ") and the countdown italic
 * combine to render "Ganesh Chaturthi · 119 days away."
 *
 * Edit src/content/landing/festival-campaigns.ts to launch a new banner.
 */
export function FestivalCTA() {
  const campaign = useMemo(() => pickActive(festivalCampaigns), []);

  if (!campaign) return null;

  const days = daysUntil(campaign.festivalDate);
  const countdownLabel = formatDaysAway(days);

  return (
    <section className="relative overflow-hidden py-16" style={{ background: '#F25F0C' }}>
      <div className="absolute -top-12 -right-12 text-[200px] opacity-20" aria-hidden>
        {campaign.emoji}
      </div>
      <div className="relative mx-auto max-w-page px-5 md:px-10">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 backdrop-blur">
              <Sparkles className="size-3.5 text-white" strokeWidth={2.5} />
              <span className="text-[11px] font-extrabold tracking-[0.18em] text-white uppercase">
                {localized(campaign.eyebrow)}
              </span>
            </div>
            <h2 className="font-display text-[36px] leading-[1.05] font-black tracking-tight text-white md:text-[52px]">
              {localized(campaign.headlinePrefix)}
              <span className="font-serif-italic">{countdownLabel}</span>.
            </h2>
            <p className="mt-2 text-[14px] text-white/90">{localized(campaign.sub)}</p>
          </div>
          <button className="press inline-flex items-center gap-2 rounded-full bg-white px-6 py-4 text-[14px] font-extrabold text-ink">
            {localized(campaign.cta)}
            <ArrowRight className="size-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
