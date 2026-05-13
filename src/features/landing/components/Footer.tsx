import { Camera, Video, MessageCircle, Globe } from 'lucide-react';

import { Logo } from '@/components/layout/Logo';
import { footer } from '@/content/landing/footer';
import { localized } from '@/content';

interface FooterProps {
  onScrollTo: (id: string) => void;
}

const SOCIAL = [
  { Icon: Camera, label: 'Instagram' },
  { Icon: Video, label: 'YouTube' },
  { Icon: MessageCircle, label: 'WhatsApp' },
  { Icon: Globe, label: 'Web' },
];

export function Footer({ onScrollTo }: FooterProps) {
  // Each column link either starts with "#" (scroll target) or is an absolute URL.
  // For "#" links we use scrollTo; otherwise we'd render an <a href> — keep
  // the navigation behaviour consistent with the previous implementation.
  const handle = (href: string) => {
    if (href.startsWith('#')) onScrollTo(href.slice(1));
  };

  return (
    <footer className="border-t border-line bg-cream py-16">
      <div className="mx-auto max-w-page px-5 md:px-10">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <Logo caption={localized(footer.tagline)} />
            <p className="mt-4 max-w-[320px] text-[12px] leading-relaxed text-ink-2">
              {localized(footer.description)}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIAL.map(({ Icon, label }) => (
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
          {footer.columns.map((col, ci) => (
            <div key={ci}>
              <div className="mb-3 text-[10px] font-extrabold tracking-[0.18em] text-ink uppercase">
                {localized(col.heading)}
              </div>
              <ul className="space-y-2 text-[13px] text-ink-2">
                {col.links.map((l, i) => (
                  <li key={i}>
                    <button onClick={() => handle(l.href)} className="hover:text-ink">
                      {localized(l.label)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-[11px] text-ink-2 md:flex-row">
          <span>{localized(footer.copyright)}</span>
          <div className="flex gap-4">
            {footer.legalLinks.map((l, i) => (
              <a key={i} href={l.href} className="hover:text-ink">
                {localized(l.label)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
