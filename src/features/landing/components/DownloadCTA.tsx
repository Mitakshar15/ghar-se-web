import { Apple, Smartphone } from 'lucide-react';

export function DownloadCTA() {
  return (
    <section id="download" className="py-24 md:py-32" style={{ background: '#063C32' }}>
      <div className="mx-auto max-w-page px-5 text-center md:px-10">
        <h2 className="font-display text-[40px] leading-[1.05] font-black tracking-tight text-white md:text-[60px]">
          The kitchen is open. <br />
          <span className="font-serif-italic text-brass">Come hungry.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-[420px] text-[14px] text-white/70">
          Free to download. No subscription. Fresh from a real maker, every order.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button className="press inline-flex items-center gap-2 rounded-full bg-white px-6 py-4 text-[14px] font-extrabold text-ink">
            <Apple className="size-4" />
            App Store
          </button>
          <button className="press inline-flex items-center gap-2 rounded-full bg-white px-6 py-4 text-[14px] font-extrabold text-ink">
            <Smartphone className="size-4" />
            Google Play
          </button>
        </div>
      </div>
    </section>
  );
}
