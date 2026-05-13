import { Apple, ArrowDown, Smartphone, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface HeroProps {
  onScrollTo: (id: string) => void;
}

export function Hero({ onScrollTo }: HeroProps) {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="dot-dark-bg absolute inset-0 opacity-40" />

      <div className="mx-auto grid max-w-page items-center gap-10 px-5 py-16 md:grid-cols-12 md:gap-16 md:px-10 md:py-24">
        <div className="md:col-span-7">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-light bg-green-lighter px-3 py-1.5">
            <span className="size-2 animate-pulse rounded-full bg-green" />
            <span className="text-[11px] font-extrabold tracking-[0.18em] text-green uppercase">
              Live in Sirsi
            </span>
          </div>
          <h1 className="font-display mb-6 text-[56px] leading-[1.0] font-black tracking-tight text-ink md:text-[88px]">
            Home-made,
            <br />
            <span className="relative inline-block">
              delivered
              <svg
                className="absolute bottom-0 left-0 w-full"
                viewBox="0 0 300 14"
                preserveAspectRatio="none"
                style={{ height: '14px', transform: 'translateY(8px)' }}
              >
                <path
                  d="M3 9 Q 80 2 160 6 T 297 5"
                  stroke="#F25F0C"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            .
          </h1>
          <p className="mb-8 max-w-[520px] text-[17px] leading-relaxed text-ink-2">
            From the kitchens of <strong className="text-ink">Sushma aunty</strong>,{' '}
            <strong className="text-ink">Lakshmi aunty</strong>, and 30+ other home cooks in Sirsi — straight
            to your door. Verified, escrow-protected, festival-ready.
          </p>

          <div className="mb-6 flex flex-wrap items-center gap-3">
            <button className="press inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[14px] font-extrabold text-white">
              <Apple className="size-4" />
              App Store
            </button>
            <button className="press inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[14px] font-extrabold text-white">
              <Smartphone className="size-4" />
              Google Play
            </button>
            <Button variant="ghost" size="lg" onClick={() => onScrollTo('how')} rightIcon={<ArrowDown className="size-4" />}>
              How it works
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[12px] text-ink-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-brass text-brass" strokeWidth={0} />
              ))}
              <span className="ml-1 font-extrabold text-ink">4.9</span>
            </div>
            <span>Trusted by 4,800+ households in Sirsi</span>
          </div>
        </div>

        <div className="relative md:col-span-5">
          <div
            className="aspect-[5/6] rounded-3xl border-[8px] border-ink shadow-2xl"
            style={{ background: 'linear-gradient(135deg, #0B5D4D 0%, #063C32 100%)' }}
          >
            <div className="dot-light-bg h-full w-full rounded-2xl p-6 text-white">
              <div className="text-[10px] font-extrabold tracking-[0.18em] text-brass uppercase">
                Today's kitchen
              </div>
              <div className="font-display mt-2 text-[36px] leading-none font-black tracking-tight">
                47 home cooks
              </div>
              <div className="mt-1 text-[13px] text-white/70">cooking right now in Sirsi</div>
              <div className="mt-8 space-y-3">
                {['Sushma · Karanji ready in 4 days', 'Lakshmi · Mavinakai pickle, 12 jars left', 'Vidya · Bilona ghee, 500ml'].map(
                  (l) => (
                    <div key={l} className="rounded-2xl bg-white/10 px-4 py-3 text-[12px] backdrop-blur">
                      {l}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

