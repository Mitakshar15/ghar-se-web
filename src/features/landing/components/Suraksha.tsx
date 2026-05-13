import { Shield, BadgeCheck, Lock, RotateCw, Award, type LucideIcon } from 'lucide-react';

import { suraksha } from '@/content/landing/suraksha';
import { localized } from '@/content';

const ICONS: Record<string, LucideIcon> = {
  Shield,
  BadgeCheck,
  Lock,
  RotateCw,
  Award,
};

export function Suraksha() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32" style={{ background: '#0B5D4D' }}>
      <div className="dot-light-bg absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-page px-5 md:px-10">
        <div className="grid items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brass/40 bg-brass/15 px-3 py-1.5">
              <Shield className="size-3.5 text-brass" strokeWidth={2.5} />
              <span className="text-[11px] font-extrabold tracking-[0.18em] text-brass uppercase">
                {localized(suraksha.eyebrow)}
              </span>
            </div>
            <h2 className="font-display text-[40px] leading-[1.05] font-black tracking-tight text-white md:text-[60px]">
              {localized(suraksha.headlinePrefix)}
              <span className="font-serif-italic text-brass">{localized(suraksha.headlineItalic)}</span>
            </h2>
            <p className="mt-6 max-w-[420px] text-[15px] leading-relaxed text-white/70">
              {localized(suraksha.sub)}
            </p>
          </div>
          <div className="grid gap-4 md:col-span-7 md:grid-cols-2">
            {suraksha.pillars.map((p) => {
              const Icon = ICONS[p.iconName] ?? Shield;
              return (
                <div key={p.id} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-brass/20">
                    <Icon className="size-5 text-brass" strokeWidth={2.2} />
                  </div>
                  <div className="text-[14px] font-extrabold text-white">{localized(p.title)}</div>
                  <div className="mt-1 text-[12px] leading-relaxed text-white/60">{localized(p.sub)}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
