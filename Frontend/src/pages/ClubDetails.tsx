import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Instagram,
  Linkedin,
  Globe,
  Mail,
  Calendar,
  CheckCircle2,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { EventCard } from '@/components/EventCard';
import { EmptyState, LoadingState } from '@/components/ui/States';
import { mockUsers } from '@/data/mockData';
import { clubsApi } from '@/api/clubs';
import { eventsApi } from '@/api/events';
import { formatDate } from '@/utils/format';
import type { Club, CampusEvent } from '@/types';

export function ClubDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [club, setClub] = useState<Club | null>(null);
  const [events, setEvents] = useState<CampusEvent[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const loadClubDetails = async () => {
    try {
      setLoading(true);

      if (!id) {
        setClub(null);
        setEvents([]);
        return;
      }

      const [clubData, eventsData] = await Promise.all([
        clubsApi.getById(id),
        eventsApi.getByClubId(id),
      ]);

      setClub(clubData);
      setEvents(eventsData);
    } catch (error) {
      console.error('Failed to load club details:', error);
      setClub(null);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  loadClubDetails();
}, [id]);

  if (loading) return <LoadingState count={3} />;

  if (!club) {
    return (
      <EmptyState
        title="Club not found"
        message="This club may have been removed or the link is incorrect."
        action={
          <Link to="/clubs">
            <span className="inline-flex items-center gap-1 rounded-xl bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-800">
              <ArrowLeft className="h-4 w-4" /> Back to clubs
            </span>
          </Link>
        }
      />
    );
  }

  const upcomingEvents = events.filter((e) => new Date(e.startDate) >= new Date() && e.status !== 'CANCELLED');
  const pastEvents = events.filter((e) => new Date(e.startDate) < new Date());
  const admins = mockUsers.filter((u) => club.admins.includes(u.id));

  return (
    <div className="space-y-6">
      <Link to="/clubs" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition-colors hover:text-navy-700">
        <ArrowLeft className="h-4 w-4" /> Back to clubs
      </Link>

      {/* Club header */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-soft lg:p-8">
        <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-electric-100/40 blur-3xl" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-navy-50 shadow-soft">
            {club.logo ? (
              <img src={club.logo} alt={club.name} className="h-full w-full object-cover" />
            ) : (
              <span className="font-display text-3xl font-bold text-navy-700">{club.name.charAt(0)}</span>
            )}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display text-2xl font-bold text-navy-900">{club.name}</h1>
              <Badge color="electric">{club.category}</Badge>
              {club.status === 'ACTIVE' && <Badge color="emerald">Active</Badge>}
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">{club.description}</p>

            <div className="mt-5 flex flex-wrap items-center gap-4">
              {club.contactEmail && (
                <a href={`mailto:${club.contactEmail}`} className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-navy-700">
                  <Mail className="h-4 w-4 text-slate-400" /> {club.contactEmail}
                </a>
              )}
              {club.socialLinks?.instagram && (
                <a href={club.socialLinks.instagram} target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-colors hover:bg-accent-50 hover:text-accent-600">
                  <Instagram className="h-4 w-4" />
                </a>
              )}
              {club.socialLinks?.linkedin && (
                <a href={club.socialLinks.linkedin} target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-colors hover:bg-electric-50 hover:text-electric-600">
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
              {club.socialLinks?.website && (
                <a href={club.socialLinks.website} target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-colors hover:bg-navy-50 hover:text-navy-700">
                  <Globe className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-electric-50 text-electric-600">
            <Calendar className="h-5 w-5" />
          </div>
          <p className="mt-3 font-display text-2xl font-bold text-navy-900">{upcomingEvents.length}</p>
          <p className="text-sm text-slate-500">Upcoming Events</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <p className="mt-3 font-display text-2xl font-bold text-navy-900">{pastEvents.length}</p>
          <p className="text-sm text-slate-500">Past Events</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 text-navy-600">
            <Users className="h-5 w-5" />
          </div>
          <p className="mt-3 font-display text-2xl font-bold text-navy-900">{admins.length}</p>
          <p className="text-sm text-slate-500">Admins</p>
        </div>
      </div>

      {/* Upcoming events */}
      <section>
        <h2 className="font-display text-xl font-bold text-navy-900">Upcoming Events</h2>
        {upcomingEvents.length === 0 ? (
          <div className="mt-4">
            <EmptyState title="No upcoming events" message={`${club.name} hasn't announced any upcoming events yet.`} icon={<Calendar className="h-7 w-7" />} />
          </div>
        ) : (
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} club={club} />
            ))}
          </div>
        )}
      </section>

      {/* Past events */}
      {pastEvents.length > 0 && (
        <section>
          <h2 className="font-display text-xl font-bold text-navy-900">Past Events</h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} club={club} compact />
            ))}
          </div>
        </section>
      )}

      {/* Admins */}
      <section>
        <h2 className="font-display text-xl font-bold text-navy-900">Club Administrators</h2>
        <div className="mt-4 space-y-3">
          {admins.length === 0 ? (
            <p className="text-sm text-slate-500">No administrators listed.</p>
          ) : (
            admins.map((admin) => (
              <div key={admin.id} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
                <img
                  src={admin.profile?.profilePicture ?? `https://api.dicebear.com/7.x/initials/svg?seed=${admin.name}`}
                  alt={admin.name}
                  className="h-12 w-12 rounded-xl object-cover"
                />
                <div>
                  <p className="font-bold text-navy-900">{admin.name}</p>
                  <p className="text-sm text-slate-500">{admin.email}</p>
                </div>
                <Badge color="electric" className="ml-auto">Admin</Badge>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
