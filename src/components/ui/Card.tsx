import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverLift?: boolean;
  children: ReactNode;
  style?: CSSProperties;
}

const padMap = { none: '', sm: 'p-4', md: 'p-6', lg: 'p-8' } as const;

export function Card({ padding = 'md', hoverLift = false, className, children, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        'bg-canvas rounded-2xl border border-line',
        padMap[padding],
        hoverLift && 'hover-lift',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  sub,
  action,
}: {
  title: ReactNode;
  sub?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-3">
      <div className="min-w-0 flex-1">
        <h2 className="font-display text-[24px] leading-none font-black tracking-tight text-ink">{title}</h2>
        {sub && <p className="mt-1 text-[12px] text-ink-2">{sub}</p>}
      </div>
      {action}
    </div>
  );
}
