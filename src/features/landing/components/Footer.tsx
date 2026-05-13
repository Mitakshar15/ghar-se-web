import { Camera, Video, MessageCircle, Globe } from 'lucide-react';

import { Logo } from '@/components/layout/Logo';

interface FooterProps {
  onScrollTo: (id: string) => void;
}

const LINKS = {
  Product: [
    { id: 'how', label: 'How it works' },
    { id: 'makers', label: 'Makers' },
    { id: 'cities', label: 'Cities' },
  ],
  Makers: [
    { id: 'for-makers', label: 'For home cooks' },
    { id: 'for-makers', label: 'FSSAI support' },
    { id: 'for-makers', label: 'Earnings calculator' },
  ],
  Company: [
    { id: 'story', label: 'Our story' },
    { id: 'story', label: 'Press' },
    { id: 'story', label: 'Careers' },
  ],
};

export function Footer({ onScrollTo }: FooterProps) {
  return (
    <footer className="border-t border-line bg-cream py-16">
      <div className="mx-auto max-w-page px-5 md:px-10">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <Logo caption="घर से, घर तक" />
            <p className="mt-4 max-w-[320px] text-[12px] leading-relaxed text-ink-2">
              Hyperlocal pre-order marketplace for home-made festival foods. Live in Sirsi, Karnataka. Built
              with care.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[
                { Icon: Camera, label: 'Instagram' },
                { Icon: Video, label: 'YouTube' },
                { Icon: MessageCircle, label: 'WhatsApp' },
                { Icon: Globe, label: 'Web' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full bg-canvas-2 text-ink-2 hover:bg-canvas-3"
                >
                  <Icon className="size-4" strokeWidth={2.2} />
                </a>
              ))}
            </div>
          </div>
          {Object.entries(LINKS).map(([heading, items]) => (
            <div key={heading}>
              <div className="mb-3 text-[10px] font-extrabold tracking-[0.18em] text-ink uppercase">{heading}</div>
              <ul className="space-y-2 text-[13px] text-ink-2">
                {items.map((l, i) => (
                  <li key={i}>
                    <button onClick={() => onScrollTo(l.id)} className="hover:text-ink">
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-[11px] text-ink-2 md:flex-row">
          <span>© 2026 Ghar Se · Made in Sirsi, Karnataka</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-ink">
              Privacy
            </a>
            <a href="#" className="hover:text-ink">
              Terms
            </a>
            <a href="#" className="hover:text-ink">
              Refund policy
            </a>
            <a href="#" className="hover:text-ink">
              FSSAI: 12345600002345
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
