import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Star, ChefHat, ArrowRight, ThumbsUp } from 'lucide-react';

import { PortalShell } from '@/components/layout/PortalShell';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Pill } from '@/components/ui/Pill';
import { Skeleton } from '@/components/ui/Skeleton';
import { apiGet, apiPost } from '@/lib/api/client';
import { API } from '@/lib/api/endpoints';
import { qk } from '@/lib/api/queryClient';
import { useToast } from '@/components/feedback/Toast';
import type { Review } from '@/types/domain';

type Filter = 'all' | 'unreplied' | 'low';

export function Reviews() {
  const qc = useQueryClient();
  const { push } = useToast();
  const [filter, setFilter] = useState<Filter>('all');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: qk.reviews,
    queryFn: () => apiGet<{ reviews: Review[] }>(API.reviews),
  });

  const reply = useMutation({
    mutationFn: ({ id, text }: { id: string; text: string }) => apiPost(API.reviewReply(id), { reply: text }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.reviews });
      push('Reply posted');
      setReplyingTo(null);
      setReplyText('');
    },
    onError: (e: Error) => push(e.message, 'error'),
  });

  if (isLoading || !data) return <PortalShell><Skeleton className="h-64" /></PortalShell>;
  const total = data.reviews.length;
  const avg = total ? data.reviews.reduce((s, r) => s + r.rating, 0) / total : 0;
  const visible =
    filter === 'all'
      ? data.reviews
      : filter === 'unreplied'
        ? data.reviews.filter((r) => !r.replied)
        : data.reviews.filter((r) => r.rating <= 3);

  const breakdown = [5, 4, 3, 2, 1].map((s) => ({ stars: s, count: data.reviews.filter((r) => r.rating === s).length }));

  return (
    <PortalShell>
      <div className="space-y-5">
        <CardHeader title="Reviews" sub={`${total} verified reviews · keep replies thoughtful, buyers see them on your profile`} />

        <div className="grid gap-5 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <div className="mb-5 text-center">
              <div className="font-display text-[64px] leading-none font-black tracking-tight text-ink">
                {avg.toFixed(1)}
              </div>
              <div className="my-2 flex justify-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="size-5"
                    style={{ color: i <= Math.round(avg) ? '#C8A04D' : '#F4F4F2' }}
                    fill={i <= Math.round(avg) ? '#C8A04D' : 'transparent'}
                    strokeWidth={1.5}
                  />
                ))}
              </div>
              <div className="text-[12px] font-bold text-ink-2">{total} verified reviews · all time</div>
            </div>
            <div className="space-y-2">
              {breakdown.map((b) => (
                <div key={b.stars} className="flex items-center gap-2 text-[11px]">
                  <span className="w-3 font-bold text-ink-2">{b.stars}</span>
                  <Star className="size-2.5 fill-brass" strokeWidth={0} />
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-canvas-3">
                    <div className="h-full bg-brass" style={{ width: `${total ? (b.count / total) * 100 : 0}%` }} />
                  </div>
                  <span className="w-5 text-right font-bold text-ink">{b.count}</span>
                </div>
              ))}
            </div>
          </Card>

          <div className="space-y-4 lg:col-span-2">
            <div className="flex flex-wrap gap-2">
              {([
                { id: 'all', label: `All · ${total}` },
                { id: 'unreplied', label: `Needs reply · ${data.reviews.filter((r) => !r.replied).length}` },
                { id: 'low', label: `3★ or less · ${data.reviews.filter((r) => r.rating <= 3).length}` },
              ] satisfies { id: Filter; label: string }[]).map((t) => (
                <button
                  key={t.id}
                  onClick={() => setFilter(t.id)}
                  className={`press rounded-full px-4 py-2 text-[12px] font-extrabold ${
                    filter === t.id ? 'bg-ink text-white' : 'border border-line bg-canvas text-ink'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {visible.map((r) => (
                <Card key={r.id}>
                  <div className="mb-3 flex items-start gap-3">
                    <div
                      className="flex size-10 flex-shrink-0 items-center justify-center rounded-full text-[13px] font-extrabold text-white"
                      style={{ background: ['#7C3AED', '#F25F0C', '#16A34A', '#0EA5E9'][r.id.charCodeAt(1) % 4] }}
                    >
                      {r.name[0]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-0.5 flex flex-wrap items-center gap-2">
                        <span className="text-[13px] font-extrabold text-ink">{r.name}</span>
                        <span className="text-[10px] text-ink-3">·</span>
                        <span className="text-[10px] text-ink-2">{r.date}</span>
                        <span className="text-[10px] text-ink-3">·</span>
                        <span className="text-[10px] font-bold text-ink-2">For {r.item}</span>
                      </div>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star
                            key={i}
                            className="size-3.5"
                            style={{ color: i <= r.rating ? '#C8A04D' : '#F4F4F2' }}
                            fill={i <= r.rating ? '#C8A04D' : 'transparent'}
                            strokeWidth={1.5}
                          />
                        ))}
                      </div>
                    </div>
                    {!r.replied && <Pill tone="saffron">Needs reply</Pill>}
                  </div>
                  <p className="mb-3 text-[13px] leading-relaxed text-ink">"{r.text}"</p>
                  <div className="flex items-center justify-between text-[11px] text-ink-2">
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="size-3" strokeWidth={2.4} />
                      {r.helpful} found this helpful
                    </span>
                  </div>

                  {r.replied && r.reply && (
                    <div
                      className="mt-4 ml-12 rounded-xl bg-green-lighter p-3"
                      style={{ borderLeft: '3px solid #0B5D4D' }}
                    >
                      <div className="mb-1 flex items-center gap-1.5">
                        <ChefHat className="size-3.5 text-green" strokeWidth={2.4} />
                        <span className="text-[10px] font-extrabold tracking-wider text-green uppercase">
                          You replied
                        </span>
                      </div>
                      <p className="text-[12px] text-ink">"{r.reply}"</p>
                    </div>
                  )}

                  {replyingTo === r.id ? (
                    <div className="mt-4">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value.slice(0, 240))}
                        placeholder={`Thank you ${r.name.split(' ')[0]}, …`}
                        rows={2}
                        className="w-full rounded-xl border border-line bg-canvas px-3 py-2.5 text-[13px] text-ink outline-none"
                        autoFocus
                      />
                      <div className="mt-1 text-[10px] text-ink-3">{replyText.length} / 240 · be warm and specific</div>
                      <div className="mt-3 flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setReplyingTo(null);
                            setReplyText('');
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          loading={reply.isPending}
                          disabled={!replyText.trim()}
                          onClick={() => reply.mutate({ id: r.id, text: replyText })}
                          className="flex-1"
                        >
                          Post reply
                        </Button>
                      </div>
                    </div>
                  ) : (
                    !r.replied && (
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<ArrowRight className="size-3.5" strokeWidth={2.4} />}
                        onClick={() => {
                          setReplyingTo(r.id);
                          setReplyText('');
                        }}
                        className="mt-3"
                      >
                        Reply
                      </Button>
                    )
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
