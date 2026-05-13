import { useMemo, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight, Plus, ShoppingBag, ChefHat, Sparkles, Flame } from 'lucide-react';

import { PortalShell } from '@/components/layout/PortalShell';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatTile } from '@/components/ui/StatTile';
import { apiGet, apiPatch } from '@/lib/api/client';
import { API } from '@/lib/api/endpoints';
import { qk } from '@/lib/api/queryClient';
import { useToast } from '@/components/feedback/Toast';

interface CalendarResponse {
  year: number;
  month: number;
  bookings: Record<number, number>;
  festivals: Record<number, string>;
  blocked: number[];
  dailyCap: number;
}

const FESTIVAL_EMOJI: Record<string, string> = { gc: '🪔', np: '🐍', dv: '🎆', yg: '🌿' };

export function CalendarPage() {
  const today = { y: 2026, m: 5, d: 11 };
  const [view, setView] = useState({ y: today.y, m: today.m });
  const { push } = useToast();
  const qc = useQueryClient();

  const { data } = useQuery({
    queryKey: qk.calendar(view.y, view.m),
    queryFn: () => apiGet<CalendarResponse>(`${API.calendar}?year=${view.y}&month=${view.m}`),
  });

  const setCap = useMutation({
    mutationFn: (dailyCap: number) => apiPatch(API.calendarCapacity, { dailyCap }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.calendar(view.y, view.m) });
      push('Daily capacity updated');
    },
  });

  const days = useMemo(() => {
    if (!data) return [];
    const firstDow = new Date(data.year, data.month - 1, 1).getDay();
    const daysInMonth = new Date(data.year, data.month, 0).getDate();
    const arr: Array<{ day?: number; booked: number; valid: boolean; isToday: boolean; isPast: boolean; isFestival: boolean; festival?: string; blocked: boolean; dow: number }> = [];
    for (let i = 0; i < firstDow; i++) arr.push({ valid: false, booked: 0, isToday: false, isPast: false, isFestival: false, blocked: false, dow: i });
    for (let d = 1; d <= daysInMonth; d++) {
      const dow = new Date(data.year, data.month - 1, d).getDay();
      const fest = data.festivals[d];
      arr.push({
        valid: true,
        day: d,
        booked: data.bookings[d] ?? 0,
        isToday: data.year === today.y && data.month === today.m && d === today.d,
        isPast: data.year === today.y && data.month === today.m && d < today.d,
        isFestival: !!fest,
        festival: fest,
        blocked: data.blocked.includes(d),
        dow,
      });
    }
    return arr;
  }, [data]);

  const totalMonthOrders = days.reduce((s, d) => s + (d.booked ?? 0), 0);
  const monthFull = days.filter((d) => d.valid && d.booked >= (data?.dailyCap ?? 15) * 0.9).length;
  const monthName = new Date(view.y, view.m - 1, 1).toLocaleDateString('en-IN', {
    month: 'long',
    year: 'numeric',
  });

  const prev = () => setView((v) => (v.m === 1 ? { y: v.y - 1, m: 12 } : { y: v.y, m: v.m - 1 }));
  const next = () => setView((v) => (v.m === 12 ? { y: v.y + 1, m: 1 } : { y: v.y, m: v.m + 1 }));

  return (
    <PortalShell>
      <div className="space-y-5">
        <CardHeader
          title="Calendar"
          sub="Set how many orders you can take each day. Block days off, mark festivals, plan ahead."
          action={
            <Button
              variant="primary"
              size="lg"
              onClick={() => push('Pick a day on the calendar to block off')}
              leftIcon={<Plus className="size-4" strokeWidth={2.5} />}
            >
              Block off a day
            </Button>
          }
        />

        <div className="grid gap-4 md:grid-cols-4">
          <StatTile label="This month" value={totalMonthOrders} sub="orders so far" icon={ShoppingBag} />
          <StatTile label="Daily capacity" value={data?.dailyCap ?? 15} sub="orders / day max" icon={ChefHat} tone="saffron" />
          <StatTile label="Festival days" value={Object.keys(data?.festivals ?? {}).length} sub={monthName} icon={Sparkles} tone="brass" />
          <StatTile label="Full days" value={monthFull} sub=">90% booked" icon={Flame} tone="danger" />
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-[22px] font-black tracking-tight text-ink">{monthName}</h3>
              <div className="flex items-center gap-2">
                <button onClick={prev} className="press flex size-9 items-center justify-center rounded-full border border-line">
                  <ChevronLeft className="size-4 text-ink" strokeWidth={2.4} />
                </button>
                <button
                  onClick={() => setView({ y: today.y, m: today.m })}
                  className="press rounded-full bg-canvas-2 px-3 py-1.5 text-[11px] font-extrabold text-ink-2"
                >
                  Today
                </button>
                <button onClick={next} className="press flex size-9 items-center justify-center rounded-full border border-line">
                  <ChevronRight className="size-4 text-ink" strokeWidth={2.4} />
                </button>
              </div>
            </div>

            <div className="mb-2 grid grid-cols-7 gap-1">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                <div key={d} className="text-center text-[10px] font-extrabold tracking-wider text-ink-2 uppercase">
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1.5">
              {days.map((d, i) => {
                if (!d.valid) return <div key={i} className="aspect-square" />;
                const pct = d.booked / (data?.dailyCap ?? 15);
                const fillColor = d.blocked
                  ? '#9CA3AF'
                  : d.booked === 0
                    ? null
                    : pct >= 0.9
                      ? '#C53030'
                      : pct >= 0.6
                        ? '#F25F0C'
                        : '#0B5D4D';
                const isWeekend = d.dow === 0 || d.dow === 6;
                return (
                  <button
                    key={i}
                    className="press relative flex aspect-square flex-col items-center justify-center rounded-xl"
                    style={{
                      background: d.isToday
                        ? '#FAF3E0'
                        : d.blocked
                          ? '#F4F4F2'
                          : isWeekend
                            ? '#FAFAF9'
                            : '#FFFFFF',
                      border: d.isToday ? '2px solid #C8A04D' : '1px solid #EBEAE5',
                      opacity: d.isPast && !d.isToday ? 0.55 : 1,
                    }}
                  >
                    <span
                      className="text-[13px] font-extrabold"
                      style={{ color: d.isFestival ? '#F25F0C' : d.blocked ? '#9CA3AF' : '#171717' }}
                    >
                      {d.day}
                    </span>
                    {d.festival && (
                      <span className="absolute top-1 right-1 text-[10px]">
                        {FESTIVAL_EMOJI[d.festival]}
                      </span>
                    )}
                    {d.blocked && (
                      <div className="pointer-events-none absolute inset-1 flex items-center justify-center">
                        <div className="h-px w-full rotate-12 bg-ink-3" />
                      </div>
                    )}
                    {fillColor && !d.blocked && (
                      <div className="absolute right-1.5 bottom-1.5 left-1.5">
                        <div className="h-1 overflow-hidden rounded-full bg-canvas-3">
                          <div className="h-full" style={{ width: `${pct * 100}%`, background: fillColor }} />
                        </div>
                        <div className="mt-0.5 text-[8px] font-extrabold text-ink-2">
                          {d.booked}/{data?.dailyCap ?? 15}
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4 text-[11px] font-bold text-ink-2">
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-sm bg-green" />
                Available · &lt;60%
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-sm bg-saffron" />
                Filling · 60–90%
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-sm bg-danger" />
                Full · &gt;90%
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-sm bg-ink-3" />
                Blocked
              </span>
              <span className="flex items-center gap-1.5">🪔 Festival</span>
            </div>
          </Card>

          <div className="space-y-5">
            <Card>
              <CardHeader title="Daily capacity" sub="How many orders per day" />
              <div className="mb-3 flex items-center gap-3">
                <input
                  type="number"
                  defaultValue={data?.dailyCap ?? 15}
                  min={1}
                  max={100}
                  onBlur={(e) => setCap.mutate(parseInt(e.target.value, 10))}
                  className="w-20 rounded-xl border border-line bg-canvas px-3 py-2.5 text-center text-[18px] font-extrabold text-ink outline-none"
                />
                <div className="text-[12px] text-ink-2">orders / day</div>
              </div>
              <p className="mb-3 text-[11px] leading-relaxed text-ink-2">
                This is your default. You can still block-off a specific day or raise capacity for a festival.
              </p>
              <Button variant="outline" size="md" fullWidth onClick={() => push('Default saved')}>
                Save default
              </Button>
            </Card>

            <Card className="relative overflow-hidden">
              <div className="absolute -top-4 -right-4 text-[80px] opacity-10">🪔</div>
              <div className="relative">
                <div className="mb-1 text-[10px] font-extrabold tracking-[0.16em] text-saffron uppercase">
                  Festival prep
                </div>
                <h4 className="font-display mb-1 text-[20px] leading-tight font-black tracking-tight text-ink">
                  Ganesh Chaturthi · Sept 6
                </h4>
                <p className="mb-3 text-[12px] text-ink-2">
                  119 days away. Most makers start pre-orders 45 days out.
                </p>
                <Button variant="saffron" size="md">
                  Open pre-orders
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
