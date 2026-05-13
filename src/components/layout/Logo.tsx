import { env } from '@/config/env';

interface LogoProps {
  /** When true, renders a dark-friendly variant (used in the green sidebar) */
  inverse?: boolean;
  caption?: string;
}

export function Logo({ inverse = false, caption }: LogoProps) {
  const wordmarkColor = inverse ? '#FFFFFF' : '#171717';
  const captionColor = inverse ? '#C8A04D' : '#0B5D4D';
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex size-9 items-center justify-center rounded-xl bg-green">
        <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
          <path
            d="M8 40 L8 20 Q8 10 18 10 L30 10 Q40 10 40 20 L40 40"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="24" cy="26" r="5" fill="#F25F0C" />
          <path d="M14 32 L34 32" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
      <div>
        <div className="font-display text-[20px] leading-none font-black tracking-tight" style={{ color: wordmarkColor }}>
          {env.VITE_APP_NAME}
          <span style={{ color: '#F25F0C' }}>.</span>
        </div>
        {caption && (
          <div className="font-serif-italic mt-0.5 text-[10px]" style={{ color: captionColor }}>
            {caption}
          </div>
        )}
      </div>
    </div>
  );
}
