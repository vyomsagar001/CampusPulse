import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarDays,
  Ticket,
  Users,
  Bell,
  ArrowRight,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { StatCard } from '@/components/ui/StatCard';
import { EventCard } from '@/components/EventCard';
import { AnnouncementCard } from '@/components/AnnouncementCard';
import { EmptyState, LoadingState } from '@/components/ui/States';
import { useAuth } from '@/context/AuthContext';
import { getGreeting, formatDate, formatTime } from '@/utils/format';
import { mockEvents, mockClubs, mockRegistrations, mockAnnouncements } from '@/data/mockData';
import type { CampusEvent, Registration } from '@/types';

export function DashboardPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<CampusEvent[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEvents(mockEvents);
      setRegistrations(mockRegistrations.filter((r) => r.userId === user?.id));
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [user?.id]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-28 w-full rounded-2xl" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton h-32 rounded-2xl" />
          ))}
        </div>
        <LoadingState count={3} />
      </div>
    );
  }

  const upcomingEvents = events
    .filter((e) => e.status === 'PUBLISHED' && new Date(e.startDate) >= new Date())
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 4);

  const myRegistrations = registrations
    .map((r) => ({ reg: r, event: events.find((e) => e.id === r.eventId) }))
    .filter((x) => x.event)
    .slice(0, 4);

  const recommendedEvents = events
    .filter(
      (e) =>
        e.status === 'PUBLISHED' &&
        !registrations.some((r) => r.eventId === e.id),
    )
    .filter(
      (e) =>
        e.category === 'WORKSHOP' ||
        (e.category === 'HACKATHON' && user?.interests?.includes('Hackathons')) ||
        user?.interests?.some((interest) =>
          e.title.toLowerCase().includes(interest.toLowerCase().split('/')[0]),
        ),
    )
    .slice(0, 3);

  const recentAnnouncements = mockAnnouncements.slice(0, 3);
  const unreadCount = 3;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-900 to-navy-800 p-6 lg:p-8">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-electric-600/20 blur-3xl" />
        <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-accent-600/20 blur-3xl" />
        <div className="relative">
          <p className="text-sm font-semibold text-electric-300">
            {getGreeting()},
          </p>
          <h1 className="mt-1 font-display text-2xl font-bold text-white lg:text-3xl">
            {user?.name?.split(' ')[0] ?? 'there'} 👋
          </h1>
          <p className="mt-2 text-navy-200">Here's what's happening around campus.</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Upcoming Events" value={upcomingEvents.length} icon={<CalendarDays className="h-5 w-5" />} color="electric" trend={{ value: '+12%', positive: true }} />
        <StatCard label="Registered Events" value={registrations.length} icon={<Ticket className="h-5 w-5" />} color="accent" />
        <StatCard label="Clubs" value={mockClubs.length} icon={<Users className="h-5 w-5" />} color="navy" />
        <StatCard label="Notifications" value={unreadCount} icon={<Bell className="h-5 w-5" />} color="emerald" />
      </div>

      {/* Upcoming Events */}
      <section>
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-xl font-bold text-navy-900">Upcoming Events</h2>
          <Link to="/events" className="inline-flex items-center gap-1 text-sm font-semibold text-electric-600 hover:text-electric-700">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} club={mockClubs.find((c) => c.id === event.club)} />
          ))}
        </div>
      </section>

      {/* My Registrations */}
      <section>
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-xl font-bold text-navy-900">My Registrations</h2>
          <Link to="/events" className="inline-flex items-center gap-1 text-sm font-semibold text-electric-600 hover:text-electric-700">
            Browse more <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
          {myRegistrations.length === 0 ? (
            <EmptyState
              title="No registrations yet"
              message="Browse events and register to see them here."
              icon={<Ticket className="h-7 w-7" />}
              action={
                <Link to="/events">
                  <span className="inline-flex items-center gap-1 rounded-xl bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-800">
                    Explore events <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              }
            />
          ) : (
            <div className="divide-y divide-slate-100">
              {myRegistrations.map(({ reg, event }) => (
                <div key={reg.id} className="flex items-center gap-4 p-4 transition-colors hover:bg-slate-50">
                  <Link to={`/events/${event!.id}`} className="flex min-w-0 flex-1 items-center gap-4">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-navy-100">
                      {event!.banner && <img src={event!.banner} alt="" className="h-full w-full object-cover" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-navy-900">{event!.title}</p>
                      <p className="text-sm text-slate-500">{formatDate(event!.startDate)} · {event!.venue}</p>
                    </div>
                  </Link>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    reg.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-700' :
                    reg.status === 'WAITLISTED' ? 'bg-amber-100 text-amber-700' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {reg.status === 'CONFIRMED' ? 'Confirmed' : reg.status === 'WAITLISTED' ? 'Waitlisted' : reg.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Recommended + Announcements */}
      <div className="grid gap-8 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent-500" />
            <h2 className="font-display text-xl font-bold text-navy-900">Recommended for You</h2>
          </div>
          <p className="mt-1 text-sm text-slate-500">Based on your interests in {user?.interests?.slice(0, 3).join(', ')}</p>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            {recommendedEvents.map((event) => (
              <EventCard key={event.id} event={event} club={mockClubs.find((c) => c.id === event.club)} />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-xl font-bold text-navy-900">Announcements</h2>
            <Link to="/announcements" className="text-sm font-semibold text-electric-600 hover:text-electric-700">
              All
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {recentAnnouncements.map((a) => (
              <AnnouncementCard key={a.id} announcement={a} compact />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
