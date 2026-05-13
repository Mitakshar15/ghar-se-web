import { TestimonialsContentSchema, type TestimonialsContent } from '../schema/landing';

/**
 * Testimonials — rotating marketing copy. Adding/removing/editing a quote is
 * a copy edit; the component is stable.
 */
export const testimonials: TestimonialsContent = TestimonialsContentSchema.parse({
  eyebrow: { en: 'Real makers · real money' },
  headlinePrefix: { en: 'Words from ' },
  headlineItalic: { en: 'our kitchens' },
  items: [
    {
      id: 'sushma',
      text: {
        en: 'My karanji used to feed only family. Last Ganesh Chaturthi I cooked 800 pieces and earned ₹28,000 — without a single phone call from buyer to maker.',
      },
      name: 'Sushma Bhat',
      role: { en: "Sushma's Kitchen · Hosakeri" },
      note: { en: 'Earned ₹4.2L in 2025' },
    },
    {
      id: 'lakshmi',
      text: {
        en: "I was worried about online payments. The escrow thing made sense. Got my first ₹1,800 in the bank within 36 hours — that's when I knew it was real.",
      },
      name: 'Lakshmi Hegde',
      role: { en: "Lakshmi's Pickle House · Marikamba Nagar" },
      note: { en: '12 years pickling, year 1 on Ghar Se' },
    },
    {
      id: 'vidya',
      text: {
        en: "Pradeep K. tagged me on WhatsApp after ordering modaka. Said it tasted like his grandmother's. That's the only review I needed.",
      },
      name: 'Vidya Joshi',
      role: { en: "Vidya's Kitchen · Banavasi Road" },
      note: { en: '142 reviews · 4.9 stars' },
    },
  ],
});
