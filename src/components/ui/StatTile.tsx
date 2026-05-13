import type { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from './Card';

interface StatTileProps {
  label: string;
  value: string | number;
  sub?: string;
  trend?: string; // e.g. "+18%" or "-4%"
  icon?: LucideIcon;
  tone?: 'green' | 'saffron' | 'brass' | 'danger';
}

const toneBg: Record<NonNullable<StatTileProps['tone']>, { bg: string; fg: string }> = {
  green: { bg: 'bg-green-lighter', fg: 'text-green' },
  saffron: { bg: 'bg-saffron-light', fg: 'text-saffron-dark' },
  brass: { bg: 'bg-brass-light', fg: 'text-brass-dark' },
  danger: { bg: 'bg-danger-light', fg: 'text-danger' },
};

export function StatTile({ label, value, sub, trend, icon: Icon, tone = 'green' }: StatTileProps) {
  const trendDown = trend?.startsWith('-');
  const TrendIcon = trendDown ? TrendingDown : TrendingUp;
  const t = toneBg[tone];
  return (
    <Card padding="md">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="text-[10px] font-extrabold tracking-[0.14em] text-ink-2 uppercase">{label}</div>
        {Icon && (
          <span className={`flex size-8 items-center justify-center rounded-lg ${t.bg}`}>
            <Icon className={`size-4 ${t.fg}`} strokeWidth={2.4} />
          </span>
        )}
      </div>
      <div className="font-display text-[28px] leading-none font-black tracking-tight text-ink">{value}</div>
      {(sub || trend) && (
        <div className="mt-1 flex items-center gap-1.5 text-[11px] text-ink-2">
          {trend && (
            <span
              className={`flex items-center gap-0.5 font-extrabold ${trendDown ? 'text-danger' : 'text-green'}`}
            >
              <TrendIcon className="size-3" strokeWidth={2.5} />
              {trend}
            </span>
          )}
          {sub && <span>{sub}</span>}
        </div>
      )}
    </Card>
  );
}
