import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Calendar,
  Users,
  Sparkles,
  Bell,
  MapPin,
  Compass,
  Heart,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { EventCard } from '@/components/EventCard';
import { ClubCard } from '@/components/ClubCard';
import { CategoryBadge } from '@/components/ui/Badge';
import { BlurText } from '@/components/effects/BlurText';
import { Aurora } from '@/components/effects/Aurora';
import { SpotlightCard } from '@/components/effects/SpotlightCard';
import { CardSwap, Card } from '@/components/effects/CardSwap';
import { mockEvents, mockClubs, mockAnnouncements } from '@/data/mockData';
import { formatDate } from '@/utils/format';
import type { CampusEvent } from '@/types';

const features = [
  {
    icon: Compass,
    title: 'Discover',
    description: 'Find everything happening across campus — events, workshops, hackathons, and more.',
    color: 'bg-electric-50 text-electric-600',
  },
  {
    icon: Users,
    title: 'Connect',
    description: 'Discover student communities and clubs that match your interests.',
    color: 'bg-accent-50 text-accent-600',
  },
  {
    icon: Zap,
    title: 'Participate',
    description: 'Register for events with a single click and track your participation.',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: Bell,
    title: 'Stay Updated',
    description: 'Get important campus announcements and event notifications.',
    color: 'bg-navy-50 text-navy-600',
  },
];

function FeaturedEventSwapCard({ event, clubName }: { event: CampusEvent; clubName: string }) {
  const capacityPct = Math.min(100, Math.round(((event.registeredCount ?? 0) / event.capacity) * 100));
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl bg-white">
      <div className="relative h-40 overflow-hidden bg-navy-100">
        {event.banner ? (
          <img src={event.banner} alt={event.title} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-navy-800 to-electric-600" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
        <div className="absolute left-3 top-3">
          <CategoryBadge category={event.category} className="bg-white/90 backdrop-blur-sm" />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold text-navy-900">{event.title}</h3>
        <p className="mt-1 text-sm font-medium text-slate-500">{clubName}</p>
        <div className="mt-4 space-y-2 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-slate-400" />
            <span>{formatDate(event.startDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-slate-400" />
            <span className="truncate">{event.venue}</span>
          </div>
        </div>
        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 font-medium text-slate-500">
              <Users className="h-3.5 w-3.5" />
              {event.registeredCount ?? 0} of {event.capacity} seats
            </span>
            <span className="font-semibold text-electric-600">{capacityPct}% filled</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-electric-500"
              style={{ width: `${capacityPct}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function LandingPage() {
  const featuredEvents = mockEvents.filter((e) => e.status === 'PUBLISHED').slice(0, 4);
  const swapEvents = mockEvents.filter((e) => e.status === 'PUBLISHED').slice(0, 5);
  const featuredClubs = mockClubs.filter((c) => c.status === 'ACTIVE').slice(0, 5);
  const upcomingEvents = mockEvents
    .filter((e) => e.status === 'PUBLISHED')
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 5);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-electric-100/40 blur-3xl" />
          <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-accent-100/30 blur-3xl" />
        </div>
        <div className="absolute inset-0 opacity-[0.15] pointer-events-none">
          <Aurora
            colorStops={['#389aff', '#8b5cf6', '#1d79f5']}
            speed={0.5}
            amplitude={0.8}
            blend={0.6}
          />
        </div>
        <div className="container-app relative py-16 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 rounded-full border border-electric-200 bg-electric-50 px-3.5 py-1.5 text-sm font-semibold text-electric-700">
                <Sparkles className="h-4 w-4" />
                Campus life, simplified
              </div>
              <div className="mt-6 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-navy-900 sm:text-5xl lg:text-6xl text-balance">
                <BlurText
                  text="Everything happening on campus, in one pulse."
                  delay={120}
                  animateBy="words"
                  direction="top"
                  className="!text-navy-900"
                />
              </div>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-600">
                Discover events, connect with student communities, and never miss what's happening around campus.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/events" className="cursor-target">
                  <Button size="lg" className="group">
                    Explore Events
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/clubs" className="cursor-target">
                  <Button variant="outline" size="lg">
                    Explore Clubs
                  </Button>
                </Link>
              </div>
              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-electric-50 text-electric-600">
                    <Compass className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-display text-sm font-bold text-navy-900">Discover</p>
                    <p className="text-sm text-slate-500">Find events and activities happening around campus.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-display text-sm font-bold text-navy-900">Connect</p>
                    <p className="text-sm text-slate-500">Explore student clubs and communities.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-display text-sm font-bold text-navy-900">Participate</p>
                    <p className="text-sm text-slate-500">Register for events and stay involved.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative hidden lg:block">
              <div className="relative">
                {/* Main card */}
                <div className="relative z-20 rounded-3xl border border-slate-200 bg-white p-5 shadow-lift animate-fade-in-scale">
                  <div className="flex items-center justify-between">
                    <CategoryBadge category="HACKATHON" />
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Open
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-bold text-navy-900">AIrena 2026</h3>
                  <p className="text-sm text-slate-500">AIML Community</p>
                  <div className="mt-4 space-y-2 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-400" /> Sep 20, 2026
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-slate-400" /> MUJ Auditorium
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">187 of 240 seats</span>
                      <span className="font-semibold text-electric-600">78%</span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full w-[78%] rounded-full bg-electric-500" />
                    </div>
                  </div>
                </div>

                {/* Floating mini card */}
                <div className="absolute -bottom-6 -left-8 z-30 w-52 rounded-2xl border border-slate-200 bg-white p-4 shadow-lift animate-fade-in" style={{ animationDelay: '0.15s' }}>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                      <Heart className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-navy-900">Campus Carnival</p>
                      <p className="text-xs text-slate-500">Oct 5 · Student Plaza</p>
                    </div>
                  </div>
                </div>

                {/* Floating stat */}
                <div className="absolute -top-6 -right-4 z-30 rounded-2xl border border-slate-200 bg-navy-900 px-4 py-3 text-white shadow-lift animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-electric-300" />
                    <span className="text-xs font-semibold text-electric-300">Popular event</span>
                  </div>
                  <p className="mt-1 font-display text-lg font-bold">412 of 1000 seats</p>
                </div>

                {/* Background blob */}
                <div className="absolute -right-12 -top-12 h-72 w-72 rounded-3xl bg-gradient-to-br from-electric-100 to-accent-100 opacity-60" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="border-t border-slate-100 bg-slate-50/50 py-16 lg:py-20">
        <div className="container-app">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-electric-600">Featured</p>
              <h2 className="mt-2 font-display text-3xl font-bold text-navy-900">Upcoming Events</h2>
            </div>
            <Link to="/events" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-electric-600 hover:text-electric-700 cursor-target">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-8 lg:grid-cols-2 items-center">
            <div className="grid gap-5 sm:grid-cols-2">
              {featuredEvents.slice(0, 2).map((event) => (
                <EventCard key={event.id} event={event} club={mockClubs.find((c) => c.id === event.club)} />
              ))}
            </div>
            <div className="relative h-[520px] hidden lg:block">
              <CardSwap
                width={380}
                height={460}
                cardDistance={50}
                verticalDistance={60}
                delay={4500}
                pauseOnHover={true}
                skewAmount={4}
                onCardClick={(idx) => {
                  const event = swapEvents[idx];
                  if (event) window.location.href = `/events/${event.id}`;
                }}
              >
                {swapEvents.map((event) => (
                  <Card key={event.id} className="cursor-target">
                    <FeaturedEventSwapCard event={event} clubName={mockClubs.find((c) => c.id === event.club)?.name ?? ''} />
                  </Card>
                ))}
              </CardSwap>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Clubs */}
      <section className="py-16 lg:py-20">
        <div className="container-app">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-accent-600">Communities</p>
              <h2 className="mt-2 font-display text-3xl font-bold text-navy-900">Featured Clubs</h2>
            </div>
            <Link to="/clubs" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-electric-600 hover:text-electric-700">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredClubs.map((club) => (
              <ClubCard
                key={club.id}
                club={club}
                eventCount={mockEvents.filter((e) => e.club === club.id).length}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why CampusPulse */}
      <section className="border-t border-slate-100 bg-navy-950 py-16 lg:py-20">
        <div className="container-app">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-white">Why CampusPulse?</h2>
            <p className="mt-3 text-lg text-navy-200">
              One platform for everything that happens on campus.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <SpotlightCard
                  key={f.title}
                  className="group rounded-2xl border border-navy-800 bg-navy-900/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-electric-700 hover:bg-navy-900"
                  spotlightColor="rgba(56, 154, 255, 0.15)"
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${f.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-white">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-200">{f.description}</p>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Upcoming Events Timeline */}
      <section className="py-16 lg:py-20">
        <div className="container-app">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-electric-600">Timeline</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-navy-900">Upcoming Events</h2>
            <p className="mt-3 text-slate-500">A quick look at what's coming up on campus.</p>
          </div>
          <div className="mx-auto mt-12 max-w-3xl">
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-200 sm:left-1/2" />
              <div className="space-y-8">
                {upcomingEvents.map((event, i) => (
                  <div
                    key={event.id}
                    className={`relative flex gap-6 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                  >
                    <div className="absolute left-4 top-5 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-white bg-electric-500 shadow-sm sm:left-1/2" />
                    <div className="ml-10 flex-1 sm:ml-0 sm:w-1/2 sm:px-6">
                      <Link
                        to={`/events/${event.id}`}
                        className="block rounded-2xl border border-slate-200 bg-white p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card"
                      >
                        <div className="flex items-center gap-2">
                          <CategoryBadge category={event.category} />
                          <span className="text-xs font-semibold text-slate-400">
                            {formatDate(event.startDate)}
                          </span>
                        </div>
                        <h3 className="mt-2 font-display text-base font-bold text-navy-900">{event.title}</h3>
                        <p className="mt-1 text-sm text-slate-500">
                          {mockClubs.find((c) => c.id === event.club)?.name} · {event.venue}
                        </p>
                      </Link>
                    </div>
                    <div className="hidden sm:block sm:w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16 lg:pb-24">
        <div className="container-app">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 to-navy-800 px-8 py-14 lg:px-16 lg:py-20">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-electric-600/20 blur-3xl" />
            <div className="absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-accent-600/20 blur-3xl" />
            <div className="relative text-center">
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl text-balance">
                Your campus is always moving. Stay in the loop.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-navy-200">
                Join CampusPulse and never miss an event, workshop, or campus announcement again.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link to="/register">
                  <Button size="lg" className="group">
                    Explore CampusPulse
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/events">
                  <Button variant="outline" size="lg" className="border-navy-600 bg-transparent text-white hover:bg-navy-700 hover:border-navy-500">
                    Browse Events
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="container-app py-10">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-navy-800 to-electric-600">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12h3l2-7 4 14 2-7h7" />
                </svg>
              </div>
              <span className="font-display text-base font-extrabold text-navy-900">
                Campus<span className="text-electric-500">Pulse</span>
              </span>
            </div>
            <p className="text-sm text-slate-500">
              Everything happening on campus, in one pulse.
            </p>
            <p className="text-sm text-slate-400">© 2026 CampusPulse · MUJ</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
