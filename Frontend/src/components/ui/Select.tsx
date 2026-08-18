import { type SelectHTMLAttributes, forwardRef } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className, id, ...props }, ref) => {
    const selectId = id ?? props.name;
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="mb-1.5 block text-sm font-semibold text-navy-800">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={[
            'w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-navy-900',
            'transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0',
            error
              ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
              : 'border-slate-300 focus:border-electric-500 focus:ring-electric-200',
            className ?? '',
          ].join(' ')}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
      </div>
    );
  },
);

Select.displayName = 'Select';
