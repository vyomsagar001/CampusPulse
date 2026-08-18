import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarDays,
  Ticket,
  Users,
  TrendingUp,
  Plus,
  Eye,
  Pencil,
  Trash2,
  Settings,
  ArrowRight,
} from 'lucide-react';
import { StatCard } from '@/components/ui/StatCard';
import { Button } from '@/components/ui/Button';
import { CategoryBadge, StatusBadge, Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { EmptyState, LoadingState } from '@/components/ui/States';
import { useAuth } from '@/context/AuthContext';
import { mockClubs, mockEvents, mockRegistrations } from '@/data/mockData';
import { formatDate, formatTime } from '@/utils/format';
import type { CampusEvent, Club, EventCategory, EventStatus } from '@/types';

const categoryOptions = [
  { value: 'TECHNICAL', label: 'Technical' },
  { value: 'CULTURAL', label: 'Cultural' },
  { value: 'SPORTS', label: 'Sports' },
  { value: 'ACADEMIC', label: 'Academic' },
  { value: 'WORKSHOP', label: 'Workshop' },
  { value: 'HACKATHON', label: 'Hackathon' },
  { value: 'OTHER', label: 'Other' },
];

const statusOptions = [
  { value: 'DRAFT', label: 'Draft' },
  { value: 'PUBLISHED', label: 'Published' },
  { value: 'ONGOING', label: 'Ongoing' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CANCELLED', label: 'Cancelled' },
];

export function ClubAdminPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [events, setEvents] = useState<CampusEvent[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<CampusEvent | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    club: '',
    category: '',
    venue: '',
    startDate: '',
    endDate: '',
    registrationDeadline: '',
    capacity: '',
    status: 'PUBLISHED',
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      const myClubs = user ? mockClubs.filter((c) => c.admins.includes(user.id)) : [];
      setClubs(myClubs);
      const clubIds = myClubs.map((c) => c.id);
      setEvents(mockEvents.filter((e) => clubIds.includes(e.club)));
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [user]);

  const upcomingEvents = events.filter((e) => new Date(e.startDate) >= new Date() && e.status !== 'COMPLETED' && e.status !== 'CANCELLED');
  const activeEvents = events.filter((e) => e.status === 'PUBLISHED' || e.status === 'ONGOING');
  const totalRegistrations = events.reduce((sum, e) => sum + (e.registeredCount ?? 0), 0);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent: CampusEvent = {
      id: `e${Date.now()}`,
      title: form.title,
      description: form.description,
      club: form.club,
      category: form.category as EventCategory,
      venue: form.venue,
      startDate: new Date(form.startDate).toISOString(),
      endDate: new Date(form.endDate).toISOString(),
      registrationDeadline: new Date(form.registrationDeadline).toISOString(),
      capacity: parseInt(form.capacity, 10) || 100,
      registeredCount: 0,
      banner: `https://api.dicebear.com/7.x/shapes/svg?seed=${form.title}&backgroundColor=1b2d56,389aff&backgroundType=gradientLinear&radius=8`,
      status: form.status as EventStatus,
      createdBy: user?.id ?? 'u2',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockEvents.unshift(newEvent);
    setEvents((prev) => [newEvent, ...prev]);
    setShowCreate(false);
    setForm({ title: '', description: '', club: '', category: '', venue: '', startDate: '', endDate: '', registrationDeadline: '', capacity: '', status: 'PUBLISHED' });
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    await new Promise((r) => setTimeout(r, 500));
    const idx = mockEvents.findIndex((e) => e.id === deleteTarget.id);
    if (idx >= 0) mockEvents.splice(idx, 1);
    setEvents((prev) => prev.filter((e) => e.id !== deleteTarget.id));
    setDeleting(false);
    setDeleteTarget(null);
  };

  if (loading) return <LoadingState count={3} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy-900">Club Admin Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">Manage your clubs and events.</p>
        </div>
        <Button onClick={() => setShowCreate(true)}>
          <Plus className="h-4 w-4" /> Create Event
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Events" value={events.length} icon={<CalendarDays className="h-5 w-5" />} color="navy" />
        <StatCard label="Upcoming Events" value={upcomingEvents.length} icon={<TrendingUp className="h-5 w-5" />} color="electric" trend={{ value: '+8%', positive: true }} />
        <StatCard label="Registrations" value={totalRegistrations} icon={<Ticket className="h-5 w-5" />} color="accent" />
        <StatCard label="Active Events" value={activeEvents.length} icon={<Users className="h-5 w-5" />} color="emerald" />
      </div>

      {/* My Clubs */}
      <section>
        <h2 className="font-display text-xl font-bold text-navy-900">My Clubs</h2>
        {clubs.length === 0 ? (
          <div className="mt-4">
            <EmptyState title="No clubs assigned" message="You haven't been assigned as an admin to any club yet." icon={<Users className="h-7 w-7" />} />
          </div>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {clubs.map((club) => (
              <div key={club.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition-all hover:shadow-card">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-navy-50">
                    {club.logo ? <img src={club.logo} alt={club.name} className="h-full w-full object-cover" /> : club.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold text-navy-900">{club.name}</p>
                    <Badge color="electric">{club.category}</Badge>
                  </div>
                </div>
                <Link to={`/clubs/${club.id}`} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-electric-600 hover:text-electric-700">
                  View club <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Event Management */}
      <section>
        <h2 className="font-display text-xl font-bold text-navy-900">Event Management</h2>
        {events.length === 0 ? (
          <div className="mt-4">
            <EmptyState title="No events yet" message="Create your first event to get started." icon={<CalendarDays className="h-7 w-7" />} action={<Button onClick={() => setShowCreate(true)}><Plus className="h-4 w-4" /> Create Event</Button>} />
          </div>
        ) : (
          <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
            {/* Desktop table */}
            <div className="hidden lg:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Event</th>
                    <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Date</th>
                    <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                    <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Registrations</th>
                    <th className="px-5 py-3 text-right text-xs font-bold uppercase tracking-wider text-slate-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {events.map((event) => (
                    <tr key={event.id} className="transition-colors hover:bg-slate-50/50">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-navy-100">
                            {event.banner && <img src={event.banner} alt="" className="h-full w-full object-cover" />}
                          </div>
                          <div>
                            <p className="font-semibold text-navy-900">{event.title}</p>
                            <CategoryBadge category={event.category} className="mt-0.5" />
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-slate-600">{formatDate(event.startDate)}</td>
                      <td className="px-5 py-3.5"><StatusBadge status={event.status} /></td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-navy-900">{event.registeredCount ?? 0} of {event.capacity}</span>
                          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100">
                            <div className="h-full rounded-full bg-electric-500" style={{ width: `${Math.min(100, ((event.registeredCount ?? 0) / event.capacity) * 100)}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end gap-1">
                          <Link to={`/events/${event.id}`} className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-electric-50 hover:text-electric-600" title="View"><Eye className="h-4 w-4" /></Link>
                          <button className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-amber-50 hover:text-amber-600" title="Edit"><Pencil className="h-4 w-4" /></button>
                          <button className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-navy-50 hover:text-navy-600" title="Manage"><Settings className="h-4 w-4" /></button>
                          <button onClick={() => setDeleteTarget(event)} className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500" title="Delete"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="divide-y divide-slate-100 lg:hidden">
              {events.map((event) => (
                <div key={event.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-navy-100">
                      {event.banner && <img src={event.banner} alt="" className="h-full w-full object-cover" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-navy-900">{event.title}</p>
                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        <CategoryBadge category={event.category} />
                        <StatusBadge status={event.status} />
                      </div>
                      <p className="mt-1 text-sm text-slate-500">{formatDate(event.startDate)} · {event.registeredCount ?? 0} of {event.capacity}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-1">
                    <Link to={`/events/${event.id}`} className="rounded-lg p-2 text-slate-400 hover:bg-electric-50 hover:text-electric-600"><Eye className="h-4 w-4" /></Link>
                    <button className="rounded-lg p-2 text-slate-400 hover:bg-amber-50 hover:text-amber-600"><Pencil className="h-4 w-4" /></button>
                    <button className="rounded-lg p-2 text-slate-400 hover:bg-navy-50 hover:text-navy-600"><Settings className="h-4 w-4" /></button>
                    <button onClick={() => setDeleteTarget(event)} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Create Event Modal */}
      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Create New Event" description="Fill in the event details below." size="lg">
        <form onSubmit={handleCreate} className="space-y-4">
          <Input label="Event Title" name="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. AIrena 2026" required />
          <Textarea label="Description" name="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe your event..." required />
          <div className="grid gap-4 sm:grid-cols-2">
            <Select label="Club" name="club" value={form.club} onChange={(e) => setForm({ ...form, club: e.target.value })} options={clubs.map((c) => ({ value: c.id, label: c.name }))} placeholder="Select club" required />
            <Select label="Category" name="category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} options={categoryOptions} placeholder="Select category" required />
          </div>
          <Input label="Venue" name="venue" value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} placeholder="e.g. MUJ Auditorium" required />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Start Date & Time" type="datetime-local" name="startDate" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} required />
            <Input label="End Date & Time" type="datetime-local" name="endDate" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} required />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Registration Deadline" type="datetime-local" name="registrationDeadline" value={form.registrationDeadline} onChange={(e) => setForm({ ...form, registrationDeadline: e.target.value })} required />
            <Input label="Capacity" type="number" name="capacity" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} placeholder="e.g. 100" required />
          </div>
          <Select label="Status" name="status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} options={statusOptions} />
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button type="submit">Create Event</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Event"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        loading={deleting}
        danger
      />
    </div>
  );
}
