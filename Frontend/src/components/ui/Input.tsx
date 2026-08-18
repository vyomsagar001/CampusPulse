import { type InputHTMLAttributes, forwardRef, type ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, icon, className, id, ...props }, ref) => {
    const inputId = id ?? props.name;
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="mb-1.5 block text-sm font-semibold text-navy-800">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={[
              'w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-navy-900 placeholder:text-slate-400',
              'transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0',
              icon ? 'pl-11' : '',
              error
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                : 'border-slate-300 focus:border-electric-500 focus:ring-electric-200',
              className ?? '',
            ].join(' ')}
            {...props}
          />
        </div>
        {error && <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
        {hint && !error && <p className="mt-1.5 text-xs text-slate-500">{hint}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';
