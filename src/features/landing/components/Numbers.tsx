const STATS = [
  { num: '47', label: 'Home cooks', sub: 'Verified · KYC complete', kn: 'ಮನೆಯ ಬಾಣಸಿಗರು' },
  { num: '4,800+', label: 'Households', sub: 'Active monthly buyers', kn: 'ಕುಟುಂಬಗಳು' },
  { num: '₹18L', label: 'Paid to makers', sub: 'Direct to bank · last 12 months', kn: 'ವೇತನ' },
  { num: '4.9★', label: 'Average rating', sub: 'Across 2,400+ reviews', kn: 'ಸರಾಸರಿ' },
];

export function Numbers() {
  return (
    <section id="story" className="relative py-24 md:py-32" style={{ background: '#FBF7F0' }}>
      <div className="dot-dark-bg absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-page px-5 md:px-10">
        <div className="mb-12 text-center md:mb-16">
          <div className="mb-4 text-[11px] font-extrabold tracking-[0.25em] text-saffron uppercase">
            By the numbers
          </div>
          <h2 className="font-display text-[40px] leading-[1.05] font-black tracking-tight text-ink md:text-[60px]">
            Sirsi, in <span className="font-serif-italic text-green">numbers</span>.
          </h2>
          <p className="font-serif-italic mt-3 text-[16px] text-brass">ಸಿರ್ಸಿ, ಸಂಖ್ಯೆಗಳಲ್ಲಿ</p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-3xl border border-line bg-canvas p-6 text-center hover-lift md:p-8">
              <div
                className="font-display mb-3 font-black tracking-tight text-ink"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1 }}
              >
                {s.num}
              </div>
              <div className="text-[14px] font-extrabold text-ink">{s.label}</div>
              <div className="mt-1 text-[11px] text-ink-2">{s.sub}</div>
              <div className="font-serif-italic mt-3 text-[12px] text-brass">{s.kn}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
