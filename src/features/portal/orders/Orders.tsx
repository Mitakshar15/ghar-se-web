import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Phone, Search, Clock, Info, CheckCircle2, Smartphone } from 'lucide-react';

import { PortalShell } from '@/components/layout/PortalShell';
import { Card, CardHeader } from '@/components/ui/Card';
import { Empty } from '@/components/ui/Empty';
import { Pill } from '@/components/ui/Pill';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { apiGet, apiPatch } from '@/lib/api/client';
import { API } from '@/lib/api/endpoints';
import { qk } from '@/lib/api/queryClient';
import { formatRupees } from '@/lib/utils/format';
import { useToast } from '@/components/feedback/Toast';
import type { Order, OrderStatus } from '@/types/domain';

const TABS: { id: OrderStatus; label: string }[] = [
  { id: 'pending', label: 'Pending' },
  { id: 'preparing', label: 'Preparing' },
  { id: 'delivered', label: 'Delivered' },
  { id: 'cancelled', label: 'Cancelled' },
];

const statusPill: Record<OrderStatus, { tone: 'saffron' | 'green' | 'neutral' | 'danger'; label: string }> = {
  pending: { tone: 'saffron', label: 'Awaiting confirmation' },
  preparing: { tone: 'green', label: 'Preparing' },
  delivered: { tone: 'neutral', label: 'Delivered' },
  cancelled: { tone: 'danger', label: 'Cancelled' },
};

export function Orders() {
  const [filter, setFilter] = useState<OrderStatus>('pending');
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { push } = useToast();
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: qk.orders(),
    queryFn: () => apiGet<{ orders: Order[] }>(API.orders),
  });

  const updateStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderStatus }) =>
      apiPatch<Order>(API.order(id), { status }),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.orders() }),
  });

  const counts = useMemo(() => {
    const list = data?.orders ?? [];
    return {
      pending: list.filter((o) => o.status === 'pending').length,
      preparing: list.filter((o) => o.status === 'preparing').length,
      delivered: list.filter((o) => o.status === 'delivered').length,
      cancelled: list.filter((o) => o.status === 'cancelled').length,
    };
  }, [data]);

  const visible = useMemo(
    () =>
      (data?.orders ?? []).filter(
        (o) =>
          o.status === filter &&
          (!search ||
            o.id.toLowerCase().includes(search.toLowerCase()) ||
            o.buyer.toLowerCase().includes(search.toLowerCase())),
      ),
    [data, filter, search],
  );

  const selected = visible.find((o) => o.id === selectedId) ?? visible[0];

  const onAction = async (id: string, status: OrderStatus, message: string) => {
    try {
      await updateStatus.mutateAsync({ id, status });
      push(message, 'success');
    } catch (e) {
      push((e as Error).message || 'Update failed', 'error');
    }
  };

  return (
    <PortalShell>
      <div className="space-y-5">
        <CardHeader
          title="Orders"
          sub="Confirm new orders, mark prepared, and message buyers."
          action={
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-xl border border-line bg-canvas px-3 py-2">
                <Search className="size-4 text-ink-2" strokeWidth={2.2} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search GS1024 or buyer"
                  className="w-48 bg-transparent text-[13px] text-ink outline-none placeholder:text-ink-3"
                />
              </div>
            </div>
          }
        />

        <div className="flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setFilter(t.id)}
              className={`press flex items-center gap-1.5 rounded-full px-4 py-2 text-[12px] font-extrabold ${
                filter === t.id ? 'bg-ink text-white' : 'border border-line bg-canvas text-ink'
              }`}
            >
              {t.label}
              <span
                className={`rounded-full px-1.5 text-[10px] font-bold ${
                  filter === t.id ? 'bg-white/20' : 'bg-canvas-2 text-ink-2'
                }`}
              >
                {counts[t.id]}
              </span>
            </button>
          ))}
        </div>

        <div className="grid gap-5 lg:grid-cols-5">
          <div className="space-y-3 lg:col-span-2">
            {isLoading && Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-32" />)}
            {!isLoading && visible.length === 0 && (
              <Empty
                title={`No ${filter} orders`}
                sub="You're all caught up here."
              />
            )}
            {visible.map((o) => (
              <button
                key={o.id}
                onClick={() => setSelectedId(o.id)}
                className="press w-full rounded-2xl bg-canvas p-4 text-left transition-all"
                style={{
                  border: selected?.id === o.id ? '2px solid #0B5D4D' : '1px solid #EBEAE5',
                  boxShadow: selected?.id === o.id ? '0 6px 22px -10px rgba(11,93,77,0.35)' : 'none',
                }}
              >
                <div className="mb-2 flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[13px] font-extrabold text-ink">{o.id}</div>
                    <div className="text-[11px] text-ink-2">
                      {o.buyer} · {o.neighborhood}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-[15px] font-extrabold tracking-tight text-ink">
                      {formatRupees(o.amount)}
                    </div>
                    <div className={`text-[10px] ${o.payMethod === 'COD' ? 'text-saffron' : 'text-ink-2'}`}>
                      {o.payMethod}
                    </div>
                  </div>
                </div>
                <div className="text-[12px] text-ink-2">
                  {o.items.map((it, i) => (
                    <span key={i}>
                      {it.name} × {it.qty}
                      {i < o.items.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
                  <span
                    className={`flex items-center gap-1 text-[10px] font-bold ${
                      o.urgent ? 'text-saffron' : 'text-ink-2'
                    }`}
                  >
                    <Clock className="size-3" strokeWidth={2.5} />
                    {o.due}
                  </span>
                  {o.urgent && <Pill tone="saffron">Urgent</Pill>}
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-3">
            {selected ? (
              <Card padding="none" className="sticky top-24 overflow-hidden">
                <div className="border-b border-line bg-canvas-2 p-6">
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <div>
                      <div className="mb-1 text-[10px] font-extrabold tracking-[0.16em] text-ink-2 uppercase">
                        Order
                      </div>
                      <h3 className="font-display text-[24px] leading-none font-black tracking-tight text-ink">
                        {selected.id}
                      </h3>
                      <p className="mt-1 text-[12px] text-ink-2">
                        Placed {selected.placed} · Due {selected.due}
                      </p>
                    </div>
                    <Pill tone={statusPill[selected.status].tone}>{statusPill[selected.status].label}</Pill>
                  </div>
                </div>

                <div className="space-y-5 p-6">
                  <div>
                    <div className="mb-2 text-[10px] font-extrabold tracking-[0.14em] text-ink-2 uppercase">Buyer</div>
                    <div className="flex items-center gap-3">
                      <div className="flex size-11 items-center justify-center rounded-full bg-brass text-[13px] font-extrabold text-white">
                        {selected.buyer[0]}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[14px] font-extrabold text-ink">{selected.buyer}</div>
                        <div className="text-[12px] text-ink-2">{selected.neighborhood}, Sirsi</div>
                      </div>
                      <Button variant="outline" size="sm" leftIcon={<Phone className="size-3.5" strokeWidth={2.4} />}>
                        Call
                      </Button>
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 text-[10px] font-extrabold tracking-[0.14em] text-ink-2 uppercase">Items</div>
                    <div className="space-y-2">
                      {selected.items.map((it, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between border-b border-line py-2 text-[13px]"
                        >
                          <span className="font-extrabold text-ink">{it.name}</span>
                          <span className="text-ink-2">× {it.qty}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-green-lighter p-4">
                    <div>
                      <div className="text-[11px] font-extrabold tracking-wider text-green uppercase">
                        Payable amount
                      </div>
                      <div className="text-[10px] text-ink-2">
                        Paid via {selected.payMethod}
                        {selected.payMethod === 'COD' ? ' · collect on delivery' : ' · in escrow until delivery'}
                      </div>
                    </div>
                    <div className="font-display text-[28px] font-black tracking-tight text-green">
                      {formatRupees(selected.amount)}
                    </div>
                  </div>

                  {selected.notes && (
                    <div className="flex items-start gap-2 rounded-xl bg-brass-light p-3 text-[12px] text-ink">
                      <Info className="mt-0.5 size-4 flex-shrink-0 text-brass-dark" strokeWidth={2.4} />
                      <div>
                        <div className="mb-0.5 font-extrabold text-brass-dark">Note from buyer</div>
                        <div className="text-ink-2">"{selected.notes}"</div>
                      </div>
                    </div>
                  )}

                  {selected.status === 'pending' && (
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="md"
                        onClick={() => onAction(selected.id, 'cancelled', 'Order declined')}
                        className="border-danger-light text-danger"
                      >
                        Decline
                      </Button>
                      <Button
                        variant="primary"
                        size="md"
                        onClick={() => onAction(selected.id, 'preparing', 'Order confirmed — start preparing')}
                      >
                        Confirm order
                      </Button>
                    </div>
                  )}
                  {selected.status === 'preparing' && (
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="md"
                        leftIcon={<Smartphone className="size-4" strokeWidth={2.4} />}
                        onClick={() => push('Message sent to buyer')}
                      >
                        Message
                      </Button>
                      <Button
                        variant="saffron"
                        size="md"
                        onClick={() => onAction(selected.id, 'delivered', 'Marked as delivered')}
                      >
                        Mark delivered
                      </Button>
                    </div>
                  )}
                  {selected.status === 'delivered' && (
                    <div className="py-2 text-center text-[12px] text-ink-2">
                      <CheckCircle2 className="mx-auto mb-1 size-5 text-green" strokeWidth={2.4} />
                      Delivered. Payout will arrive in 24-48 hours.
                    </div>
                  )}
                </div>
              </Card>
            ) : (
              <Empty title="Select an order" sub="Pick one on the left to see details and take action." />
            )}
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
