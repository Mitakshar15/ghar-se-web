import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/Button';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  sub?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = { sm: 'max-w-[420px]', md: 'max-w-[640px]', lg: 'max-w-[860px]' };

export function Modal({ open, onClose, title, sub, children, footer, size = 'md' }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in"
      style={{ background: 'rgba(0,0,0,0.55)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`flex w-full flex-col rounded-3xl bg-canvas shadow-2xl animate-scale-in ${sizeMap[size]}`}
        style={{ maxHeight: '90vh' }}
      >
        <div className="flex items-start gap-4 border-b border-line p-6">
          <div className="min-w-0 flex-1">
            {sub && <div className="text-[10px] font-extrabold tracking-[0.16em] text-ink-2 uppercase">{sub}</div>}
            <h3 className="font-display text-[22px] leading-tight font-black tracking-tight text-ink">
              {title}
            </h3>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close">
            <X className="size-4" strokeWidth={2.4} />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
        {footer && <div className="border-t border-line p-5">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}
