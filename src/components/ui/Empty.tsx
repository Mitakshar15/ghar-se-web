import type { ReactNode } from 'react';

export function Empty({
  emoji = '📭',
  title,
  sub,
  action,
}: {
  emoji?: string;
  title: string;
  sub?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-canvas border border-line p-10 text-center">
      <div className="mb-2 text-4xl" aria-hidden>
        {emoji}
      </div>
      <h3 className="font-display text-[18px] font-black tracking-tight text-ink">{title}</h3>
      {sub && <p className="mt-1 text-[12px] text-ink-2">{sub}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
