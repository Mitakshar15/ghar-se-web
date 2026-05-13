import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, ShoppingBag, Star, Wallet, ChevronRight, Check, ArrowRight } from 'lucide-react';

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
import type { Order, Festival } from '@/types/domain';

/**
 * Today (formerly Dashboard).
 *
 * Single job: tell the maker what to do today.
 *
 * What lives here:
 *   - Greeting + a saffron CTA, only if there are pending orders to confirm.
 *   - Four stat tiles (desktop-glanceable units of truth).
 *   - Today's kitchen — a checklist of deliveries due today.
 *   - Festival prep strip — ONLY when at least one festival is within 30 days.
 *
 * What used to live here and was moved:
 *   - Activity feed → NotificationsBell dropdown in the topbar (now reachable
 *     from every portal screen, not just Today).
 *   - Weekly capacity bars → Calendar page (same data, better home).
 *   - 30-day earnings trend chart → Earnings page (where the rest of the
 *     financial detail lives).
 */
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
  festivals: Festival[];
}

const NEAR_FESTIVAL_DAYS = 30;

export function Dashboard() {
  const { maker } = useAuth();
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: qk.dashboard,
    queryFn: () => apiGet<DashboardPayload>(API.dashboard),
  });

  if (isLoading || !data) {
    return (
      <PortalShell>
        <div className="space-y-6">
          <Skeleton className="h-24 w-full max-w-[640px]" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-28" />
            ))}
          </div>
          <Skeleton className="h-72" />
        </div>
      </PortalShell>
    );
  }

  const pending = data.summary.pendingOrderCount;
  const todayCount = data.todayOrders.length;
  const upcomingFestivals = data.festivals.filter((f) => f.days <= NEAR_FESTIVAL_DAYS);

  return (
    <PortalShell>
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
              {pending > 0 ? (
                <>
                  You have{' '}
                  <span className="font-extrabold text-saffron">{pending} new orders</span> waiting for
                  confirmation
                  {todayCount > 0 ? ` and ${todayCount} to prepare today.` : '.'}
                </>
              ) : todayCount > 0 ? (
                <>
                  {todayCount} {todayCount === 1 ? 'order' : 'orders'} to prepare today.
                </>
              ) : (
                <>Nothing urgent. Enjoy the morning.</>
              )}
            </p>
          </div>
          {pending > 0 && (
            <Button
              variant="saffron"
              size="lg"
              onClick={() => navigate(ROUTES.orders)}
              rightIcon={<ArrowRight className="size-4" strokeWidth={2.5} />}
            >
              Review new orders
            </Button>
          )}
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
            sub={`${pending} pending`}
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

        <Card>
          <CardHeader
            title="Today's kitchen"
            sub={`11 May · ${todayCount} ${todayCount === 1 ? 'delivery' : 'deliveries'} on the clock`}
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
          {todayCount === 0 ? (
            <div className="rounded-xl bg-canvas-2 px-4 py-8 text-center text-[13px] text-ink-2">
              No deliveries due today. ☕
            </div>
          ) : (
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
                      <div className="text-[12px] font-extrabold text-ink">{o.due.replace('Today · ', '')}</div>
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
          )}
        </Card>

        {/* Festival prep — only renders if at least one festival is within 30 days. */}
        {upcomingFestivals.length > 0 && (
          <Card padding="md">
            <CardHeader
              title="Festival prep"
              sub={`${upcomingFestivals.length} approaching · time to open pre-orders`}
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
              {upcomingFestivals.map((f) => (
                <div
                  key={f.id}
                  className="flex items-center gap-3 rounded-2xl bg-canvas-2 p-4"
                >
                  <div className="flex size-12 flex-shrink-0 items-center justify-center rounded-xl bg-saffron-light text-2xl">
                    {f.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-extrabold text-ink">{f.name}</div>
                    <div className="text-[11px] text-ink-2">
                      {f.date} · {f.days} days away
                    </div>
                    <div
                      className={`text-[11px] font-bold ${f.preorders ? 'text-green' : 'text-ink-3'}`}
                    >
                      {f.preorders ? `${f.preorders} pre-orders` : 'No pre-orders yet'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </PortalShell>
  );
}
