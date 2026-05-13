import { ArrowRight, Sparkles } from 'lucide-react';

export function FestivalCTA() {
  return (
    <section className="relative overflow-hidden py-16" style={{ background: '#F25F0C' }}>
      <div className="absolute -top-12 -right-12 text-[200px] opacity-20" aria-hidden>
        🪔
      </div>
      <div className="relative mx-auto max-w-page px-5 md:px-10">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 backdrop-blur">
              <Sparkles className="size-3.5 text-white" strokeWidth={2.5} />
              <span className="text-[11px] font-extrabold tracking-[0.18em] text-white uppercase">
                Pre-orders open
              </span>
            </div>
            <h2 className="font-display text-[36px] leading-[1.05] font-black tracking-tight text-white md:text-[52px]">
              Ganesh Chaturthi · <span className="font-serif-italic">119 days</span> away.
            </h2>
            <p className="mt-2 text-[14px] text-white/90">
              Modaka, holige, karanji — book your home cook now before slots fill up.
            </p>
          </div>
          <button className="press inline-flex items-center gap-2 rounded-full bg-white px-6 py-4 text-[14px] font-extrabold text-ink">
            Browse festival kitchen
            <ArrowRight className="size-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
