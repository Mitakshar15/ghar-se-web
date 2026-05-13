import { Shield, BadgeCheck, Lock, RotateCw, Award } from 'lucide-react';

const PILLARS = [
  { Icon: BadgeCheck, title: 'KYC verified makers', sub: 'Aadhaar + PAN linked. Real names, real kitchens.' },
  { Icon: Shield, title: 'Hygiene grading', sub: 'In-person inspections. Public A+/A/B grade on every profile.' },
  { Icon: Lock, title: 'Escrow payments', sub: 'Your money is held safely. Released only after you confirm delivery.' },
  { Icon: RotateCw, title: '24-hour refund window', sub: 'Not happy? Full refund, no maker-side questions, no buyer-side haggling.' },
  { Icon: Award, title: 'Tamper-evident packaging', sub: 'Every order sealed at the kitchen and again at handover.' },
];

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
                Sirsi Suraksha
              </span>
            </div>
            <h2 className="font-display text-[40px] leading-[1.05] font-black tracking-tight text-white md:text-[60px]">
              Trust, <span className="font-serif-italic text-brass">built in.</span>
            </h2>
            <p className="mt-6 max-w-[420px] text-[15px] leading-relaxed text-white/70">
              Five quiet promises that protect both buyer and maker. Not bolted on — written into how Ghar Se
              works.
            </p>
          </div>
          <div className="grid gap-4 md:col-span-7 md:grid-cols-2">
            {PILLARS.map(({ Icon, title, sub }) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-brass/20">
                  <Icon className="size-5 text-brass" strokeWidth={2.2} />
                </div>
                <div className="text-[14px] font-extrabold text-white">{title}</div>
                <div className="mt-1 text-[12px] leading-relaxed text-white/60">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
