import { Apple, ArrowDown, Star, Bell, Lock, BadgeCheck, type LucideIcon } from 'lucide-react';

import { hero } from '@/content/landing/hero';
import { localized } from '@/content';
import { PhoneMockup } from '@/components/marketing/PhoneMockup';
import { MiniHomeScreen } from '@/components/marketing/MiniHomeScreen';
import type { HeroFloatingCard } from '@/content/schema/landing';

interface HeroProps {
  onScrollTo: (id: string) => void;
}

// Icons referenced from content. Adding a new floating card with a new icon?
// Import it here and add to the map.
const FLOATING_ICONS: Record<string, LucideIcon> = {
  Lock,
  Bell,
  BadgeCheck,
};

const TONE_COLORS: Record<HeroFloatingCard['tone'], string> = {
  green: '#0B5D4D',
  saffron: '#F25F0C',
  brass: '#C8A04D',
};
const TONE_BACKGROUNDS: Record<HeroFloatingCard['tone'], string> = {
  green: '#F4F9F7',
  saffron: '#FFF0E5',
  brass: '#FAF3E0',
};

// Hand-curated positions for each floating card on the desktop layout. The
// content order doesn't have to match this — we key by `id`.
const FLOATING_POSITIONS: Record<string, string> = {
  escrow: 'top-[8%] -left-2 md:-left-12',
  maker: 'top-[40%] -right-2 md:-right-6',
  order: 'bottom-[8%] -left-2 md:-left-8',
};
const FLOATING_ANIMATION: Record<string, string> = {
  escrow: 'ani-float-rev',
  maker: 'ani-float',
  order: 'ani-float',
};
const FLOATING_DELAY: Record<string, string> = {
  order: '1s',
};

export function Hero({ onScrollTo }: HeroProps) {
  return (
    <section
      id="top"
      className="relative overflow-hidden"
      style={{ background: '#FBF7F0' }}
    >
      {/* Texture + decorative blobs */}
      <div className="dot-dark-bg absolute inset-0 opacity-30" />
      <div
        className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #C8A04D, transparent 70%)' }}
      />
      <div
        className="absolute top-1/3 -left-20 h-[400px] w-[400px] rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, #F25F0C, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-page px-5 pt-12 pb-16 md:px-10 md:pt-20 md:pb-24">
        <div className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
          {/* Left: copy */}
          <div className="md:col-span-7">
            {/* Eyebrow + Hindi/Kannada accent */}
            <div className="mb-6 flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-green/30 bg-green-light px-3 py-1.5">
                <span className="ani-pulse-soft size-1.5 rounded-full bg-green" />
                <span className="text-[11px] font-bold tracking-widest text-green uppercase">
                  {localized(hero.eyebrow)}
                </span>
              </div>
              {hero.eyebrowAccent && (
                <div className="font-serif-italic hidden text-[14px] text-brass md:block">
                  {localized(hero.eyebrowAccent)}
                </div>
              )}
            </div>

            {/* Headline */}
            <h1
              className="font-display mb-6 leading-[0.95] font-black tracking-tight text-ink"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
            >
              {localized(hero.headlinePrefix)}
              <br />
              <span className="relative inline-block">
                <span className="text-green">{localized(hero.headlineUnderlined)}</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="14"
                  viewBox="0 0 300 14"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path
                    d="M2 8 Q75 2, 150 6 T298 4"
                    stroke="#F25F0C"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
              .
            </h1>

            <p className="mb-8 max-w-[520px] text-[16px] leading-relaxed text-ink-2 md:text-[18px]">
              {localized(hero.sub)}
            </p>

            {/* Store-button CTAs */}
            <div className="mb-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              {hero.primaryCtas.map((cta, i) => {
                const isApple = cta.label.en === 'App Store';
                const isPlay = cta.label.en === 'Google Play';
                return (
                  <button
                    key={cta.label.en}
                    onClick={() => cta.href.startsWith('#') && onScrollTo(cta.href.slice(1))}
                    className="press hover-lift inline-flex items-center justify-center gap-2.5 rounded-full bg-ink px-6 py-4 text-[14px] font-bold text-white"
                  >
                    {isApple && <Apple className="size-5" fill="white" strokeWidth={0} />}
                    {isPlay && <PlayStoreGlyph />}
                    {!isApple && !isPlay && i === 0 && <Apple className="size-5" fill="white" strokeWidth={0} />}
                    <span className="text-left leading-tight">
                      {cta.subLabel && (
                        <span className="block text-[10px] font-medium opacity-80">
                          {localized(cta.subLabel)}
                        </span>
                      )}
                      <span className="block text-[14px] font-extrabold">{localized(cta.label)}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Social proof — avatars + stars + household count */}
            <div className="flex items-center gap-4">
              {hero.socialAvatars && hero.socialAvatars.length > 0 && (
                <div className="flex -space-x-3">
                  {hero.socialAvatars.map((emoji, i) => (
                    <div
                      key={i}
                      className="flex size-10 items-center justify-center rounded-full border-2 text-lg shadow-sm"
                      style={{
                        background: ['#FFE0E0', '#FFF8E1', '#FFE8D6', '#E8F3F0'][i % 4],
                        borderColor: '#FBF7F0',
                      }}
                    >
                      {emoji}
                    </div>
                  ))}
                </div>
              )}
              <div>
                {hero.socialRating && (
                  <div className="mb-0.5 flex items-center gap-0.5">
                    {Array.from({ length: hero.socialRating.stars }).map((_, i) => (
                      <Star key={i} className="size-3.5 fill-brass text-brass" strokeWidth={0} />
                    ))}
                    <span className="ml-1 text-[13px] font-bold text-ink">
                      {hero.socialRating.score}
                    </span>
                  </div>
                )}
                <div className="text-[12px] text-ink-2">{localized(hero.socialProof)}</div>
              </div>
            </div>
          </div>

          {/* Right: phone mockup with floating UI fragments */}
          <div className="relative h-[540px] md:col-span-5 md:h-[640px]">
            <PhoneMockup rotation="4deg">
              <MiniHomeScreen />
            </PhoneMockup>

            {hero.floatingCards?.map((card) => (
              <FloatingCard key={card.id} card={card} />
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="mt-12 hidden justify-center md:flex">
          <button
            onClick={() => onScrollTo('how')}
            className="press flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-ink-2 uppercase"
          >
            <span>Scroll</span>
            <div className="h-px w-12 bg-ink-3" />
            <ArrowDown className="size-3.5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* -----------------------------------------------------------------------
 * Floating card — renders one of two variants:
 *   1. Icon + title + sub (escrow, order-confirmed)
 *   2. Maker preview: emoji thumbnail + name + rating chip + verified badge
 * -------------------------------------------------------------------- */
function FloatingCard({ card }: { card: HeroFloatingCard }) {
  const position = FLOATING_POSITIONS[card.id] ?? 'top-[20%] right-0';
  const anim = FLOATING_ANIMATION[card.id] ?? 'ani-float';
  const delay = FLOATING_DELAY[card.id];
  const Icon = FLOATING_ICONS[card.iconName] ?? Bell;
  const accentColor = TONE_COLORS[card.tone];
  const accentBg = TONE_BACKGROUNDS[card.tone];

  // Maker-variant when content includes a `maker` block.
  if (card.maker) {
    return (
      <div className={`absolute ${position} ${anim} hidden sm:block`} style={delay ? { animationDelay: delay } : undefined}>
        <div
          className="flex w-[220px] items-center gap-2.5 rounded-2xl bg-white p-3 shadow-2xl"
          style={{ border: '1px solid #EBEAE5' }}
        >
          <div
            className="flex size-10 flex-shrink-0 items-center justify-center rounded-lg text-2xl"
            style={{ background: card.maker.emojiBg }}
            aria-hidden
          >
            {card.maker.emoji}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[11px] font-extrabold text-ink">{localized(card.title)}</div>
            <div className="flex items-center gap-1 text-[10px] text-ink-2">
              <Star className="size-2.5 fill-brass text-brass" strokeWidth={0} />
              {localized(card.sub)}
            </div>
          </div>
          <BadgeCheck className="size-4 flex-shrink-0" style={{ color: '#0B5D4D' }} fill="#0B5D4D" strokeWidth={0} />
        </div>
      </div>
    );
  }

  return (
    <div className={`absolute ${position} ${anim} hidden sm:block`} style={delay ? { animationDelay: delay } : undefined}>
      <div
        className="flex w-[210px] items-center gap-2.5 rounded-2xl bg-white p-3 shadow-2xl"
        style={{ border: '1px solid #EBEAE5' }}
      >
        <div
          className="flex size-9 flex-shrink-0 items-center justify-center rounded-full"
          style={{ background: accentBg }}
        >
          <Icon className="size-4" style={{ color: accentColor }} strokeWidth={2.5} />
        </div>
        <div>
          <div className="text-[11px] font-extrabold" style={{ color: accentColor }}>
            {localized(card.title)}
          </div>
          <div className="text-[10px] text-ink-2">{localized(card.sub)}</div>
        </div>
      </div>
    </div>
  );
}

/** A tidied-up version of the Google Play logo built from four colour wedges. */
function PlayStoreGlyph() {
  return (
    <svg width="20" height="22" viewBox="0 0 20 22" fill="none" aria-hidden>
      <path d="M0.5 1.5 V20.5 L13 11 Z" fill="#F25F0C" />
      <path d="M0.5 1.5 L13 11 L17 7 Z" fill="#34A853" />
      <path d="M0.5 20.5 L13 11 L17 15 Z" fill="#EA4335" />
      <path d="M17 7 L19.5 9.5 Q20 10.5 19.5 12.5 L17 15 L13 11 Z" fill="#FBBC04" />
    </svg>
  );
}
