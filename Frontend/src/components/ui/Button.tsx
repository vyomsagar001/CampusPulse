import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-navy-900 text-white hover:bg-navy-800 shadow-soft hover:shadow-card focus-visible:ring-navy-900',
  secondary:
    'bg-electric-600 text-white hover:bg-electric-700 shadow-soft hover:shadow-card focus-visible:ring-electric-600',
  outline:
    'border border-slate-300 bg-white text-navy-800 hover:border-navy-300 hover:bg-slate-50 focus-visible:ring-navy-300',
  ghost:
    'text-navy-700 hover:bg-slate-100 focus-visible:ring-slate-300',
  danger:
    'bg-red-600 text-white hover:bg-red-700 shadow-soft focus-visible:ring-red-600',
  success:
    'bg-emerald-600 text-white hover:bg-emerald-700 shadow-soft focus-visible:ring-emerald-600',
};

const sizeClasses: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm gap-1.5',
  md: 'h-11 px-5 text-sm gap-2',
  lg: 'h-13 px-7 text-base gap-2.5',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'primary', size = 'md', loading, fullWidth, className, children, disabled, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={[
          'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]',
          variantClasses[variant],
          sizeClasses[size],
          fullWidth ? 'w-full' : '',
          className ?? '',
        ].join(' ')}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
