import { Megaphone, AlertTriangle, CalendarDays, Info } from 'lucide-react';
import type { Announcement } from '@/types';
import { formatRelative } from '@/utils/format';

const categoryConfig = {
  IMPORTANT: { icon: AlertTriangle, color: 'text-red-500 bg-red-50', border: 'border-red-100' },
  GENERAL: { icon: Info, color: 'text-electric-600 bg-electric-50', border: 'border-electric-100' },
  EVENT: { icon: CalendarDays, color: 'text-accent-600 bg-accent-50', border: 'border-accent-100' },
} as const;

const priorityLabels = {
  HIGH: { label: 'High Priority', color: 'bg-red-100 text-red-700' },
  MEDIUM: { label: 'Medium', color: 'bg-amber-100 text-amber-700' },
  LOW: { label: 'Low', color: 'bg-slate-100 text-slate-600' },
} as const;

interface AnnouncementCardProps {
  announcement: Announcement;
  compact?: boolean;
}

export function AnnouncementCard({ announcement, compact = false }: AnnouncementCardProps) {
  const cfg = categoryConfig[announcement.category];
  const Icon = cfg.icon;
  const priority = priorityLabels[announcement.priority];

  return (
    <div className={`rounded-2xl border ${cfg.border} bg-white p-5 shadow-soft transition-all hover:shadow-card`}>
      <div className="flex items-start gap-3.5">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${cfg.color}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${priority.color}`}>
              {priority.label}
            </span>
            <span className="text-xs text-slate-400">{formatRelative(announcement.date)}</span>
          </div>
          <h3 className="mt-2 font-display text-base font-bold text-navy-900">{announcement.title}</h3>
          {!compact && (
            <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{announcement.description}</p>
          )}
          <p className="mt-2.5 text-xs font-medium text-slate-400">
            <Megaphone className="mr-1 inline h-3 w-3" />
            {announcement.author}
          </p>
        </div>
      </div>
    </div>
  );
}
