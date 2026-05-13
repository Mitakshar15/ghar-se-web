import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  leftAddon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, leftAddon, className, ...rest },
  ref,
) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-1.5 block text-[10px] font-extrabold tracking-[0.14em] text-ink-2 uppercase">
          {label}
        </label>
      )}
      <div
        className={cn(
          'flex overflow-hidden rounded-xl border bg-canvas',
          error ? 'border-danger' : 'border-line',
        )}
      >
        {leftAddon && (
          <span className="flex items-center border-r border-line bg-canvas-2 px-3.5 text-[14px] font-semibold text-ink-2">
            {leftAddon}
          </span>
        )}
        <input
          ref={ref}
          className={cn(
            'flex-1 bg-transparent px-3.5 py-2.5 text-[14px] font-semibold text-ink outline-none placeholder:text-ink-3',
            className,
          )}
          {...rest}
        />
      </div>
      {(hint || error) && (
        <div className={cn('mt-1 text-[10px]', error ? 'text-danger' : 'text-ink-3')}>{error ?? hint}</div>
      )}
    </div>
  );
});
