import { useCallback } from 'react';

import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { HowItWorks } from './components/HowItWorks';
import { Suraksha } from './components/Suraksha';
import { FeaturedMakers } from './components/FeaturedMakers';
import { FestivalCTA } from './components/FestivalCTA';
import { ForMakers } from './components/ForMakers';
import { Numbers } from './components/Numbers';
import { Cities } from './components/Cities';
import { Testimonials } from './components/Testimonials';
import { DownloadCTA } from './components/DownloadCTA';
import { Footer } from './components/Footer';

export function Landing() {
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div className="bg-cream text-ink">
      {/* Optional bilingual top strip */}
      <div className="hidden w-full py-1.5 text-center text-[11px] tracking-wider md:block" style={{ background: '#063C32', color: '#C8A04D' }}>
        <span className="font-serif-italic">घर से, घर तक</span>
        <span className="mx-3 opacity-60">·</span>
        <span className="text-white/70">From home, to home. Made in Sirsi, Karnataka.</span>
      </div>

      <Nav onScrollTo={scrollTo} />

      <main>
        <Hero onScrollTo={scrollTo} />
        <Marquee />
        <HowItWorks />
        <Suraksha />
        <FeaturedMakers />
        <FestivalCTA />
        <ForMakers />
        <Numbers />
        <Cities />
        <Testimonials />
        <DownloadCTA />
      </main>

      <Footer onScrollTo={scrollTo} />
    </div>
  );
}
