import { useEffect, useState, useMemo } from 'react';
import { SearchBar } from '@/components/ui/SearchBar';
import { FilterBar, type FilterOption } from '@/components/ui/FilterBar';
import { EventCard } from '@/components/EventCard';
import { EmptyState, LoadingState, ErrorState } from '@/components/ui/States';
import { mockEvents, mockClubs } from '@/data/mockData';
import type { CampusEvent, Club, EventCategory, EventStatus } from '@/types';

const categoryOptions: FilterOption[] = [
  { value: 'TECHNICAL', label: 'Technical' },
  { value: 'CULTURAL', label: 'Cultural' },
  { value: 'SPORTS', label: 'Sports' },
  { value: 'ACADEMIC', label: 'Academic' },
  { value: 'WORKSHOP', label: 'Workshop' },
  { value: 'HACKATHON', label: 'Hackathon' },
  { value: 'OTHER', label: 'Other' },
];

const statusOptions: FilterOption[] = [
  { value: 'PUBLISHED', label: 'Open' },
  { value: 'ONGOING', label: 'Ongoing' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CANCELLED', label: 'Cancelled' },
];

const dateOptions: FilterOption[] = [
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'past', label: 'Past' },
];

export function EventsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [events, setEvents] = useState<CampusEvent[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    date: '',
    venue: '',
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setEvents(mockEvents);
      setClubs(mockClubs);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const venueOptions = useMemo(
    () => Array.from(new Set(events.map((e) => e.venue))).map((v) => ({ value: v, label: v })),
    [events],
  );

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const club = clubs.find((c) => c.id === e.club);
      const searchLower = search.toLowerCase();
      const matchesSearch =
        !search ||
        e.title.toLowerCase().includes(searchLower) ||
        (club?.name.toLowerCase().includes(searchLower) ?? false) ||
        e.category.toLowerCase().includes(searchLower);

      const matchesCategory = !filters.category || e.category === filters.category;
      const matchesStatus = !filters.status || e.status === filters.status;
      const matchesVenue = !filters.venue || e.venue === filters.venue;
      const matchesDate =
        !filters.date ||
        (filters.date === 'upcoming' && new Date(e.startDate) >= new Date()) ||
        (filters.date === 'past' && new Date(e.startDate) < new Date());

      return matchesSearch && matchesCategory && matchesStatus && matchesVenue && matchesDate;
    });
  }, [events, clubs, search, filters]);

  const hasActiveFilters = Object.values(filters).some((v) => v !== '') || search !== '';
  const clearFilters = () => {
    setFilters({ category: '', status: '', date: '', venue: '' });
    setSearch('');
  };

  if (loading) return <LoadingState count={6} />;
  if (error) return <ErrorState onRetry={() => setError(false)} />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-navy-900">Campus Events</h1>
        <p className="mt-1 text-sm text-slate-500">Discover workshops, hackathons, cultural events, and more.</p>
      </div>

      <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by event name, club, or category..." />
        <FilterBar
          filters={[
            { key: 'category', label: 'Category', value: filters.category, options: categoryOptions },
            { key: 'status', label: 'Status', value: filters.status, options: statusOptions },
            { key: 'date', label: 'Date', value: filters.date, options: dateOptions },
            { key: 'venue', label: 'Venue', value: filters.venue, options: venueOptions },
          ]}
          onChange={(key, value) => setFilters((f) => ({ ...f, [key]: value }))}
          onClear={clearFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          <span className="font-semibold text-navy-800">{filtered.length}</span> events found
        </p>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No events match your filters"
          message="Try adjusting your search or clearing filters to see more events."
          action={
            <button onClick={clearFilters} className="rounded-xl bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-800">
              Clear all filters
            </button>
          }
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} club={clubs.find((c) => c.id === event.club)} />
          ))}
        </div>
      )}
    </div>
  );
}
