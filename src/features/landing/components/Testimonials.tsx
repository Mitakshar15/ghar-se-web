import { Quote } from 'lucide-react';

const ITEMS = [
  {
    text: 'My karanji used to feed only family. Last Ganesh Chaturthi I cooked 800 pieces and earned ₹28,000 — without a single phone call from buyer to maker.',
    name: 'Sushma Bhat',
    role: "Sushma's Kitchen · Hosakeri",
    note: 'Earned ₹4.2L in 2025',
  },
  {
    text: 'I was worried about online payments. The escrow thing made sense. Got my first ₹1,800 in the bank within 36 hours — that\'s when I knew it was real.',
    name: 'Lakshmi Hegde',
    role: "Lakshmi's Pickle House · Marikamba Nagar",
    note: '12 years pickling, year 1 on Ghar Se',
  },
  {
    text: 'Pradeep K. tagged me on WhatsApp after ordering modaka. Said it tasted like his grandmother\'s. That\'s the only review I needed.',
    name: 'Vidya Joshi',
    role: "Vidya's Kitchen · Banavasi Road",
    note: '142 reviews · 4.9 stars',
  },
];

export function Testimonials() {
  return (
    <section className="py-24 md:py-32" style={{ background: '#FBF7F0' }}>
      <div className="mx-auto max-w-page px-5 md:px-10">
        <div className="mb-12 text-center">
          <div className="mb-4 text-[11px] font-extrabold tracking-[0.25em] text-saffron uppercase">
            Real makers · real money
          </div>
          <h2 className="font-display text-[40px] leading-[1.05] font-black tracking-tight text-ink md:text-[60px]">
            Words from <span className="font-serif-italic text-green">our kitchens</span>.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {ITEMS.map((t) => (
            <article
              key={t.name}
              className="relative rounded-3xl border border-line bg-canvas p-6 hover-lift"
            >
              <Quote className="absolute top-6 right-6 size-8 text-brass/40" strokeWidth={1.5} />
              <p className="text-[14px] leading-relaxed text-ink">"{t.text}"</p>
              <div className="mt-6 border-t border-line pt-4">
                <div className="text-[13px] font-extrabold text-ink">{t.name}</div>
                <div className="text-[11px] text-ink-2">{t.role}</div>
                <div className="mt-2 inline-block rounded-md bg-green-lighter px-2 py-1 text-[10px] font-extrabold tracking-wider text-green uppercase">
                  {t.note}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
