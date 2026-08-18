import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowLeft,
  Share2,
  Ticket,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CategoryBadge, StatusBadge } from '@/components/ui/Badge';
import { LoadingState, ErrorState, EmptyState } from '@/components/ui/States';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { useAuth } from '@/context/AuthContext';
import { mockEvents, mockClubs, mockRegistrations } from '@/data/mockData';
import { formatDate, formatTime, isRegistrationOpen } from '@/utils/format';
import type { CampusEvent, Club, Registration } from '@/types';

export function EventDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [event, setEvent] = useState<CampusEvent | null>(null);
  const [club, setClub] = useState<Club | null>(null);
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showCancel, setShowCancel] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const e = mockEvents.find((x) => x.id === id) ?? null;
      setEvent(e);
      setClub(e ? mockClubs.find((c) => c.id === e.club) ?? null : null);
      setRegistration(
        user ? mockRegistrations.find((r) => r.eventId === id && r.userId === user.id) ?? null : null,
      );
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [id, user]);

  if (loading) return <LoadingState count={1} />;
  if (!event) {
    return (
      <EmptyState
        title="Event not found"
        message="This event may have been removed or the link is incorrect."
        action={
          <Link to="/events">
            <span className="inline-flex items-center gap-1 rounded-xl bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-800">
              <ArrowLeft className="h-4 w-4" /> Back to events
            </span>
          </Link>
        }
      />
    );
  }

  const regOpen = isRegistrationOpen(event.registrationDeadline, event.status);
  const isFull = (event.registeredCount ?? 0) >= event.capacity;
  const capacityPct = Math.min(100, Math.round(((event.registeredCount ?? 0) / event.capacity) * 100));

  const handleRegister = async () => {
    setRegistering(true);
    await new Promise((r) => setTimeout(r, 600));
    if (user) {
      const newReg: Registration = {
        id: `r${Date.now()}`,
        eventId: event.id,
        userId: user.id,
        status: 'CONFIRMED',
        registeredAt: new Date().toISOString(),
      };
      mockRegistrations.push(newReg);
      setRegistration(newReg);
      event.registeredCount = (event.registeredCount ?? 0) + 1;
    }
    setRegistering(false);
    setShowConfirm(false);
  };

  const handleCancel = async () => {
    if (registration) {
      registration.status = 'CANCELLED';
      event.registeredCount = Math.max(0, (event.registeredCount ?? 0) - 1);
      setRegistration({ ...registration, status: 'CANCELLED' });
    }
    setShowCancel(false);
  };

  const isCancelled = event.status === 'CANCELLED';

  return (
    <div className="space-y-6">
      <Link to="/events" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition-colors hover:text-navy-700">
        <ArrowLeft className="h-4 w-4" /> Back to events
      </Link>

      {/* Hero banner */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="h-56 w-full sm:h-72 lg:h-80">
          {event.banner ? (
            <img src={event.banner} alt={event.title} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-navy-800 to-electric-600" />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <CategoryBadge category={event.category} className="bg-white/90 backdrop-blur-sm" />
            <StatusBadge status={event.status} className="bg-white/90 backdrop-blur-sm" />
          </div>
          <h1 className="mt-3 font-display text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">
            {event.title}
          </h1>
          {club && (
            <Link to={`/clubs/${club.id}`} className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white">
              <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-lg bg-white/20">
                {club.logo ? <img src={club.logo} alt="" className="h-full w-full" /> : club.name.charAt(0)}
              </div>
              {club.name}
            </Link>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Event info */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
            <h2 className="font-display text-lg font-bold text-navy-900">Event Details</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{event.description}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3.5">
                <Calendar className="h-5 w-5 text-electric-600" />
                <div>
                  <p className="text-xs font-semibold text-slate-400">Date</p>
                  <p className="text-sm font-semibold text-navy-900">{formatDate(event.startDate)}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3.5">
                <Clock className="h-5 w-5 text-electric-600" />
                <div>
                  <p className="text-xs font-semibold text-slate-400">Time</p>
                  <p className="text-sm font-semibold text-navy-900">
                    {formatTime(event.startDate)} – {formatTime(event.endDate)}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3.5">
                <MapPin className="h-5 w-5 text-electric-600" />
                <div>
                  <p className="text-xs font-semibold text-slate-400">Venue</p>
                  <p className="text-sm font-semibold text-navy-900">{event.venue}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3.5">
                <Users className="h-5 w-5 text-electric-600" />
                <div>
                  <p className="text-xs font-semibold text-slate-400">Capacity</p>
                  <p className="text-sm font-semibold text-navy-900">
                    {event.registeredCount ?? 0} of {event.capacity} seats
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-navy-50 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-navy-700">Registration Deadline</span>
                <span className="font-bold text-navy-900">{formatDate(event.registrationDeadline)}</span>
              </div>
            </div>
          </div>

          {/* Club info */}
          {club && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
              <h2 className="font-display text-lg font-bold text-navy-900">Organizing Club</h2>
              <Link to={`/clubs/${club.id}`} className="mt-3 flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-slate-50">
                <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-navy-50">
                  {club.logo ? <img src={club.logo} alt={club.name} className="h-full w-full object-cover" /> : club.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-navy-900">{club.name}</p>
                  <p className="line-clamp-1 text-sm text-slate-500">{club.description}</p>
                </div>
                <span className="text-sm font-semibold text-electric-600">View →</span>
              </Link>
            </div>
          )}
        </div>

        {/* Registration sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
            <h2 className="font-display text-lg font-bold text-navy-900">Registration</h2>

            {/* Capacity bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">{event.registeredCount ?? 0} of {event.capacity} seats</span>
                <span className={`font-semibold ${isFull ? 'text-red-500' : 'text-navy-700'}`}>
                  {event.capacity - (event.registeredCount ?? 0)} spots left
                </span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isFull ? 'bg-red-500' : capacityPct > 80 ? 'bg-amber-500' : 'bg-electric-500'
                  }`}
                  style={{ width: `${capacityPct}%` }}
                />
              </div>
            </div>

            {/* Registration state */}
            <div className="mt-6">
              {isCancelled ? (
                <div className="flex flex-col items-center rounded-xl bg-red-50 p-5 text-center">
                  <XCircle className="h-8 w-8 text-red-500" />
                  <p className="mt-2 font-bold text-red-700">Event Cancelled</p>
                  <p className="mt-1 text-sm text-red-600">This event has been cancelled by the organizer.</p>
                </div>
              ) : registration?.status === 'CONFIRMED' ? (
                <div className="space-y-4">
                  <div className="flex flex-col items-center rounded-xl bg-emerald-50 p-5 text-center">
                    <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                    <p className="mt-2 font-bold text-emerald-700">You're Registered</p>
                    <p className="mt-1 text-sm text-emerald-600">We'll send you a reminder before the event.</p>
                  </div>
                  <Button variant="outline" fullWidth onClick={() => setShowCancel(true)}>
                    Cancel registration
                  </Button>
                </div>
              ) : registration?.status === 'WAITLISTED' ? (
                <div className="flex flex-col items-center rounded-xl bg-amber-50 p-5 text-center">
                  <AlertCircle className="h-8 w-8 text-amber-600" />
                  <p className="mt-2 font-bold text-amber-700">On Waitlist</p>
                  <p className="mt-1 text-sm text-amber-600">You'll be notified if a spot opens up.</p>
                </div>
              ) : !regOpen ? (
                <div className="flex flex-col items-center rounded-xl bg-slate-100 p-5 text-center">
                  <XCircle className="h-8 w-8 text-slate-400" />
                  <p className="mt-2 font-bold text-slate-600">Registration Closed</p>
                  <p className="mt-1 text-sm text-slate-500">The registration deadline has passed.</p>
                </div>
              ) : isFull ? (
                <div className="flex flex-col items-center rounded-xl bg-amber-50 p-5 text-center">
                  <Users className="h-8 w-8 text-amber-600" />
                  <p className="mt-2 font-bold text-amber-700">Event Full</p>
                  <p className="mt-1 text-sm text-amber-600">All spots have been taken.</p>
                </div>
              ) : !isAuthenticated ? (
                <div className="space-y-3">
                  <p className="text-sm text-slate-500">Sign in to register for this event.</p>
                  <Link to="/login">
                    <Button fullWidth>Sign in to register</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  <Button fullWidth size="lg" loading={registering} onClick={() => setShowConfirm(true)}>
                    <Ticket className="h-4 w-4" /> Register for Event
                  </Button>
                  <p className="text-center text-xs text-slate-400">
                    You'll receive a confirmation notification after registering.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 border-t border-slate-100 pt-4">
              <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-navy-700 transition-colors hover:bg-slate-50">
                <Share2 className="h-4 w-4" /> Share event
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleRegister}
        title="Confirm Registration"
        message={`Register for ${event.title}? You'll receive a confirmation notification.`}
        confirmLabel="Yes, register"
        loading={registering}
      />
      <ConfirmDialog
        open={showCancel}
        onClose={() => setShowCancel(false)}
        onConfirm={handleCancel}
        title="Cancel Registration"
        message="Are you sure you want to cancel your registration for this event?"
        confirmLabel="Yes, cancel"
        danger
      />
    </div>
  );
}
