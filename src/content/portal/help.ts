import { HelpContentSchema, type HelpContent } from '../schema/portal';
import { BUSINESS, payoutWindowProse } from '../business/terms';

/**
 * Help page content — FAQs, contact tiles, "Still need help" CTA.
 *
 * Two FAQ answers reference business terms (payout window, commission %).
 * They interpolate from BUSINESS — that's the whole reason we use TypeScript
 * for content instead of JSON. A change in business/terms.ts propagates to
 * the FAQ automatically.
 *
 * To add/edit a FAQ: just append to `faq.entries` below. Keep questions
 * short, answers warm but specific. Buyer-facing helpdesk tone.
 */
export const help: HelpContent = HelpContentSchema.parse({
  title: { en: 'Help & support' },
  sub: { en: 'FAQs first. Talk to a human when you need to.' },
  primaryCtaLabel: { en: 'Call support' },

  contacts: [
    {
      id: 'phone',
      iconName: 'Phone',
      label: { en: 'Call us' },
      value: { en: '+91 80 4567 8901' },
      detail: { en: 'Mon–Sat · 9 AM to 8 PM' },
      tone: 'green',
    },
    {
      id: 'email',
      iconName: 'Mail',
      label: { en: 'Email' },
      value: { en: 'makers@gharse.com' },
      detail: { en: 'Replies within 4h on weekdays' },
      tone: 'saffron',
    },
    {
      id: 'whatsapp',
      iconName: 'Smartphone',
      label: { en: 'WhatsApp' },
      value: { en: 'Quick questions' },
      detail: { en: 'Same number · 9 AM to 8 PM' },
      tone: 'brass',
    },
  ],

  faq: {
    title: { en: 'Common questions' },
    // Template: {count} is filled in at render time by the component.
    subTemplate: { en: '{count} answers · most makers find what they need here' },
    entries: [
      {
        id: 'when-paid',
        q: { en: 'When will I get paid for an order?' },
        a: {
          en: `Your payout is released ${payoutWindowProse()} after the buyer confirms delivery. You can change your payout cadence in Settings → Payouts.`,
        },
      },
      {
        id: 'buyer-cancel',
        q: { en: 'A buyer is asking me to cancel — what do I do?' },
        a: {
          en: "Politely ask them to cancel from their app (Orders → Cancel). Don't cancel from your end unless absolutely necessary — frequent cancellations from makers hurt your rating. If they refuse, message support and we'll handle it.",
        },
      },
      {
        id: 'festival-capacity',
        q: { en: 'Can I increase my daily capacity temporarily for a festival?' },
        a: {
          en: 'Yes. Go to Calendar → tap the festival day → raise capacity. Pre-orders for big festivals also get a separate quota you can set.',
        },
      },
      {
        id: 'edit-order',
        q: { en: 'I made a mistake on an order. Can I edit it?' },
        a: {
          en: 'After confirmation, items and amounts are locked to protect the buyer. Message the buyer through the order — most accept small adjustments amicably.',
        },
      },
      {
        id: 'commission',
        q: { en: `Why does Ghar Se take ${BUSINESS.commissionPct}% commission?` },
        a: {
          en: 'It funds buyer acquisition, payment processing, refunds when something goes wrong, and your FSSAI / hygiene support. We are intentionally far below Swiggy / Zomato (20–30%).',
        },
      },
      {
        id: 'no-delivery',
        q: { en: "What happens if a buyer doesn't accept the delivery?" },
        a: {
          en: 'Money stays in escrow. We try to redeliver. If unresolved within 48h, the order is refunded to the buyer and the items are written off — Ghar Se absorbs the cost for your first two such incidents per year.',
        },
      },
      {
        id: 'fssai-expiry',
        q: { en: 'My FSSAI is expiring. What do I do?' },
        a: {
          en: 'We auto-remind you 90, 30 and 7 days before. Tap Profile → Verification → Schedule renewal. Free for makers who renew via Ghar Se.',
        },
      },
      {
        id: 'add-helper',
        q: { en: 'How do I add a helper to my kitchen account?' },
        a: {
          en: 'Settings → Helpers → Add. Helpers can view orders and update prep status but cannot change your menu, prices, or bank details.',
        },
      },
    ],
  },

  stillNeedHelp: {
    emoji: '🙏',
    title: { en: 'Still need help?' },
    sub: { en: "Tell us what's going on. A real person in Sirsi reads every message." },
    primaryCtaLabel: { en: 'Write to us' },
    secondaryCtaLabel: { en: 'Book a video call' },
  },
});
