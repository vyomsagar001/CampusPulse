import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Globe, ArrowRight } from 'lucide-react';
import type { Club } from '@/types';
import { Badge } from '@/components/ui/Badge';

interface ClubCardProps {
  club: Club;
  eventCount?: number;
}

export function ClubCard({ club, eventCount }: ClubCardProps) {
  return (
    <Link
      to={`/clubs/${club.id}`}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift hover:border-navy-200"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-navy-50">
          {club.logo ? (
            <img src={club.logo} alt={club.name} className="h-full w-full object-cover" />
          ) : (
            <span className="font-display text-xl font-bold text-navy-700">
              {club.name.charAt(0)}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-base font-bold text-navy-900 transition-colors group-hover:text-electric-700">
            {club.name}
          </h3>
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            <Badge color="electric">{club.category}</Badge>
            {club.status === 'ACTIVE' && <Badge color="emerald">Active</Badge>}
            {eventCount !== undefined && <Badge color="slate">{eventCount} events</Badge>}
          </div>
        </div>
      </div>

      <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-slate-500">
        {club.description}
      </p>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="flex items-center gap-3">
          {club.socialLinks?.instagram && (
            <Instagram className="h-4 w-4 text-slate-400 transition-colors hover:text-accent-600" />
          )}
          {club.socialLinks?.linkedin && (
            <Linkedin className="h-4 w-4 text-slate-400 transition-colors hover:text-electric-600" />
          )}
          {club.socialLinks?.website && (
            <Globe className="h-4 w-4 text-slate-400 transition-colors hover:text-navy-600" />
          )}
        </div>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-electric-600 transition-transform group-hover:gap-2">
          View Club <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
