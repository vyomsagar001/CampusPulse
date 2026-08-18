import { type TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const textareaId = id ?? props.name;
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="mb-1.5 block text-sm font-semibold text-navy-800">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={[
            'w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-navy-900 placeholder:text-slate-400',
            'transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 resize-y min-h-[100px]',
            error
              ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
              : 'border-slate-300 focus:border-electric-500 focus:ring-electric-200',
            className ?? '',
          ].join(' ')}
          {...props}
        />
        {error && <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
        {hint && !error && <p className="mt-1.5 text-xs text-slate-500">{hint}</p>}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
