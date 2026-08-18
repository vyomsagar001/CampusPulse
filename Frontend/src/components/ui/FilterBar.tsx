import { SlidersHorizontal, X } from 'lucide-react';

export interface FilterOption {
  value: string;
  label: string;
}

interface FilterBarProps {
  filters: {
    key: string;
    label: string;
    value: string;
    options: FilterOption[];
  }[];
  onChange: (key: string, value: string) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
  className?: string;
}

export function FilterBar({ filters, onChange, onClear, hasActiveFilters, className = '' }: FilterBarProps) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <div className="flex items-center gap-2 text-sm font-semibold text-navy-700">
        <SlidersHorizontal className="h-4 w-4" />
        Filters
      </div>
      {filters.map((f) => (
        <select
          key={f.key}
          value={f.value}
          onChange={(e) => onChange(f.key, e.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-navy-800 transition-colors hover:border-slate-400 focus:border-electric-500 focus:outline-none focus:ring-2 focus:ring-electric-200"
        >
          <option value="">{f.label}: All</option>
          {f.options.map((o) => (
            <option key={o.value} value={o.value}>
              {f.label}: {o.label}
            </option>
          ))}
        </select>
      ))}
      {hasActiveFilters && (
        <button
          onClick={onClear}
          className="inline-flex items-center gap-1 rounded-lg px-2.5 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-navy-700"
        >
          <X className="h-3.5 w-3.5" />
          Clear
        </button>
      )}
    </div>
  );
}
