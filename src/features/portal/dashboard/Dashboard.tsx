import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  ShoppingBag,
  Star,
  Wallet,
  Bell,
  ChevronRight,
  Check,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

import { PortalShell } from '@/components/layout/PortalShell';
import { Card, CardHeader } from '@/components/ui/Card';
import { StatTile } from '@/components/ui/StatTile';
import { Skeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import { apiGet } from '@/lib/api/client';
import { API } from '@/lib/api/endpoints';
import { qk } from '@/lib/api/queryClient';
import { formatRupees } from '@/lib/utils/format';
import { ROUTES } from '@/config/routes';
import { useAuth } from '@/lib/auth/store';
import type { Order, AppNotification, Festival } from '@/types/domain';

interface DashboardPayload {
  summary: {
    thisMonthEarning: number;
    earningTrendPct: number;
    orderCount: number;
    pendingOrderCount: number;
    rating: number;
    reviewCount: number;
    nextPayoutAmount: number;
    nextPayoutDate: string;
  };
  todayOrders: Order[];
  notifications: AppNotification[];
  festivals: Festival[];
  weeklyCapacity: { d: string; pct: number }[];
}

export function Dashboard() {
  const { maker } = useAuth();
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: qk.dashboard,
    queryFn: () => apiGet<DashboardPayload>(API.dashboard),
  });

  return (
    <PortalShell>
      {isLoading || !data ? (
        <div className="space-y-6">
          <Skeleton className="h-24 w-full max-w-[640px]" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-28" />
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="mb-1 text-[11px] font-extrabold tracking-[0.16em] text-saffron uppercase">
                Monday, 11 May
              </div>
              <h2 className="font-display text-[36px] leading-none font-black tracking-tight text-ink">
                Good morning, {maker?.owner.split(' ')[0]} aunty.
              </h2>
              <p className="mt-2 text-[13px] text-ink-2">
                You have{' '}
                <span className="font-extrabold text-saffron">
                  {data.summary.pendingOrderCount} new orders
                </span>{' '}
                waiting for confirmation and {data.todayOrders.length} to prepare today.
              </p>
            </div>
            <Button
              variant="saffron"
              size="lg"
              onClick={() => navigate(ROUTES.orders)}
              rightIcon={<ArrowRight className="size-4" strokeWidth={2.5} />}
            >
              Review today's orders
            </Button>
          </header>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatTile
              label="This month"
              value={formatRupees(data.summary.thisMonthEarning)}
              sub="vs last month"
              trend={`+${data.summary.earningTrendPct}%`}
              icon={TrendingUp}
              tone="green"
            />
            <StatTile
              label="Orders"
              value={data.summary.orderCount}
              sub={`${data.summary.pendingOrderCount} pending`}
              icon={ShoppingBag}
              tone="saffron"
            />
            <StatTile
              label="Rating"
              value={`${data.summary.rating}★`}
              sub={`${data.summary.reviewCount} reviews`}
              icon={Star}
              tone="brass"
            />
            <StatTile
              label="Next payout"
              value={formatRupees(data.summary.nextPayoutAmount)}
              sub={data.summary.nextPayoutDate}
              icon={Wallet}
              tone="green"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader
                title="Today's kitchen"
                sub="11 May · 5 deliveries on the clock"
                action={
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(ROUTES.orders)}
                    rightIcon={<ChevronRight className="size-3.5" strokeWidth={2.5} />}
                  >
                    See all
                  </Button>
                }
              />
              <div className="space-y-3">
                {data.todayOrders.map((o, i) => {
                  const current = i === 2;
                  const done = o.status === 'delivered';
                  return (
                    <div
                      key={o.id}
                      className={`flex items-center gap-3 rounded-xl p-3 ${
                        current ? 'bg-saffron-light/50' : 'bg-canvas-2'
                      }`}
                    >
                      <div
                        className="flex size-6 flex-shrink-0 items-center justify-center rounded-full"
                        style={{
                          background: done ? '#0B5D4D' : 'transparent',
                          border: done ? 'none' : '2px solid #9CA3AF',
                        }}
                      >
                        {done && <Check className="size-3.5 text-white" strokeWidth={3} />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[13px] font-extrabold text-ink">
                          {o.items.map((it) => `${it.name} · ${it.qty}`).join(' + ')}
                        </div>
                        <div className="text-[11px] text-ink-2">
                          {o.buyer} · {o.neighborhood} · {o.id}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[12px] font-extrabold text-ink">
                          {o.due.replace('Today · ', '')}
                        </div>
                        {current && (
                          <div className="text-[9px] font-extrabold tracking-wider text-saffron uppercase">
                            Up next
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card>
              <CardHeader title="Activity" sub="Last 48 hours" />
              <div className="space-y-3">
                {data.notifications.map((n) => {
                  const ic =
                    n.icon === 'alert'
                      ? { Icon: Bell, color: '#F25F0C' }
                      : n.icon === 'review'
                        ? { Icon: Star, color: '#C8A04D' }
                        : n.icon === 'payout'
                          ? { Icon: Wallet, color: '#0B5D4D' }
                          : { Icon: Sparkles, color: '#F25F0C' };
                  const Icon = ic.Icon;
                  return (
                    <div key={n.id} className="flex items-start gap-3">
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
            </Card>
          </div>

          {/* Festival prep strip */}
          <Card padding="md">
            <CardHeader
              title="Festival kitchen"
              sub="Pre-orders open across upcoming festivals"
              action={
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(ROUTES.calendar)}
                  rightIcon={<ChevronRight className="size-3.5" strokeWidth={2.5} />}
                >
                  Calendar
                </Button>
              }
            />
            <div className="grid gap-3 sm:grid-cols-3">
              {data.festivals.map((f) => (
                <div key={f.id} className="flex items-center gap-3 rounded-2xl border border-line bg-canvas-2 p-4">
                  <div className="flex size-12 flex-shrink-0 items-center justify-center rounded-xl bg-saffron-light text-2xl">
                    {f.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-extrabold text-ink">{f.name}</div>
                    <div className="text-[11px] text-ink-2">
                      {f.date} · {f.days} days away
                    </div>
                    <div className={`text-[11px] font-bold ${f.preorders ? 'text-green' : 'text-ink-3'}`}>
                      {f.preorders ? `${f.preorders} pre-orders` : 'No pre-orders yet'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </PortalShell>
  );
}
