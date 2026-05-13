const ITEMS = [
  '🥥 Karanji',
  '🫓 Holige',
  '🥨 Chakli',
  '🫙 Bilona ghee',
  '🌶️ Mavinakai pickle',
  '🪔 Festival hampers',
  '🍯 Stone-ground masalas',
  '🧁 Mysore pak',
];

export function Marquee() {
  return (
    <section
      className="overflow-hidden border-y border-line py-5"
      style={{ background: '#063C32', color: '#FBF7F0' }}
    >
      <div className="flex animate-marquee">
        {[...ITEMS, ...ITEMS].map((it, i) => (
          <div key={i} className="flex items-center gap-3 px-5 text-[15px] font-extrabold whitespace-nowrap">
            {it}
            <span className="text-brass">·</span>
          </div>
        ))}
      </div>
    </section>
  );
}
