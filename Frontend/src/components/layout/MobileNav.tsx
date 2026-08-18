import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, Users, Bell, Menu } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const items = [
  { to: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { to: '/events', label: 'Events', icon: CalendarDays },
  { to: '/clubs', label: 'Clubs', icon: Users },
  { to: '/notifications', label: 'Alerts', icon: Bell },
];

export function MobileNav() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white/90 backdrop-blur-lg lg:hidden">
      <div className="flex items-center justify-around px-2 py-1.5">
        {items.map((item) => {
          const active = location.pathname === item.to || location.pathname.startsWith(item.to + '/');
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                active ? 'text-electric-700' : 'text-slate-400'
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
        <Link
          to="/profile"
          className={`flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
            location.pathname === '/profile' ? 'text-electric-700' : 'text-slate-400'
          }`}
        >
          <Menu className="h-5 w-5" />
          More
        </Link>
      </div>
    </nav>
  );
}
