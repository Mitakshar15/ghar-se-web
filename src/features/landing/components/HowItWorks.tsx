import { Search, Calendar, Truck, type LucideIcon } from 'lucide-react';

import { howItWorks } from '@/content/landing/how-it-works';
import { localized } from '@/content';

// Local icon map — keeps tree-shaking. The schema's iconName is a string;
// resolving it to a component is each section's job.
const ICONS: Record<string, LucideIcon> = {
  Search,
  Calendar,
  Truck,
};

export function HowItWorks() {
  const headline = localized(howItWorks.headline);
  const italic = localized(howItWorks.italicWord);
  // Split the headline around the italic word so the component can wrap that
  // chunk in `.font-serif-italic`. Keeps the content file a plain sentence.
  const [before, after] = splitOnce(headline, italic);

  return (
    <section id="how" className="relative py-24 md:py-32" style={{ background: '#FBF7F0' }}>
      <div className="mx-auto max-w-page px-5 md:px-10">
        <div className="mb-12 text-center md:mb-16">
          <div className="mb-4 text-[11px] font-extrabold tracking-[0.25em] text-saffron uppercase">
            {localized(howItWorks.eyebrow)}
          </div>
          <h2 className="font-display text-[40px] leading-[1.05] font-black tracking-tight text-ink md:text-[60px]">
            {before}
            <span className="font-serif-italic text-green">{italic}</span>
            {after}
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {howItWorks.steps.map((s, i) => {
            const Icon = ICONS[s.iconName] ?? Search;
            return (
              <div key={s.id} className="relative rounded-3xl border border-line bg-canvas p-8 hover-lift">
                <div className="font-display absolute -top-3 -left-3 flex size-14 items-center justify-center rounded-full bg-saffron text-[20px] font-black text-white">
                  {i + 1}
                </div>
                <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-green-lighter">
                  <Icon className="size-6 text-green" strokeWidth={2.2} />
                </div>
                <h3 className="font-display mb-2 text-[22px] font-black tracking-tight text-ink">
                  {localized(s.title)}
                </h3>
                <p className="text-[14px] leading-relaxed text-ink-2">{localized(s.body)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Split a sentence around a substring once. Returns [before, after]. */
function splitOnce(text: string, mark: string): [string, string] {
  const i = text.indexOf(mark);
  if (i < 0) return [text, ''];
  return [text.slice(0, i), text.slice(i + mark.length)];
}
