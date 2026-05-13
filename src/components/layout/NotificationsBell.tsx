import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Bell, Sparkles, Star, Wallet } from 'lucide-react';

import { apiGet } from '@/lib/api/client';
import { API } from '@/lib/api/endpoints';
import { qk } from '@/lib/api/queryClient';
import type { AppNotification } from '@/types/domain';

/**
 * Topbar bell — opens a dropdown panel with recent activity.
 *
 * Lives in the topbar (not on the dashboard) so notifications are reachable
 * from every portal screen. Click outside to dismiss. Escape closes too.
 */
export function NotificationsBell() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const { data } = useQuery({
    queryKey: qk.notifications,
    queryFn: () => apiGet<{ notifications: AppNotification[] }>(API.notifications),
  });

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const count = data?.notifications?.length ?? 0;

  return (
    <div ref={rootRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Notifications"
        aria-expanded={open}
        className="relative flex size-10 items-center justify-center rounded-full bg-canvas-2 press"
      >
        <Bell className="size-5 text-ink" strokeWidth={2.2} />
        {count > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-saffron text-[9px] font-bold text-white">
            {count}
          </span>
        )}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-40 mt-2 w-[360px] overflow-hidden rounded-2xl border border-line bg-canvas shadow-2xl animate-fade-in"
        >
          <div className="border-b border-line px-4 py-3">
            <div className="text-[10px] font-extrabold tracking-[0.16em] text-ink-2 uppercase">Activity</div>
            <div className="font-display text-[18px] font-black tracking-tight text-ink">Recent updates</div>
          </div>
          <div className="max-h-[420px] overflow-y-auto">
            {!data && (
              <div className="px-4 py-6 text-center text-[12px] text-ink-2">Loading…</div>
            )}
            {data && data.notifications.length === 0 && (
              <div className="px-4 py-6 text-center text-[12px] text-ink-2">All caught up.</div>
            )}
            {data?.notifications.map((n) => {
              const ic = iconFor(n.icon);
              const Icon = ic.Icon;
              return (
                <div key={n.id} className="flex items-start gap-3 border-b border-line px-4 py-3 last:border-b-0">
                  <div
                    className="flex size-9 flex-shrink-0 items-center justify-center rounded-full"
                    style={{ background: ic.color + '22' }}
                  >
                    <Icon className="size-4" style={{ color: ic.color }} strokeWidth={2.4} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[12px] leading-snug font-extrabold text-ink">{n.title}</div>
                    <div className="text-[11px] text-ink-2">{n.sub}</div>
                    <div className="mt-0.5 text-[10px] text-ink-3">{n.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function iconFor(kind: AppNotification['icon']) {
  switch (kind) {
    case 'alert':
      return { Icon: Bell, color: '#F25F0C' };
    case 'review':
      return { Icon: Star, color: '#C8A04D' };
    case 'payout':
      return { Icon: Wallet, color: '#0B5D4D' };
    case 'festival':
      return { Icon: Sparkles, color: '#F25F0C' };
  }
}
