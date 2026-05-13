import { useQuery } from '@tanstack/react-query';
import { TrendingUp, FileText } from 'lucide-react';

import { PortalShell } from '@/components/layout/PortalShell';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { Pill } from '@/components/ui/Pill';
import { apiGet } from '@/lib/api/client';
import { API } from '@/lib/api/endpoints';
import { qk } from '@/lib/api/queryClient';
import { formatRupees } from '@/lib/utils/format';
import type { Payout } from '@/types/domain';

interface EarningsResponse {
  summary: { thisMonth: number; lastMonthDelta: number; paidOut: number; scheduled: number };
  breakdown: { label: string; value: number; pct: number }[];
  payouts: Payout[];
  bank: { name: string; accountMasked: string; ifsc: string; upi: string };
}

const COLORS = ['#0B5D4D', '#F25F0C', '#C8A04D', '#147A66'];

export function Earnings() {
  const { data, isLoading } = useQuery({
    queryKey: qk.earnings,
    queryFn: () => apiGet<EarningsResponse>(API.earnings),
  });

  return (
    <PortalShell>
      {isLoading || !data ? (
        <Skeleton className="h-72" />
      ) : (
        <div className="space-y-5">
          <CardHeader
            title="Earnings"
            sub="Payouts, breakdown, and your bank details. Direct to your bank in 24-48h after delivery."
            action={
              <Button variant="outline" size="md" leftIcon={<FileText className="size-3.5" strokeWidth={2.5} />}>
                Download statement
              </Button>
            }
          />

          <div className="grid gap-4 md:grid-cols-3">
            <Card padding="none" className="overflow-hidden md:col-span-1">
              <div
                className="relative p-6 text-white"
                style={{ background: 'linear-gradient(135deg, #0B5D4D 0%, #063C32 100%)' }}
              >
                <div className="dot-light-bg absolute inset-0 opacity-30" />
                <div className="relative">
                  <div className="mb-1 text-[11px] font-extrabold tracking-[0.16em] text-white/70 uppercase">
                    This month
                  </div>
                  <div className="font-display text-[36px] leading-none font-black tracking-tight">
                    {formatRupees(data.summary.thisMonth)}
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 text-[12px]">
                    <TrendingUp className="size-3.5" strokeWidth={2.5} />
                    <span className="font-extrabold">+{data.summary.lastMonthDelta}%</span>
                    <span className="opacity-80">vs April</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 p-5">
                <div>
                  <div className="text-[10px] font-extrabold tracking-wider text-ink-2 uppercase">Paid out</div>
                  <div className="font-display mt-1 text-[18px] font-black tracking-tight text-ink">
                    {formatRupees(data.summary.paidOut)}
                  </div>
                  <div className="text-[10px] text-ink-2">via {data.bank.name}</div>
                </div>
                <div>
                  <div className="text-[10px] font-extrabold tracking-wider text-ink-2 uppercase">Scheduled</div>
                  <div className="font-display mt-1 text-[18px] font-black tracking-tight text-saffron">
                    {formatRupees(data.summary.scheduled)}
                  </div>
                  <div className="text-[10px] text-ink-2">arrives tomorrow</div>
                </div>
              </div>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader title="Where your earnings came from" sub="May 2026 · by category" />
              <div className="space-y-3">
                {data.breakdown.map((b, i) => (
                  <div key={b.label}>
                    <div className="mb-1 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="size-3 rounded-sm" style={{ background: COLORS[i % COLORS.length] }} />
                        <span className="text-[13px] font-extrabold text-ink">{b.label}</span>
                      </div>
                      <span className="text-[13px] font-extrabold text-ink">{formatRupees(b.value)}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-canvas-3">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${b.pct}%`, background: COLORS[i % COLORS.length] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card padding="none">
            <div className="flex items-center justify-between p-6 pb-3">
              <CardHeader title="Recent payouts" sub="Direct to bank · 24-48h after delivery" />
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-y border-line bg-canvas-2">
                  {['Date', 'Orders', 'Amount', 'Status', 'Reference'].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-[10px] font-extrabold tracking-[0.14em] text-ink-2 uppercase">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.payouts.map((p) => (
                  <tr key={p.id} className="border-b border-line">
                    <td className="px-6 py-4 text-[13px] font-extrabold text-ink">{p.date}</td>
                    <td className="px-6 py-4 text-[13px] text-ink-2">{p.orders} orders</td>
                    <td className="px-6 py-4 font-display text-[16px] font-black tracking-tight text-ink">
                      {formatRupees(p.amount)}
                    </td>
                    <td className="px-6 py-4">
                      <Pill tone={p.status === 'paid' ? 'green' : 'saffron'}>{p.status}</Pill>
                    </td>
                    <td className="px-6 py-4 text-[11px] text-ink-2">{data.bank.name} ••• 4521</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <Card>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-green-lighter text-2xl">🏦</div>
                <div>
                  <div className="text-[10px] font-extrabold tracking-wider text-ink-2 uppercase">
                    Payout account
                  </div>
                  <div className="text-[15px] font-extrabold text-ink">
                    {data.bank.name} · {data.bank.accountMasked}
                  </div>
                  <div className="mt-0.5 text-[11px] text-ink-2">
                    {data.bank.ifsc} · UPI {data.bank.upi}
                  </div>
                </div>
              </div>
              <Button variant="outline" size="md">
                Update account
              </Button>
            </div>
          </Card>
        </div>
      )}
    </PortalShell>
  );
}
