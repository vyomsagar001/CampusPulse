import type { EventCategory, EventStatus } from '@/types';

const categoryColors: Record<EventCategory, string> = {
  TECHNICAL: 'bg-electric-100 text-electric-700',
  CULTURAL: 'bg-accent-100 text-accent-700',
  SPORTS: 'bg-emerald-100 text-emerald-700',
  ACADEMIC: 'bg-amber-100 text-amber-700',
  WORKSHOP: 'bg-sky-100 text-sky-700',
  HACKATHON: 'bg-navy-100 text-navy-700',
  OTHER: 'bg-slate-100 text-slate-700',
};

const statusColors: Record<EventStatus, string> = {
  DRAFT: 'bg-slate-100 text-slate-600',
  PUBLISHED: 'bg-electric-100 text-electric-700',
  ONGOING: 'bg-emerald-100 text-emerald-700',
  COMPLETED: 'bg-slate-100 text-slate-600',
  CANCELLED: 'bg-red-100 text-red-700',
};

const categoryLabels: Record<EventCategory, string> = {
  TECHNICAL: 'Technical',
  CULTURAL: 'Cultural',
  SPORTS: 'Sports',
  ACADEMIC: 'Academic',
  WORKSHOP: 'Workshop',
  HACKATHON: 'Hackathon',
  OTHER: 'Other',
};

const statusLabels: Record<EventStatus, string> = {
  DRAFT: 'Draft',
  PUBLISHED: 'Open',
  ONGOING: 'Ongoing',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};

export function CategoryBadge({ category, className = '' }: { category: EventCategory; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase ${categoryColors[category]} ${className}`}
    >
      {categoryLabels[category]}
    </span>
  );
}

export function StatusBadge({ status, className = '' }: { status: EventStatus; className?: string }) {
  const dotColor: Record<EventStatus, string> = {
    DRAFT: 'bg-slate-400',
    PUBLISHED: 'bg-electric-500',
    ONGOING: 'bg-emerald-500',
    COMPLETED: 'bg-slate-400',
    CANCELLED: 'bg-red-500',
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColors[status]} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotColor[status]}`} />
      {statusLabels[status]}
    </span>
  );
}

export function Badge({
  children,
  color = 'slate',
  className = '',
}: {
  children: React.ReactNode;
  color?: 'slate' | 'navy' | 'electric' | 'accent' | 'emerald' | 'amber' | 'red';
  className?: string;
}) {
  const colors: Record<string, string> = {
    slate: 'bg-slate-100 text-slate-700',
    navy: 'bg-navy-100 text-navy-700',
    electric: 'bg-electric-100 text-electric-700',
    accent: 'bg-accent-100 text-accent-700',
    emerald: 'bg-emerald-100 text-emerald-700',
    amber: 'bg-amber-100 text-amber-700',
    red: 'bg-red-100 text-red-700',
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${colors[color]} ${className}`}>
      {children}
    </span>
  );
}
