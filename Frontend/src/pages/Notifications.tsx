import { useEffect, useState } from 'react';
import { Bell, CheckCheck } from 'lucide-react';
import { NotificationItem } from '@/components/NotificationItem';
import { Button } from '@/components/ui/Button';
import { LoadingState, EmptyState } from '@/components/ui/States';
import { useAuth } from '@/context/AuthContext';
import { mockNotifications } from '@/data/mockData';
import type { AppNotification } from '@/types';

export function NotificationsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifications([...mockNotifications]);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [user?.id]);

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  if (loading) return <LoadingState count={4} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy-900">Notifications</h1>
          <p className="mt-1 text-sm text-slate-500">
            {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}.` : 'All caught up! No unread notifications.'}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
            <CheckCheck className="h-4 w-4" /> Mark all as read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState title="No notifications" message="You'll see event reminders and campus updates here." icon={<Bell className="h-7 w-7" />} />
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <NotificationItem key={n.id} notification={n} onMarkAsRead={handleMarkAsRead} />
          ))}
        </div>
      )}
    </div>
  );
}
