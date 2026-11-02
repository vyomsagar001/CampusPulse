
import { useEffect, useState, useMemo } from 'react';
import { SearchBar } from '@/components/ui/SearchBar';
import { FilterBar, type FilterOption } from '@/components/ui/FilterBar';
import { ClubCard } from '@/components/ClubCard';
import { EmptyState, LoadingState } from '@/components/ui/States';
import { clubsApi } from '@/api/clubs';
import { eventsApi } from '@/api/events';
import type { Club, CampusEvent } from '@/types';

export function ClubsPage() {
  const [loading, setLoading] = useState(true);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [events, setEvents] = useState<CampusEvent[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [clubsData, eventsData] = await Promise.all([
          clubsApi.getAll(),
          eventsApi.getAll(),
        ]);

        setClubs(clubsData);
        setEvents(eventsData);
      } catch (error) {
        console.error('Failed to load clubs and events:', error);
      } finally {
        setLoading(false);
      }
    };

    void loadData();
  }, []);

  const getEventCount = (clubId: string) =>
    events.filter((event) => event.club === clubId).length;

  const categoryOptions: FilterOption[] = useMemo(
    () =>
      Array.from(new Set(clubs.map((c) => c.category))).map((c) => ({
        value: c,
        label: c,
      })),
    [clubs],
  );

  const filtered = useMemo(() => {
    return clubs.filter((c) => {
      const s = search.toLowerCase();

      const matchesSearch =
        !search ||
        c.name.toLowerCase().includes(s) ||
        c.description.toLowerCase().includes(s) ||
        c.category.toLowerCase().includes(s);

      const matchesCategory = !category || c.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [clubs, search, category]);

  const featuredClubs = clubs.slice(0, 3);

  if (loading) return <LoadingState count={6} />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-navy-900">
          Campus Clubs
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Discover student communities and clubs at MUJ.
        </p>
      </div>

      {/* Featured Clubs */}
      {featuredClubs.length > 0 && !search && !category && (
        <section>
          <h2 className="font-display text-lg font-bold text-navy-900">
            Featured Clubs
          </h2>

          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredClubs.map((club) => (
              <ClubCard
                key={club.id}
                club={club}
                eventCount={getEventCount(club.id)}
              />
            ))}
          </div>
        </section>
      )}

      <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search clubs by name, description, or category..."
        />

        <FilterBar
          filters={[
            {
              key: 'category',
              label: 'Category',
              value: category,
              options: categoryOptions,
            },
          ]}
          onChange={(_, value) => setCategory(value)}
          onClear={() => {
            setCategory('');
            setSearch('');
          }}
          hasActiveFilters={!!category || !!search}
        />
      </div>

      <p className="text-sm text-slate-500">
        <span className="font-semibold text-navy-800">
          {filtered.length}
        </span>{' '}
        clubs found
      </p>

      {filtered.length === 0 ? (
        <EmptyState
          title="No clubs found"
          message="Try adjusting your search or filters."
          action={
            <button
              onClick={() => {
                setSearch('');
                setCategory('');
              }}
              className="rounded-xl bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-800"
            >
              Clear filters
            </button>
          }
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((club) => (
            <ClubCard
              key={club.id}
              club={club}
              eventCount={getEventCount(club.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
