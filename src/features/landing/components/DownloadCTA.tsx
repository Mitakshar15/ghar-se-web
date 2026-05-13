import { Apple, Smartphone } from 'lucide-react';

import { downloadCTA } from '@/content/landing/download-cta';
import { localized } from '@/content';

export function DownloadCTA() {
  const headlinePrefix = localized(downloadCTA.headlinePrefix);
  const headlineLines = headlinePrefix.split('\n').filter((s) => s.length > 0);

  return (
    <section id="download" className="py-24 md:py-32" style={{ background: '#063C32' }}>
      <div className="mx-auto max-w-page px-5 text-center md:px-10">
        <h2 className="font-display text-[40px] leading-[1.05] font-black tracking-tight text-white md:text-[60px]">
          {headlineLines.map((line, i) => (
            <span key={i}>
              {line}
              {i < headlineLines.length - 1 && <br />}
            </span>
          ))}
          <br />
          <span className="font-serif-italic text-brass">{localized(downloadCTA.headlineItalic)}</span>
        </h2>
        <p className="mx-auto mt-4 max-w-[420px] text-[14px] text-white/70">{localized(downloadCTA.sub)}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button className="press inline-flex items-center gap-2 rounded-full bg-white px-6 py-4 text-[14px] font-extrabold text-ink">
            <Apple className="size-4" />
            {localized(downloadCTA.appStoreLabel)}
          </button>
          <button className="press inline-flex items-center gap-2 rounded-full bg-white px-6 py-4 text-[14px] font-extrabold text-ink">
            <Smartphone className="size-4" />
            {localized(downloadCTA.playStoreLabel)}
          </button>
        </div>
      </div>
    </section>
  );
}
