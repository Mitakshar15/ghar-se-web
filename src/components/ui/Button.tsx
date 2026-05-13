import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline' | 'saffron';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
  fullWidth?: boolean;
}

const base =
  'inline-flex items-center justify-center gap-2 font-extrabold press disabled:opacity-50 disabled:cursor-not-allowed transition-colors';

const sizeClasses: Record<Size, string> = {
  sm: 'rounded-lg px-3 py-1.5 text-[12px]',
  md: 'rounded-xl px-4 py-2.5 text-[13px]',
  lg: 'rounded-full px-5 py-3 text-[14px]',
};

const variantClasses: Record<Variant, string> = {
  primary: 'bg-green text-white hover:bg-green-mid',
  secondary: 'bg-canvas-2 text-ink hover:bg-canvas-3 border border-line',
  ghost: 'text-ink hover:bg-canvas-2',
  outline: 'border-2 border-line text-ink hover:bg-canvas-2',
  saffron: 'bg-saffron text-white hover:bg-saffron-dark',
  danger: 'bg-danger text-white hover:bg-red-700',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    leftIcon,
    rightIcon,
    fullWidth,
    className,
    disabled,
    children,
    type = 'button',
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={cn(base, sizeClasses[size], variantClasses[variant], fullWidth && 'w-full', className)}
      {...rest}
    >
      {loading ? <Spinner /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
});

function Spinner() {
  return (
    <span className="inline-block size-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
  );
}
