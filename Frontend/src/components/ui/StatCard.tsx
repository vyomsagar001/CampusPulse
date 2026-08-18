import type { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  trend?: { value: string; positive: boolean };
  color?: 'navy' | 'electric' | 'accent' | 'emerald';
}

const colorClasses = {
  navy: 'bg-navy-50 text-navy-600',
  electric: 'bg-electric-50 text-electric-600',
  accent: 'bg-accent-50 text-accent-600',
  emerald: 'bg-emerald-50 text-emerald-600',
};

export function StatCard({ label, value, icon, trend, color = 'navy' }: StatCardProps) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition-all duration-300 hover:shadow-card hover:-translate-y-0.5">
      <div className="flex items-start justify-between">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${colorClasses[color]}`}>
          {icon}
        </div>
        {trend && (
          <span
            className={`text-xs font-semibold ${trend.positive ? 'text-emerald-600' : 'text-red-500'}`}
          >
            {trend.value}
          </span>
        )}
      </div>
      <p className="mt-4 font-display text-3xl font-bold text-navy-900">{value}</p>
      <p className="mt-1 text-sm text-slate-500">{label}</p>
    </div>
  );
}
