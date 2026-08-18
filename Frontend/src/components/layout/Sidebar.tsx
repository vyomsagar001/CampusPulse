import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Megaphone,
  Bell,
  AlertCircle,
  User,
  Shield,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import type { UserRole } from '@/types';

interface NavItem {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['STUDENT', 'CLUB_ADMIN', 'CAMPUS_ADMIN'] },
  { to: '/events', label: 'Events', icon: CalendarDays, roles: ['STUDENT', 'CLUB_ADMIN', 'CAMPUS_ADMIN'] },
  { to: '/clubs', label: 'Clubs', icon: Users, roles: ['STUDENT', 'CLUB_ADMIN', 'CAMPUS_ADMIN'] },
  { to: '/announcements', label: 'Announcements', icon: Megaphone, roles: ['STUDENT', 'CLUB_ADMIN', 'CAMPUS_ADMIN'] },
  { to: '/notifications', label: 'Notifications', icon: Bell, roles: ['STUDENT', 'CLUB_ADMIN', 'CAMPUS_ADMIN'] },
  { to: '/issues', label: 'Issues & Feedback', icon: AlertCircle, roles: ['STUDENT', 'CLUB_ADMIN', 'CAMPUS_ADMIN'] },
  { to: '/profile', label: 'Profile', icon: User, roles: ['STUDENT', 'CLUB_ADMIN', 'CAMPUS_ADMIN'] },
  { to: '/club-admin', label: 'Club Admin', icon: Shield, roles: ['CLUB_ADMIN', 'CAMPUS_ADMIN'] },
  { to: '/admin', label: 'Campus Admin', icon: Shield, roles: ['CAMPUS_ADMIN'] },
];

export function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();

  const visibleItems = navItems.filter((item) => user && item.roles.includes(user.role));

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-60 shrink-0 border-r border-slate-200 bg-white px-3 py-6 lg:block">
      <nav className="space-y-1">
        <p className="px-3 pb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Menu</p>
        {visibleItems.map((item) => {
          const active = location.pathname === item.to;
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
                active
                  ? 'bg-navy-900 text-white shadow-soft'
                  : 'text-navy-700 hover:bg-slate-100'
              }`}
            >
              <Icon className={`h-4.5 w-4.5 ${active ? 'text-electric-300' : 'text-slate-400'}`} />
              <span className="flex-1">{item.label}</span>
              {active && <ChevronRight className="h-4 w-4 text-electric-300" />}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
