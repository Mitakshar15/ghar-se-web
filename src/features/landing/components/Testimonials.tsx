import { Quote } from 'lucide-react';

import { testimonials } from '@/content/landing/testimonials';
import { localized } from '@/content';

export function Testimonials() {
  return (
    <section className="py-24 md:py-32" style={{ background: '#FBF7F0' }}>
      <div className="mx-auto max-w-page px-5 md:px-10">
        <div className="mb-12 text-center">
          <div className="mb-4 text-[11px] font-extrabold tracking-[0.25em] text-saffron uppercase">
            {localized(testimonials.eyebrow)}
          </div>
          <h2 className="font-display text-[40px] leading-[1.05] font-black tracking-tight text-ink md:text-[60px]">
            {localized(testimonials.headlinePrefix)}
            <span className="font-serif-italic text-green">{localized(testimonials.headlineItalic)}</span>.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.items.map((t) => (
            <article key={t.id} className="relative rounded-3xl border border-line bg-canvas p-6 hover-lift">
              <Quote className="absolute top-6 right-6 size-8 text-brass/40" strokeWidth={1.5} />
              <p className="text-[14px] leading-relaxed text-ink">"{localized(t.text)}"</p>
              <div className="mt-6 border-t border-line pt-4">
                <div className="text-[13px] font-extrabold text-ink">{t.name}</div>
                <div className="text-[11px] text-ink-2">{localized(t.role)}</div>
                <div className="mt-2 inline-block rounded-md bg-green-lighter px-2 py-1 text-[10px] font-extrabold tracking-wider text-green uppercase">
                  {localized(t.note)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
