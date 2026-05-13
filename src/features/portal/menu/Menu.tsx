import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Clock, Sparkles, Trash2, Check } from 'lucide-react';

import { PortalShell } from '@/components/layout/PortalShell';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/feedback/Modal';
import { Input } from '@/components/ui/Input';
import { Pill } from '@/components/ui/Pill';
import { Skeleton } from '@/components/ui/Skeleton';
import { apiGet, apiPost, apiPatch, apiDelete } from '@/lib/api/client';
import { API } from '@/lib/api/endpoints';
import { qk } from '@/lib/api/queryClient';
import { useToast } from '@/components/feedback/Toast';
import type { Item } from '@/types/domain';

const ItemFormSchema = z.object({
  name: z.string().min(2, 'Name is required').max(80),
  price: z.number().nonnegative(),
  unit: z.string().min(1),
  minOrder: z.number().positive(),
  leadDays: z.number().int().nonnegative(),
  desc: z.string().max(280),
  veg: z.boolean(),
  popular: z.boolean(),
});
type ItemForm = z.infer<typeof ItemFormSchema>;

export function Menu() {
  const qc = useQueryClient();
  const { push } = useToast();
  const [editing, setEditing] = useState<Item | null>(null);
  const [adding, setAdding] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: qk.menu,
    queryFn: () => apiGet<{ items: Item[] }>(API.menuItems),
  });

  const togglePause = useMutation({
    mutationFn: (it: Item) => apiPatch<Item>(API.menuItem(it.id), { paused: !it.paused }),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: qk.menu });
      push(vars.paused ? `${vars.name} resumed` : `${vars.name} paused`);
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => apiDelete(API.menuItem(id)),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.menu });
      push('Item removed', 'info');
    },
  });

  return (
    <PortalShell>
      <CardHeader
        title="Menu"
        sub={`${data?.items.length ?? 0} items · live + paused`}
        action={
          <Button
            variant="primary"
            size="lg"
            onClick={() => setAdding(true)}
            leftIcon={<Plus className="size-4" strokeWidth={2.5} />}
          >
            Add new item
          </Button>
        }
      />

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-72" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data!.items.map((it) => (
            <Card key={it.id} padding="none" className="hover-lift overflow-hidden" style={{ opacity: it.paused ? 0.65 : 1 }}>
              <div className="relative flex aspect-[16/9] items-center justify-center text-7xl" style={{ background: it.imgBg }}>
                <span>{it.img}</span>
                {it.popular && (
                  <div className="absolute top-3 left-3">
                    <Pill tone="saffron">★ Bestseller</Pill>
                  </div>
                )}
                {it.paused && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <span className="text-[10px] font-extrabold tracking-[0.18em] text-white uppercase">Paused</span>
                  </div>
                )}
                {it.festival && (
                  <div className="absolute bottom-3 left-3 rounded-md bg-saffron px-2 py-1 text-[9px] font-extrabold tracking-wider text-white uppercase">
                    {it.festival}
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="mb-1.5 flex items-center gap-2">
                  <div
                    className="flex size-3 items-center justify-center rounded-sm border-[1.5px]"
                    style={{ borderColor: it.veg ? '#16A34A' : '#C53030' }}
                  >
                    <div
                      className="size-1 rounded-full"
                      style={{ background: it.veg ? '#16A34A' : '#C53030' }}
                    />
                  </div>
                  <h3 className="font-display text-[18px] font-black tracking-tight text-ink">{it.name}</h3>
                </div>
                <p className="mb-3 line-clamp-2 text-[12px] text-ink-2">{it.desc}</p>
                <div className="mb-3 flex items-baseline gap-1">
                  <span className="text-[18px] font-extrabold text-ink">₹{it.price}</span>
                  <span className="text-[12px] text-ink-2">/ {it.unit}</span>
                </div>
                <div className="mb-3 flex items-center gap-2 text-[10px] text-ink-2">
                  <span className="flex items-center gap-0.5">
                    <Clock className="size-2.5" strokeWidth={2.5} />
                    {it.leadDays}d
                  </span>
                  <span>·</span>
                  <span>Min {it.minOrder}</span>
                  <span>·</span>
                  <span className={it.soldThisMonth > 100 ? 'text-green' : 'text-ink-2'}>
                    {it.soldThisMonth} sold
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditing(it)}
                    leftIcon={<Sparkles className="size-3" strokeWidth={2.5} />}
                    className="flex-1"
                  >
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => togglePause.mutate(it)}>
                    {it.paused ? 'Resume' : 'Pause'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          <button
            onClick={() => setAdding(true)}
            className="press hover-lift flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-green bg-green-lighter p-8 text-green"
          >
            <div className="flex size-12 items-center justify-center rounded-full bg-canvas">
              <Plus className="size-6" strokeWidth={2.5} />
            </div>
            <div className="text-[14px] font-extrabold">Add a new dish</div>
            <div className="text-[11px] font-semibold text-ink-2">Karanji, modaka, anything you make</div>
          </button>
        </div>
      )}

      {(editing || adding) && (
        <ItemEditModal
          mode={editing ? 'edit' : 'add'}
          item={editing}
          onClose={() => {
            setEditing(null);
            setAdding(false);
          }}
          onDeleted={() => {
            if (editing) remove.mutate(editing.id);
          }}
        />
      )}
    </PortalShell>
  );
}

function ItemEditModal({
  mode,
  item,
  onClose,
  onDeleted,
}: {
  mode: 'add' | 'edit';
  item: Item | null;
  onClose: () => void;
  onDeleted: () => void;
}) {
  const qc = useQueryClient();
  const { push } = useToast();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ItemForm>({
    resolver: zodResolver(ItemFormSchema),
    defaultValues: {
      name: item?.name ?? '',
      price: item?.price ?? 0,
      unit: item?.unit ?? 'piece',
      minOrder: item?.minOrder ?? 1,
      leadDays: item?.leadDays ?? 2,
      desc: item?.desc ?? '',
      veg: item?.veg ?? true,
      popular: item?.popular ?? false,
    },
  });

  const save = useMutation({
    mutationFn: async (values: ItemForm) => {
      if (mode === 'add') {
        return apiPost<Item>(API.menuItems, { ...values, img: '🍪', imgBg: '#FFF6E5' });
      }
      return apiPatch<Item>(API.menuItem(item!.id), values);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.menu });
      push(mode === 'add' ? 'Item listed' : 'Saved');
      onClose();
    },
    onError: (e: Error) => push(e.message || 'Save failed', 'error'),
  });

  return (
    <Modal
      open
      onClose={onClose}
      title={watch('name') || (mode === 'add' ? 'New item' : 'Edit item')}
      sub={mode === 'add' ? 'New item' : 'Edit item'}
      footer={
        <form className="flex items-center gap-3" onSubmit={handleSubmit((v) => save.mutate(v))}>
          {mode === 'edit' && (
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={onDeleted}
              className="border-danger-light text-danger"
              aria-label="Delete"
            >
              <Trash2 className="size-4" strokeWidth={2.4} />
            </Button>
          )}
          <Button type="button" variant="outline" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="md" loading={isSubmitting} className="flex-1">
            {mode === 'add' ? 'List this item' : 'Save changes'}
          </Button>
        </form>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit((v) => save.mutate(v))}>
        <Input label="Dish name" placeholder="e.g. Karanji" error={errors.name?.message} {...register('name')} />
        <div>
          <label className="mb-1.5 block text-[10px] font-extrabold tracking-[0.14em] text-ink-2 uppercase">
            Description
          </label>
          <textarea
            {...register('desc')}
            rows={2}
            placeholder="Sweet half-moon parcels…"
            className="w-full resize-none rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-[13px] font-semibold text-ink outline-none"
          />
          <div className="mt-1 text-[10px] text-ink-3">{watch('desc')?.length ?? 0} / 280 characters</div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Input
            label="Price (₹)"
            type="number"
            min="0"
            error={errors.price?.message}
            {...register('price', { valueAsNumber: true })}
          />
          <div>
            <label className="mb-1.5 block text-[10px] font-extrabold tracking-[0.14em] text-ink-2 uppercase">
              Unit
            </label>
            <select
              {...register('unit')}
              className="w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-[14px] font-semibold text-ink outline-none"
            >
              <option value="piece">piece</option>
              <option value="kg">kg</option>
              <option value="250g">250g</option>
              <option value="500g">500g</option>
              <option value="500ml">500ml</option>
            </select>
          </div>
          <Input
            label="Min order"
            type="number"
            min="1"
            error={errors.minOrder?.message}
            {...register('minOrder', { valueAsNumber: true })}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[10px] font-extrabold tracking-[0.14em] text-ink-2 uppercase">
            Lead time
          </label>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 7].map((d) => {
              const active = watch('leadDays') === d;
              return (
                <button
                  type="button"
                  key={d}
                  onClick={() => setValue('leadDays', d)}
                  className={`press rounded-full border px-3 py-1.5 text-[12px] font-extrabold ${
                    active ? 'border-green bg-green text-white' : 'border-line bg-canvas text-ink'
                  }`}
                >
                  {d} day{d > 1 ? 's' : ''}
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'veg' as const, label: 'Pure veg' },
            { key: 'popular' as const, label: 'Mark as bestseller' },
          ].map(({ key, label }) => {
            const active = watch(key);
            return (
              <button
                type="button"
                key={key}
                onClick={() => setValue(key, !active)}
                className={`press flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-semibold ${
                  active ? 'border-green bg-green-lighter text-green' : 'border-line bg-canvas text-ink'
                }`}
              >
                {active && <Check className="size-3" strokeWidth={3} />}
                {label}
              </button>
            );
          })}
        </div>
      </form>
    </Modal>
  );
}
