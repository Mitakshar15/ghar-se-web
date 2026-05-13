import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

type Tone = 'green' | 'saffron' | 'brass' | 'ink' | 'danger' | 'neutral';

const toneStyles: Record<Tone, string> = {
  green: 'bg-green-lighter text-green',
  saffron: 'bg-saffron-light text-saffron-dark',
  brass: 'bg-brass-light text-brass-dark',
  ink: 'bg-ink text-white',
  danger: 'bg-danger-light text-danger',
  neutral: 'bg-canvas-2 text-ink-2',
};

export function Pill({
  tone = 'neutral',
  children,
  className,
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-extrabold tracking-wider uppercase',
        toneStyles[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
