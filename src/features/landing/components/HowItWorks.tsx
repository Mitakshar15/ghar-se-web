import { Search, Calendar, Truck } from 'lucide-react';

const STEPS = [
  {
    Icon: Search,
    title: 'Discover a maker',
    body: 'Browse 47 verified home cooks in Sirsi. Filter by festival, dietary, or distance.',
  },
  {
    Icon: Calendar,
    title: 'Pre-order with lead time',
    body: 'Booking opens 60 days before each festival. Pick your delivery date, pay via UPI.',
  },
  {
    Icon: Truck,
    title: 'Cooked fresh & delivered',
    body: 'Your maker cooks to order. Tamper-evident packaging. Money in escrow until you confirm.',
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative py-24 md:py-32" style={{ background: '#FBF7F0' }}>
      <div className="mx-auto max-w-page px-5 md:px-10">
        <div className="mb-12 text-center md:mb-16">
          <div className="mb-4 text-[11px] font-extrabold tracking-[0.25em] text-saffron uppercase">
            How it works
          </div>
          <h2 className="font-display text-[40px] leading-[1.05] font-black tracking-tight text-ink md:text-[60px]">
            Three steps to a <span className="font-serif-italic text-green">home-cooked</span> festival.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {STEPS.map((s, i) => {
            const Icon = s.Icon;
            return (
              <div key={s.title} className="relative rounded-3xl border border-line bg-canvas p-8 hover-lift">
                <div className="font-display absolute -top-3 -left-3 flex size-14 items-center justify-center rounded-full bg-saffron text-[20px] font-black text-white">
                  {i + 1}
                </div>
                <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-green-lighter">
                  <Icon className="size-6 text-green" strokeWidth={2.2} />
                </div>
                <h3 className="font-display mb-2 text-[22px] font-black tracking-tight text-ink">{s.title}</h3>
                <p className="text-[14px] leading-relaxed text-ink-2">{s.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
