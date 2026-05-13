import { useNavigate } from 'react-router-dom';
import { ArrowRight, Wallet, Lock, Shield, TrendingUp, ChefHat, type LucideIcon } from 'lucide-react';

import { ROUTES } from '@/config/routes';
import { forMakers } from '@/content/landing/for-makers';
import { forMakersFineprint, localized } from '@/content';

const ICONS: Record<string, LucideIcon> = {
  Wallet,
  Lock,
  Shield,
  TrendingUp,
};

export function ForMakers() {
  const navigate = useNavigate();
  const headlinePrefix = localized(forMakers.headlinePrefix);
  // Headline split: prefix may contain a newline placeholder. Render literally.
  const [headLine1, headLine2] = headlinePrefix.split('\n');

  return (
    <section id="for-makers" className="relative overflow-hidden py-20 md:py-32" style={{ background: '#171717' }}>
      <div className="dot-brass-bg absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-page px-5 md:px-10">
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <div
              className="mb-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5"
              style={{ background: 'rgba(200,160,77,0.15)', border: '1px solid rgba(200,160,77,0.25)' }}
            >
              <ChefHat className="size-3.5 text-brass" strokeWidth={2.5} />
              <span className="text-[11px] font-extrabold tracking-[0.18em] text-brass uppercase">
                {localized(forMakers.eyebrow)}
              </span>
            </div>
            <h2 className="font-display text-[52px] leading-[1] font-black tracking-tight text-white md:text-[72px]">
              {headLine1} {headLine2 && <br />}
              <span className="font-serif-italic text-brass">{localized(forMakers.headlineItalic)}</span>.
            </h2>
            <p className="mt-5 max-w-[480px] text-[16px] leading-relaxed text-white/70">
              {localized(forMakers.sub)}
            </p>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {forMakers.benefits.map((b) => {
                const Icon = ICONS[b.iconName] ?? Wallet;
                return (
                  <div key={b.id} className="flex items-start gap-3">
                    <div
                      className="flex size-10 flex-shrink-0 items-center justify-center rounded-xl"
                      style={{ background: 'rgba(200,160,77,0.15)' }}
                    >
                      <Icon className="size-5 text-brass" strokeWidth={2.2} />
                    </div>
                    <div>
                      <div className="text-[14px] font-extrabold text-white">{localized(b.title)}</div>
                      <div className="text-[12px] leading-relaxed text-white/60">{localized(b.body)}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button className="press inline-flex items-center justify-center gap-2 rounded-full bg-brass px-6 py-4 text-[14px] font-extrabold text-ink">
                {localized(forMakers.primaryCtaLabel)}
                <ArrowRight className="size-4" strokeWidth={2.5} />
              </button>
              <button
                onClick={() => navigate(ROUTES.login)}
                className="press inline-flex items-center justify-center gap-2 rounded-full border-2 px-6 py-4 text-[14px] font-bold text-white"
                style={{ borderColor: 'rgba(255,255,255,0.2)' }}
              >
                {localized(forMakers.secondaryCtaLabel)}
                <ArrowRight className="size-4" strokeWidth={2.5} />
              </button>
            </div>
            <p className="mt-4 text-[11px] text-white/40">{forMakersFineprint()}</p>
          </div>

          {/* Right column: stylised "dashboard" card — illustrative marketing,
              not real data, so values stay inline. */}
          <div className="md:col-span-5">
            <div className="relative rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="text-[10px] font-extrabold tracking-[0.18em] text-brass uppercase">This month</div>
              <div className="font-display mt-2 text-[42px] leading-none font-black tracking-tight text-white">
                ₹42,380
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-[12px] text-white/70">
                <TrendingUp className="size-3.5 text-brass" strokeWidth={2.5} />
                <span className="font-extrabold text-brass">+18%</span> vs last month
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { k: 'Orders', v: 47 },
                  { k: 'Rating', v: '4.9' },
                  { k: 'Repeat', v: 28 },
                ].map((c) => (
                  <div key={c.k} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                    <div className="text-[20px] font-extrabold text-white">{c.v}</div>
                    <div className="text-[9px] font-bold tracking-wider text-white/50 uppercase">{c.k}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
