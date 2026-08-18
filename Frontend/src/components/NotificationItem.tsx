import { Link } from 'react-router-dom';
import { CheckCircle2, Bell, AlertCircle, Calendar, Info } from 'lucide-react';
import type { AppNotification } from '@/types';
import { formatRelative } from '@/utils/format';

const typeConfig = {
  REGISTRATION_CONFIRMATION: { icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
  EVENT_REMINDER: { icon: Calendar, color: 'text-electric-600 bg-electric-50' },
  EVENT_CANCELLATION: { icon: AlertCircle, color: 'text-red-500 bg-red-50' },
  NEW_ANNOUNCEMENT: { icon: Info, color: 'text-accent-600 bg-accent-50' },
} as const;

interface NotificationItemProps {
  notification: AppNotification;
  onMarkAsRead?: (id: string) => void;
}

export function NotificationItem({ notification, onMarkAsRead }: NotificationItemProps) {
  const cfg = typeConfig[notification.type];
  const Icon = cfg.icon;

  const content = (
    <div
      className={`flex gap-3.5 rounded-xl border p-4 transition-all ${
        notification.read
          ? 'border-slate-100 bg-white'
          : 'border-electric-100 bg-electric-50/40'
      } hover:border-slate-200 hover:shadow-soft`}
    >
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${cfg.color}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-bold text-navy-900">{notification.title}</p>
          <span className="shrink-0 text-xs text-slate-400">{formatRelative(notification.timestamp)}</span>
        </div>
        <p className="mt-0.5 text-sm text-slate-500">{notification.message}</p>
        {!notification.read && onMarkAsRead && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onMarkAsRead(notification.id);
            }}
            className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-electric-600 hover:text-electric-700"
          >
            <Bell className="h-3 w-3" />
            Mark as read
          </button>
        )}
      </div>
      {!notification.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-electric-500" />}
    </div>
  );

  if (notification.eventId) {
    return (
      <Link to={`/events/${notification.eventId}`} className="block">
        {content}
      </Link>
    );
  }
  return content;
}
