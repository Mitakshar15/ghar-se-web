import { create } from 'zustand';
import { Bell, Check, AlertCircle, Info } from 'lucide-react';
import { useEffect } from 'react';

type ToastType = 'success' | 'error' | 'info';
interface ToastEntry {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastState {
  toasts: ToastEntry[];
  push: (message: string, type?: ToastType) => void;
  dismiss: (id: number) => void;
}

let counter = 0;

export const useToast = create<ToastState>((set) => ({
  toasts: [],
  push: (message, type = 'success') => {
    const id = ++counter;
    set((s) => ({ toasts: [...s.toasts, { id, message, type }] }));
    setTimeout(() => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })), 2800);
  },
  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

export function ToastContainer() {
  const { toasts, dismiss } = useToast();
  useEffect(() => {
    // no-op; subscription via hook
  }, [toasts]);
  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-[100] flex flex-col gap-2">
      {toasts.map((t) => (
        <button
          key={t.id}
          onClick={() => dismiss(t.id)}
          className="pointer-events-auto flex items-center gap-3 rounded-2xl px-4 py-3 text-left shadow-2xl text-white animate-fade-up"
          style={{
            background: t.type === 'success' ? '#0B5D4D' : t.type === 'error' ? '#C53030' : '#171717',
          }}
        >
          <span className="flex size-7 items-center justify-center rounded-full bg-white/20">
            {t.type === 'success' ? (
              <Check className="size-4" strokeWidth={3} />
            ) : t.type === 'error' ? (
              <AlertCircle className="size-4" strokeWidth={2.5} />
            ) : (
              <Info className="size-4" strokeWidth={2.5} />
            )}
          </span>
          <span className="text-[13px] font-bold">{t.message}</span>
          <Bell className="size-3 opacity-40" />
        </button>
      ))}
    </div>
  );
}
