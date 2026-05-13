import { useState } from 'react';
import {
  Phone,
  Mail,
  Smartphone,
  ChevronDown,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';

import { PortalShell } from '@/components/layout/PortalShell';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { help } from '@/content/portal/help';
import { localized } from '@/content';

const CONTACT_ICONS: Record<string, LucideIcon> = {
  Phone,
  Mail,
  Smartphone,
};

const CONTACT_TONE: Record<'green' | 'saffron' | 'brass', string> = {
  green: '#0B5D4D',
  saffron: '#F25F0C',
  brass: '#C8A04D',
};

export function Help() {
  const [open, setOpen] = useState<number | null>(null);
  const faqCount = help.faq.entries.length;
  const faqSub = localized(help.faq.subTemplate).replace('{count}', String(faqCount));

  return (
    <PortalShell>
      <div className="space-y-5">
        <CardHeader
          title={localized(help.title)}
          sub={localized(help.sub)}
          action={
            <Button variant="saffron" size="lg" leftIcon={<Phone className="size-4" strokeWidth={2.4} />}>
              {localized(help.primaryCtaLabel)}
            </Button>
          }
        />

        <div className="grid gap-4 md:grid-cols-3">
          {help.contacts.map((c) => {
            const Icon = CONTACT_ICONS[c.iconName] ?? Phone;
            const color = CONTACT_TONE[c.tone];
            return (
              <Card key={c.id} hoverLift>
                <div className="mb-3 flex size-12 items-center justify-center rounded-xl" style={{ background: color + '22' }}>
                  <Icon className="size-5" style={{ color }} strokeWidth={2.4} />
                </div>
                <div className="mb-1 text-[10px] font-extrabold tracking-wider text-ink-2 uppercase">
                  {localized(c.label)}
                </div>
                <div className="font-display mb-1 text-[18px] font-black tracking-tight text-ink">
                  {localized(c.value)}
                </div>
                <div className="text-[11px] text-ink-2">{localized(c.detail)}</div>
              </Card>
            );
          })}
        </div>

        <Card padding="none">
          <div className="p-6 pb-3">
            <CardHeader title={localized(help.faq.title)} sub={faqSub} />
          </div>
          <div>
            {help.faq.entries.map((entry, i) => (
              <div key={entry.id} className="border-t border-line">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="press flex w-full items-start justify-between gap-3 px-6 py-4 text-left hover:bg-canvas-2"
                  aria-expanded={open === i}
                >
                  <span className="text-[14px] font-extrabold text-ink">{localized(entry.q)}</span>
                  <ChevronDown
                    className={`mt-0.5 size-4 flex-shrink-0 text-ink-2 transition-transform ${
                      open === i ? 'rotate-180' : ''
                    }`}
                    strokeWidth={2.4}
                  />
                </button>
                {open === i && (
                  <div className="-mt-1 px-6 pb-5 text-[13px] leading-relaxed text-ink-2 animate-fade-in">
                    {localized(entry.a)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card padding="lg" className="text-center">
          <div className="mb-2 text-4xl" aria-hidden>
            {help.stillNeedHelp.emoji}
          </div>
          <h3 className="font-display mb-2 text-[20px] font-black tracking-tight text-ink">
            {localized(help.stillNeedHelp.title)}
          </h3>
          <p className="mx-auto mb-5 max-w-[480px] text-[13px] text-ink-2">
            {localized(help.stillNeedHelp.sub)}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="primary" size="lg" rightIcon={<ArrowRight className="size-4" strokeWidth={2.5} />}>
              {localized(help.stillNeedHelp.primaryCtaLabel)}
            </Button>
            <Button variant="outline" size="lg">
              {localized(help.stillNeedHelp.secondaryCtaLabel)}
            </Button>
          </div>
        </Card>
      </div>
    </PortalShell>
  );
}
