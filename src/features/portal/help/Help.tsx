import { useState } from 'react';
import { Phone, Mail, Smartphone, ChevronDown, ArrowRight } from 'lucide-react';

import { PortalShell } from '@/components/layout/PortalShell';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { BUSINESS, payoutWindowProse } from '@/content';

/**
 * FAQ copy will move to src/content/portal/faqs.ts in a later PR. For now,
 * the questions/answers stay here; the only thing we extract right now is
 * the embedded business-term values (commission %, payout window) so a
 * change in business/terms.ts propagates to the FAQ automatically.
 */
const FAQS = [
  { q: 'When will I get paid for an order?', a: `Your payout is released ${payoutWindowProse()} after the buyer confirms delivery. You can change your payout cadence in Settings → Payouts.` },
  { q: 'A buyer is asking me to cancel — what do I do?', a: "Politely ask them to cancel from their app (Orders → Cancel). Don't cancel from your end unless absolutely necessary — frequent cancellations from makers hurt your rating. If they refuse, message support and we'll handle it." },
  { q: 'Can I increase my daily capacity temporarily for a festival?', a: 'Yes. Go to Calendar → tap the festival day → raise capacity. Pre-orders for big festivals also get a separate quota you can set.' },
  { q: 'I made a mistake on an order. Can I edit it?', a: 'After confirmation, items and amounts are locked to protect the buyer. Message the buyer through the order — most accept small adjustments amicably.' },
  { q: `Why does Ghar Se take ${BUSINESS.commissionPct}% commission?`, a: `It funds buyer acquisition, payment processing, refunds when something goes wrong, and your FSSAI / hygiene support. We are intentionally far below Swiggy / Zomato (20–30%).` },
  { q: "What happens if a buyer doesn't accept the delivery?", a: 'Money stays in escrow. We try to redeliver. If unresolved within 48h, the order is refunded to the buyer and the items are written off — Ghar Se absorbs the cost for your first two such incidents per year.' },
  { q: 'My FSSAI is expiring. What do I do?', a: 'We auto-remind you 90, 30 and 7 days before. Tap Profile → Verification → Schedule renewal. Free for makers who renew via Ghar Se.' },
  { q: 'How do I add a helper to my kitchen account?', a: 'Settings → Helpers → Add. Helpers can view orders and update prep status but cannot change your menu, prices, or bank details.' },
];

export function Help() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <PortalShell>
      <div className="space-y-5">
        <CardHeader
          title="Help & support"
          sub="FAQs first. Talk to a human when you need to."
          action={
            <Button variant="saffron" size="lg" leftIcon={<Phone className="size-4" strokeWidth={2.4} />}>
              Call support
            </Button>
          }
        />

        <div className="grid gap-4 md:grid-cols-3">
          {[
            { Icon: Phone, label: 'Call us', value: '+91 80 4567 8901', detail: 'Mon–Sat · 9 AM to 8 PM', color: '#0B5D4D' },
            { Icon: Mail, label: 'Email', value: 'makers@gharse.com', detail: 'Replies within 4h on weekdays', color: '#F25F0C' },
            { Icon: Smartphone, label: 'WhatsApp', value: 'Quick questions', detail: 'Same number · 9 AM to 8 PM', color: '#C8A04D' },
          ].map(({ Icon, label, value, detail, color }) => (
            <Card key={label} hoverLift>
              <div
                className="mb-3 flex size-12 items-center justify-center rounded-xl"
                style={{ background: color + '22' }}
              >
                <Icon className="size-5" style={{ color }} strokeWidth={2.4} />
              </div>
              <div className="mb-1 text-[10px] font-extrabold tracking-wider text-ink-2 uppercase">{label}</div>
              <div className="font-display mb-1 text-[18px] font-black tracking-tight text-ink">{value}</div>
              <div className="text-[11px] text-ink-2">{detail}</div>
            </Card>
          ))}
        </div>

        <Card padding="none">
          <div className="p-6 pb-3">
            <CardHeader title="Common questions" sub={`${FAQS.length} answers · most makers find what they need here`} />
          </div>
          <div>
            {FAQS.map((f, i) => (
              <div key={i} className="border-t border-line">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="press flex w-full items-start justify-between gap-3 px-6 py-4 text-left hover:bg-canvas-2"
                >
                  <span className="text-[14px] font-extrabold text-ink">{f.q}</span>
                  <ChevronDown
                    className={`mt-0.5 size-4 flex-shrink-0 text-ink-2 transition-transform ${
                      open === i ? 'rotate-180' : ''
                    }`}
                    strokeWidth={2.4}
                  />
                </button>
                {open === i && (
                  <div className="-mt-1 px-6 pb-5 text-[13px] leading-relaxed text-ink-2 animate-fade-in">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card padding="lg" className="text-center">
          <div className="mb-2 text-4xl">🙏</div>
          <h3 className="font-display mb-2 text-[20px] font-black tracking-tight text-ink">Still need help?</h3>
          <p className="mx-auto mb-5 max-w-[480px] text-[13px] text-ink-2">
            Tell us what's going on. A real person in Sirsi reads every message.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="primary" size="lg" rightIcon={<ArrowRight className="size-4" strokeWidth={2.5} />}>
              Write to us
            </Button>
            <Button variant="outline" size="lg">
              Book a video call
            </Button>
          </div>
        </Card>
      </div>
    </PortalShell>
  );
}
