import type { ReactNode } from 'react';

interface PhoneMockupProps {
  /** Slight tilt for visual interest. Default 4 degrees. */
  rotation?: `${number}deg`;
  /** Inner content — the app screen renders inside the screen area. */
  children: ReactNode;
}

/**
 * PhoneMockup — iPhone-shaped frame used in marketing surfaces (Hero, etc.)
 * to showcase the buyer app. Dark bezel, rounded corners, top notch, two
 * side-button hints, deep drop shadow.
 *
 * The inner content area is a white canvas the parent fills with any
 * "screen" component (today only MiniHomeScreen; later we may add a
 * maker-dashboard variant).
 */
export function PhoneMockup({ rotation = '4deg', children }: PhoneMockupProps) {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div
        className="relative w-[280px] animate-scale-in"
        style={{ height: 580, transform: `rotate(${rotation})` }}
      >
        {/* Outer dark frame */}
        <div
          className="absolute inset-0 rounded-[44px] p-[11px] shadow-2xl"
          style={{
            background: '#1a1a1a',
            boxShadow:
              '0 40px 80px -20px rgba(0,0,0,0.30), 0 20px 40px -10px rgba(0,0,0,0.20)',
          }}
        >
          {/* Screen */}
          <div className="relative h-full w-full overflow-hidden rounded-[34px] bg-white">
            {/* Notch — sits over the top edge of the screen */}
            <div
              className="absolute top-0 left-1/2 z-50 h-[24px] w-[100px] -translate-x-1/2 rounded-b-2xl"
              style={{ background: '#1a1a1a' }}
              aria-hidden
            />
            {children}
          </div>
        </div>

        {/* Side buttons — small painted slivers to suggest real hardware */}
        <div className="absolute top-[120px] -left-0.5 h-16 w-1 rounded-l-md" style={{ background: '#0a0a0a' }} />
        <div className="absolute top-[160px] -right-0.5 h-24 w-1 rounded-r-md" style={{ background: '#0a0a0a' }} />
      </div>
    </div>
  );
}
