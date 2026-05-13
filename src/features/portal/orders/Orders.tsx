import { useMemo, useRef, useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MessageCircle, Search, Clock, Info, CheckCircle2, MoreVertical, XCircle } from 'lucide-react';

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
import { payoutWindowProse } from '@/content';
import type { Order, OrderStatus } from '@/types/domain';

/**
 * Orders — simplified to three statuses on the surface:
 *   - "New"     → pending (awaiting maker confirmation)
 *   - "Cooking" → preparing
 *   - "Done"    → delivered OR cancelled (toggle a chip to show cancelled)
 *
 * Four statuses still exist in the data model. We just collapse the UI
 * so there's one less tab to ignore on most days.
 *
 * Each detail-panel state surfaces ONE primary action. Secondaries (Decline,
 * Chat in the New state) live in a kebab menu on the panel header.
 */
type Tab = 'new' | 'cooking' | 'done';
const TABS: { id: Tab; label: string; matches: OrderStatus[] }[] = [
  { id: 'new', label: 'New', matches: ['pending'] },
  { id: 'cooking', label: 'Cooking', matches: ['preparing'] },
  { id: 'done', label: 'Done', matches: ['delivered', 'cancelled'] },
];

const statusPill: Record<OrderStatus, { tone: 'saffron' | 'green' | 'neutral' | 'danger'; label: string }> = {
  pending: { tone: 'saffron', label: 'New' },
  preparing: { tone: 'green', label: 'Cooking' },
  delivered: { tone: 'neutral', label: 'Delivered' },
  cancelled: { tone: 'danger', label: 'Cancelled' },
};

export function Orders() {
  const [tab, setTab] = useState<Tab>('new');
  const [showCancelled, setShowCancelled] = useState(false);
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
      new: list.filter((o) => o.status === 'pending').length,
      cooking: list.filter((o) => o.status === 'preparing').length,
      done: list.filter((o) => o.status === 'delivered').length,
      cancelled: list.filter((o) => o.status === 'cancelled').length,
    };
  }, [data]);

  const visible = useMemo(() => {
    const tabDef = TABS.find((t) => t.id === tab)!;
    return (data?.orders ?? []).filter((o) => {
      // Cancelled lives inside Done but is hidden by default; toggle chip flips it on.
      if (tab === 'done' && o.status === 'cancelled' && !showCancelled) return false;
      if (!tabDef.matches.includes(o.status)) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!o.id.toLowerCase().includes(q) && !o.buyer.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [data, tab, showCancelled, search]);

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
          action={
            <div className="flex items-center gap-2 rounded-xl border border-line bg-canvas px-3 py-2">
              <Search className="size-4 text-ink-2" strokeWidth={2.2} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search GS1024 or buyer"
                className="w-48 bg-transparent text-[13px] text-ink outline-none placeholder:text-ink-3"
              />
            </div>
          }
        />

        <div className="flex flex-wrap items-center gap-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`press flex items-center gap-1.5 rounded-full px-4 py-2 text-[12px] font-extrabold ${
                tab === t.id ? 'bg-ink text-white' : 'border border-line bg-canvas text-ink'
              }`}
            >
              {t.label}
              <span
                className={`rounded-full px-1.5 text-[10px] font-bold ${
                  tab === t.id ? 'bg-white/20' : 'bg-canvas-2 text-ink-2'
                }`}
              >
                {t.id === 'done'
                  ? counts.done + (showCancelled ? counts.cancelled : 0)
                  : counts[t.id]}
              </span>
            </button>
          ))}
          {tab === 'done' && counts.cancelled > 0 && (
            <button
              onClick={() => setShowCancelled((v) => !v)}
              className={`press ml-2 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold ${
                showCancelled
                  ? 'bg-danger-light text-danger'
                  : 'border border-dashed border-line bg-canvas text-ink-2'
              }`}
            >
              {showCancelled ? '✓' : '+'} Show cancelled · {counts.cancelled}
            </button>
          )}
        </div>

        <div className="grid gap-5 lg:grid-cols-5">
          <div className="space-y-3 lg:col-span-2">
            {isLoading && Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-32" />)}
            {!isLoading && visible.length === 0 && (
              <Empty title={`No ${TABS.find((t) => t.id === tab)!.label.toLowerCase()} orders`} sub="You're all caught up here." />
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
                  <span className={`flex items-center gap-1 text-[10px] font-bold ${o.urgent ? 'text-saffron' : 'text-ink-2'}`}>
                    <Clock className="size-3" strokeWidth={2.5} />
                    {o.due}
                  </span>
                  {o.urgent && <Pill tone="saffron">Urgent</Pill>}
                  {o.status === 'cancelled' && <Pill tone="danger">Cancelled</Pill>}
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-3">
            {selected ? (
              <OrderDetail
                order={selected}
                onPrimary={(target, msg) => onAction(selected.id, target, msg)}
                onSecondaryChat={() => push('Chat coming soon — buyer phone numbers are private')}
                onDecline={() => onAction(selected.id, 'cancelled', 'Order declined')}
              />
            ) : (
              <Empty title="Select an order" sub="Pick one on the left to see details and take action." />
            )}
          </div>
        </div>
      </div>
    </PortalShell>
  );
}

/** Detail panel — one primary action per state, secondaries in a kebab. */
function OrderDetail({
  order,
  onPrimary,
  onSecondaryChat,
  onDecline,
}: {
  order: Order;
  onPrimary: (target: OrderStatus, message: string) => void;
  onSecondaryChat: () => void;
  onDecline: () => void;
}) {
  return (
    <Card padding="none" className="sticky top-24 overflow-hidden">
      <div className="border-b border-line bg-canvas-2 p-6">
        <div className="mb-2 flex items-start justify-between gap-3">
          <div>
            <div className="mb-1 text-[10px] font-extrabold tracking-[0.16em] text-ink-2 uppercase">Order</div>
            <h3 className="font-display text-[24px] leading-none font-black tracking-tight text-ink">{order.id}</h3>
            <p className="mt-1 text-[12px] text-ink-2">Placed {order.placed} · Due {order.due}</p>
          </div>
          <div className="flex items-center gap-2">
            <Pill tone={statusPill[order.status].tone}>{statusPill[order.status].label}</Pill>
            <KebabMenu order={order} onSecondaryChat={onSecondaryChat} onDecline={onDecline} />
          </div>
        </div>
      </div>

      <div className="space-y-5 p-6">
        <section>
          <div className="mb-2 text-[10px] font-extrabold tracking-[0.14em] text-ink-2 uppercase">Buyer</div>
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-full bg-brass text-[13px] font-extrabold text-white">
              {order.buyer[0]}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[14px] font-extrabold text-ink">{order.buyer}</div>
              <div className="text-[12px] text-ink-2">{order.neighborhood}, Sirsi</div>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-2 text-[10px] font-extrabold tracking-[0.14em] text-ink-2 uppercase">Items</div>
          <div className="space-y-2">
            {order.items.map((it, i) => (
              <div key={i} className="flex items-center justify-between border-b border-line py-2 text-[13px]">
                <span className="font-extrabold text-ink">{it.name}</span>
                <span className="text-ink-2">× {it.qty}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="flex items-center justify-between rounded-xl bg-green-lighter p-4">
          <div>
            <div className="text-[11px] font-extrabold tracking-wider text-green uppercase">Payable amount</div>
            <div className="text-[10px] text-ink-2">
              Paid via {order.payMethod}
              {order.payMethod === 'COD' ? ' · collect on delivery' : ' · in escrow until delivery'}
            </div>
          </div>
          <div className="font-display text-[28px] font-black tracking-tight text-green">{formatRupees(order.amount)}</div>
        </div>

        {order.notes && (
          <div className="flex items-start gap-2 rounded-xl bg-brass-light p-3 text-[12px] text-ink">
            <Info className="mt-0.5 size-4 flex-shrink-0 text-brass-dark" strokeWidth={2.4} />
            <div>
              <div className="mb-0.5 font-extrabold text-brass-dark">Note from buyer</div>
              <div className="text-ink-2">"{order.notes}"</div>
            </div>
          </div>
        )}

        {/* Primary action — ONE per state. */}
        {order.status === 'pending' && (
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => onPrimary('preparing', 'Order confirmed — start preparing')}
          >
            Confirm order
          </Button>
        )}
        {order.status === 'preparing' && (
          <Button
            variant="saffron"
            size="lg"
            fullWidth
            onClick={() => onPrimary('delivered', 'Marked as delivered')}
          >
            Mark delivered
          </Button>
        )}
        {order.status === 'delivered' && (
          <div className="py-2 text-center text-[12px] text-ink-2">
            <CheckCircle2 className="mx-auto mb-1 size-5 text-green" strokeWidth={2.4} />
            Delivered. Payout will arrive in {payoutWindowProse()}.
          </div>
        )}
        {order.status === 'cancelled' && (
          <div className="py-2 text-center text-[12px] text-ink-2">
            <XCircle className="mx-auto mb-1 size-5 text-danger" strokeWidth={2.4} />
            Cancelled. No further action needed.
          </div>
        )}
      </div>
    </Card>
  );
}

/** Kebab menu — secondaries that don't deserve a button row of their own. */
function KebabMenu({
  order,
  onSecondaryChat,
  onDecline,
}: {
  order: Order;
  onSecondaryChat: () => void;
  onDecline: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const click = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', click);
    return () => document.removeEventListener('mousedown', click);
  }, [open]);

  // Build the secondary actions per status.
  const items: { label: string; icon: typeof MessageCircle; danger?: boolean; onClick: () => void }[] = [];
  if (order.status === 'pending') {
    items.push({ label: 'Chat with buyer', icon: MessageCircle, onClick: onSecondaryChat });
    items.push({ label: 'Decline order', icon: XCircle, danger: true, onClick: onDecline });
  } else if (order.status === 'preparing') {
    items.push({ label: 'Chat with buyer', icon: MessageCircle, onClick: onSecondaryChat });
  } else {
    items.push({ label: 'Chat with buyer', icon: MessageCircle, onClick: onSecondaryChat });
  }

  if (items.length === 0) return null;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="More actions"
        className="press flex size-8 items-center justify-center rounded-full bg-canvas text-ink-2 hover:bg-canvas-3"
      >
        <MoreVertical className="size-4" strokeWidth={2.4} />
      </button>
      {open && (
        <div className="absolute right-0 z-30 mt-2 w-56 overflow-hidden rounded-xl border border-line bg-canvas shadow-xl animate-fade-in">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <button
                key={it.label}
                onClick={() => {
                  setOpen(false);
                  it.onClick();
                }}
                className="press flex w-full items-center gap-2.5 px-4 py-3 text-left text-[13px] font-semibold hover:bg-canvas-2"
                style={{ color: it.danger ? '#C53030' : '#171717' }}
              >
                <Icon className="size-4" strokeWidth={2.4} />
                {it.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
