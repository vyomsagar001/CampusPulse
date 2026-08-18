import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  CalendarDays,
  Ticket,
  Building2,
  AlertCircle,
  Megaphone,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';
import { StatCard } from '@/components/ui/StatCard';
import { Badge, CategoryBadge, StatusBadge } from '@/components/ui/Badge';
import { AnnouncementCard } from '@/components/AnnouncementCard';
import { LoadingState } from '@/components/ui/States';
import { mockUsers, mockClubs, mockEvents, mockRegistrations, mockAnnouncements, mockIssues } from '@/data/mockData';
import { formatDate } from '@/utils/format';

export function AdminPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingState count={4} />;

  const students = mockUsers.filter((u) => u.role === 'STUDENT').length;
  const totalClubs = mockClubs.length;
  const totalEvents = mockEvents.length;
  const totalRegistrations = mockRegistrations.length;

  // Mock chart data
  const monthlyData = [
    { month: 'Mar', events: 8 },
    { month: 'Apr', events: 12 },
    { month: 'May', events: 6 },
    { month: 'Jun', events: 15 },
    { month: 'Jul', events: 10 },
    { month: 'Aug', events: 18 },
  ];
  const maxMonthly = Math.max(...monthlyData.map((m) => m.events));

  const categoryData = [
    { category: 'Technical', count: mockEvents.filter((e) => e.category === 'TECHNICAL').length, color: 'bg-electric-500' },
    { category: 'Workshop', count: mockEvents.filter((e) => e.category === 'WORKSHOP').length, color: 'bg-sky-500' },
    { category: 'Hackathon', count: mockEvents.filter((e) => e.category === 'HACKATHON').length, color: 'bg-navy-700' },
    { category: 'Cultural', count: mockEvents.filter((e) => e.category === 'CULTURAL').length, color: 'bg-accent-500' },
    { category: 'Sports', count: mockEvents.filter((e) => e.category === 'SPORTS').length, color: 'bg-emerald-500' },
    { category: 'Academic', count: mockEvents.filter((e) => e.category === 'ACADEMIC').length, color: 'bg-amber-500' },
  ];
  const maxCategory = Math.max(...categoryData.map((c) => c.count));

  const registrationTrend = [
    { week: 'W1', count: 45 },
    { week: 'W2', count: 62 },
    { week: 'W3', count: 38 },
    { week: 'W4', count: 78 },
    { week: 'W5', count: 95 },
    { week: 'W6', count: 120 },
  ];
  const maxReg = Math.max(...registrationTrend.map((r) => r.count));

  const recentEvents = [...mockEvents].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);
  const recentIssues = mockIssues.slice(0, 4);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-navy-900">Campus Admin Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">Platform-wide overview and management.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Students" value={students + 7980} icon={<Users className="h-5 w-5" />} color="navy" trend={{ value: '+5.2%', positive: true }} />
        <StatCard label="Total Clubs" value={totalClubs} icon={<Building2 className="h-5 w-5" />} color="electric" />
        <StatCard label="Total Events" value={totalEvents} icon={<CalendarDays className="h-5 w-5" />} color="accent" trend={{ value: '+12%', positive: true }} />
        <StatCard label="Registrations" value={totalRegistrations + 1240} icon={<Ticket className="h-5 w-5" />} color="emerald" trend={{ value: '+18%', positive: true }} />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Events per month */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-navy-900">Events per Month</h2>
            <TrendingUp className="h-5 w-5 text-emerald-500" />
          </div>
          <div className="mt-6 flex items-end justify-between gap-3 h-40">
            {monthlyData.map((m) => (
              <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-t-lg bg-gradient-to-t from-electric-600 to-electric-400 transition-all duration-500 hover:from-electric-700 hover:to-electric-500" style={{ height: `${(m.events / maxMonthly) * 100}%` }} title={`${m.events} events`} />
                <span className="text-xs font-semibold text-slate-500">{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Registrations over time */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-navy-900">Registrations Over Time</h2>
            <Ticket className="h-5 w-5 text-accent-500" />
          </div>
          <div className="mt-6 flex items-end justify-between gap-3 h-40">
            {registrationTrend.map((r) => (
              <div key={r.week} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-t-lg bg-gradient-to-t from-accent-600 to-accent-400 transition-all duration-500" style={{ height: `${(r.count / maxReg) * 100}%` }} title={`${r.count} registrations`} />
                <span className="text-xs font-semibold text-slate-500">{r.week}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Events by category */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
        <h2 className="font-display text-lg font-bold text-navy-900">Events by Category</h2>
        <div className="mt-5 space-y-3">
          {categoryData.map((c) => (
            <div key={c.category} className="flex items-center gap-4">
              <span className="w-20 text-sm font-semibold text-navy-700">{c.category}</span>
              <div className="h-6 flex-1 overflow-hidden rounded-lg bg-slate-100">
                <div className={`h-full rounded-lg ${c.color} transition-all duration-500`} style={{ width: `${(c.count / maxCategory) * 100}%` }} />
              </div>
              <span className="w-8 text-right text-sm font-bold text-navy-900">{c.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent events + Issues */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent events */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-navy-900">Recent Events</h2>
            <Link to="/events" className="text-sm font-semibold text-electric-600 hover:text-electric-700">View all</Link>
          </div>
          <div className="mt-4 space-y-3">
            {recentEvents.map((event) => (
              <Link key={event.id} to={`/events/${event.id}`} className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-slate-50">
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-navy-100">
                  {event.banner && <img src={event.banner} alt="" className="h-full w-full object-cover" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-navy-900">{event.title}</p>
                  <p className="text-xs text-slate-500">{formatDate(event.startDate)} · {event.venue}</p>
                </div>
                <StatusBadge status={event.status} />
              </Link>
            ))}
          </div>
        </div>

        {/* Issues */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-navy-900">Recent Issues</h2>
            <Link to="/issues" className="text-sm font-semibold text-electric-600 hover:text-electric-700">View all</Link>
          </div>
          <div className="mt-4 space-y-3">
            {recentIssues.map((issue) => (
              <div key={issue.id} className="flex items-start gap-3 rounded-xl p-2">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  <AlertCircle className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-navy-900">{issue.title}</p>
                  <p className="text-xs text-slate-500">{issue.location} · {formatDate(issue.createdAt)}</p>
                </div>
                <Badge color={issue.status === 'RESOLVED' ? 'emerald' : issue.status === 'IN_REVIEW' ? 'amber' : 'slate'}>
                  {issue.status === 'IN_REVIEW' ? 'In Review' : issue.status.charAt(0) + issue.status.slice(1).toLowerCase()}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent announcements */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-navy-900">Recent Announcements</h2>
          <Link to="/announcements" className="inline-flex items-center gap-1 text-sm font-semibold text-electric-600 hover:text-electric-700">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {mockAnnouncements.slice(0, 4).map((a) => (
            <AnnouncementCard key={a.id} announcement={a} compact />
          ))}
        </div>
      </div>
    </div>
  );
}
