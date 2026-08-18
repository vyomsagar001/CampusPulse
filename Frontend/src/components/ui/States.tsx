import type { ReactNode } from 'react';
import { Inbox, AlertCircle } from 'lucide-react';

export function EmptyState({
  title,
  message,
  action,
  icon,
}: {
  title: string;
  message?: string;
  action?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        {icon ?? <Inbox className="h-7 w-7" />}
      </div>
      <h3 className="mt-4 font-display text-base font-bold text-navy-800">{title}</h3>
      {message && <p className="mt-1.5 max-w-sm text-sm text-slate-500">{message}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function ErrorState({
  message = 'Something went wrong. Please try again.',
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50/50 px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-500">
        <AlertCircle className="h-7 w-7" />
      </div>
      <h3 className="mt-4 font-display text-base font-bold text-navy-800">Something went wrong</h3>
      <p className="mt-1.5 max-w-sm text-sm text-slate-500">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-5 rounded-xl bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
        >
          Try again
        </button>
      )}
    </div>
  );
}

export function LoadingState({ count = 3 }: { count?: number }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="skeleton h-40 w-full rounded-none" />
          <div className="space-y-3 p-5">
            <div className="skeleton h-4 w-20 rounded-full" />
            <div className="skeleton h-5 w-3/4" />
            <div className="skeleton h-4 w-1/2" />
            <div className="flex gap-3 pt-2">
              <div className="skeleton h-4 w-24" />
              <div className="skeleton h-4 w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
