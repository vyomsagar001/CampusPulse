import { useEffect, useState } from 'react';
import { Megaphone } from 'lucide-react';
import { AnnouncementCard } from '@/components/AnnouncementCard';
import { LoadingState, EmptyState } from '@/components/ui/States';
import { mockAnnouncements } from '@/data/mockData';
import type { Announcement, AnnouncementCategory } from '@/types';

const categoryTabs: { value: AnnouncementCategory | 'ALL'; label: string }[] = [
  { value: 'ALL', label: 'All' },
  { value: 'IMPORTANT', label: 'Important' },
  { value: 'GENERAL', label: 'General' },
  { value: 'EVENT', label: 'Events' },
];

export function AnnouncementsPage() {
  const [loading, setLoading] = useState(true);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [activeTab, setActiveTab] = useState<AnnouncementCategory | 'ALL'>('ALL');

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnnouncements(mockAnnouncements);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const filtered = activeTab === 'ALL' ? announcements : announcements.filter((a) => a.category === activeTab);

  if (loading) return <LoadingState count={4} />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-navy-900">Campus Announcements</h1>
        <p className="mt-1 text-sm text-slate-500">Stay updated with the latest campus news and notices.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-thin">
        {categoryTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
              activeTab === tab.value
                ? 'bg-navy-900 text-white shadow-soft'
                : 'bg-white text-navy-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No announcements" message="There are no announcements in this category right now." icon={<Megaphone className="h-7 w-7" />} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((a) => (
            <AnnouncementCard key={a.id} announcement={a} />
          ))}
        </div>
      )}
    </div>
  );
}
