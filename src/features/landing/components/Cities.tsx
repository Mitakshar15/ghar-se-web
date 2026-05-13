import { MapPin } from 'lucide-react';

const LIVE = [{ name: 'Sirsi', sub: 'Headquarters', makers: 47 }];
const SOON = [
  { name: 'Kumta', months: '3 months' },
  { name: 'Honnavar', months: '4 months' },
  { name: 'Yellapur', months: '5 months' },
  { name: 'Karwar', months: '6 months' },
  { name: 'Dandeli', months: '7 months' },
];

export function Cities() {
  return (
    <section id="cities" className="py-24 md:py-32" style={{ background: '#FFFFFF' }}>
      <div className="mx-auto max-w-page px-5 md:px-10">
        <div className="mb-10 text-center md:mb-14">
          <div className="mb-4 text-[11px] font-extrabold tracking-[0.25em] text-saffron uppercase">Cities</div>
          <h2 className="font-display text-[40px] leading-[1.05] font-black tracking-tight text-ink md:text-[60px]">
            Starting hyperlocal. <br />
            Scaling along Uttara Kannada.
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-3xl bg-green p-8 text-white">
            <div className="text-[10px] font-extrabold tracking-[0.18em] text-brass uppercase">Live</div>
            {LIVE.map((c) => (
              <div key={c.name} className="mt-3">
                <div className="font-display text-[48px] leading-none font-black tracking-tight">{c.name}</div>
                <div className="text-[12px] text-white/70">{c.sub}</div>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-brass/20 px-3 py-1.5 text-[11px] font-extrabold tracking-wider text-brass">
                  <span className="size-2 animate-pulse rounded-full bg-brass" />
                  {c.makers} makers
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 md:col-span-2">
            <div className="text-[10px] font-extrabold tracking-[0.18em] text-ink-2 uppercase">Coming soon</div>
            {SOON.map((c) => (
              <div
                key={c.name}
                className="flex items-center justify-between rounded-2xl border border-line bg-canvas p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-green-lighter">
                    <MapPin className="size-5 text-green" strokeWidth={2.2} />
                  </div>
                  <div>
                    <div className="text-[16px] font-extrabold text-ink">{c.name}</div>
                    <div className="text-[11px] text-ink-2">in {c.months}</div>
                  </div>
                </div>
                <button className="press text-[12px] font-extrabold text-saffron underline">Get notified</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
