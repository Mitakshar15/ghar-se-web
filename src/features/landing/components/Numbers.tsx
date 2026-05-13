import { numbersCopy } from '@/content/landing/numbers-copy';
import { localized } from '@/content';

// Operational values stay in the component for now. When the API exposes
// /api/v1/public/stats this list moves to a useQuery hook and merges with
// the labels from content.
const VALUES: Record<string, string> = {
  makers: '47',
  households: '4,800+',
  paid: '₹18L',
  rating: '4.9★',
};

export function Numbers() {
  return (
    <section id="story" className="relative py-24 md:py-32" style={{ background: '#FBF7F0' }}>
      <div className="dot-dark-bg absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-page px-5 md:px-10">
        <div className="mb-12 text-center md:mb-16">
          <div className="mb-4 text-[11px] font-extrabold tracking-[0.25em] text-saffron uppercase">
            {localized(numbersCopy.eyebrow)}
          </div>
          <h2 className="font-display text-[40px] leading-[1.05] font-black tracking-tight text-ink md:text-[60px]">
            {localized(numbersCopy.headlinePrefix)}
            <span className="font-serif-italic text-green">{localized(numbersCopy.headlineItalic)}</span>.
          </h2>
          {numbersCopy.kannadaSubtitle && (
            <p className="font-serif-italic mt-3 text-[16px] text-brass">{numbersCopy.kannadaSubtitle}</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {numbersCopy.cards.map((c) => (
            <div
              key={c.id}
              className="rounded-3xl border border-line bg-canvas p-6 text-center hover-lift md:p-8"
            >
              <div
                className="font-display mb-3 font-black tracking-tight text-ink"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1 }}
              >
                {VALUES[c.id] ?? '—'}
              </div>
              <div className="text-[14px] font-extrabold text-ink">{localized(c.label)}</div>
              <div className="mt-1 text-[11px] text-ink-2">{localized(c.sub)}</div>
              {c.kannada && <div className="font-serif-italic mt-3 text-[12px] text-brass">{c.kannada}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
