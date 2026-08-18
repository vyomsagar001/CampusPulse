import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import type { CampusEvent, Club } from '@/types';
import { CategoryBadge, StatusBadge } from '@/components/ui/Badge';
import { formatDate, formatTime, isRegistrationOpen } from '@/utils/format';

interface EventCardProps {
  event: CampusEvent;
  club?: Club;
  compact?: boolean;
}

export function EventCard({ event, club, compact = false }: EventCardProps) {
  const regOpen = isRegistrationOpen(event.registrationDeadline, event.status);
  const capacityPct = Math.min(100, Math.round(((event.registeredCount ?? 0) / event.capacity) * 100));
  const isFull = (event.registeredCount ?? 0) >= event.capacity;

  return (
    <Link
      to={`/events/${event.id}`}
      className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift hover:border-navy-200"
    >
      <div className="relative h-36 overflow-hidden bg-navy-100">
        {event.banner ? (
          <img
            src={event.banner}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-navy-800 to-electric-600" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex gap-2">
          <CategoryBadge category={event.category} className="bg-white/90 backdrop-blur-sm" />
        </div>
        <div className="absolute right-3 top-3">
          <StatusBadge status={event.status} className="bg-white/90 backdrop-blur-sm" />
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-display text-base font-bold text-navy-900 transition-colors group-hover:text-electric-700">
          {event.title}
        </h3>
        {club && (
          <p className="mt-1 text-sm font-medium text-slate-500">{club.name}</p>
        )}

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Calendar className="h-4 w-4 text-slate-400" />
            <span>{formatDate(event.startDate)}</span>
            {!compact && (
              <>
                <span className="text-slate-300">·</span>
                <Clock className="h-4 w-4 text-slate-400" />
                <span>{formatTime(event.startDate)}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <MapPin className="h-4 w-4 text-slate-400" />
            <span className="truncate">{event.venue}</span>
          </div>
        </div>

        {!compact && (
          <div className="mt-4 border-t border-slate-100 pt-4">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-medium text-slate-500">
                <Users className="h-3.5 w-3.5" />
                {event.registeredCount ?? 0} of {event.capacity} seats
              </span>
              <span className={isFull ? 'font-semibold text-red-500' : 'font-semibold text-slate-600'}>
                {isFull ? 'Full' : `${capacityPct}% filled`}
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isFull ? 'bg-red-500' : capacityPct > 80 ? 'bg-amber-500' : 'bg-electric-500'
                }`}
                style={{ width: `${capacityPct}%` }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className={`text-xs font-semibold ${regOpen ? 'text-emerald-600' : 'text-slate-400'}`}>
                {regOpen ? `Reg closes ${formatDate(event.registrationDeadline)}` : 'Registration closed'}
              </span>
              <span className="text-xs font-semibold text-electric-600 transition-transform group-hover:translate-x-0.5">
                View →
              </span>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
