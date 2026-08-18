import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Bell, LogOut, ChevronDown, LayoutDashboard, Shield, Users } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import type { UserRole } from '@/types';

const publicLinks = [
  { to: '/events', label: 'Events' },
  { to: '/clubs', label: 'Clubs' },
  { to: '/announcements', label: 'Announcements' },
];

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const roleLabels: Record<UserRole, string> = {
    STUDENT: 'Student',
    CLUB_ADMIN: 'Club Admin',
    CAMPUS_ADMIN: 'Campus Admin',
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-lg">
      <div className="container-app flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden md:flex items-center gap-1">
            {publicLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
                  location.pathname.startsWith(l.to)
                    ? 'text-electric-700 bg-electric-50'
                    : 'text-navy-700 hover:bg-slate-100'
                }`}
              >
                {l.label}
              </Link>
            ))}
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
                  location.pathname === '/dashboard'
                    ? 'text-electric-700 bg-electric-50'
                    : 'text-navy-700 hover:bg-slate-100'
                }`}
              >
                Dashboard
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Link
                to="/notifications"
                className="relative hidden sm:flex h-10 w-10 items-center justify-center rounded-xl text-navy-700 transition-colors hover:bg-slate-100"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
              </Link>

              <div className="relative hidden sm:block">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 transition-colors hover:bg-slate-50"
                >
                  <img
                    src={user?.profile?.profilePicture ?? `https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`}
                    alt={user?.name}
                    className="h-7 w-7 rounded-lg object-cover"
                  />
                  <span className="text-sm font-semibold text-navy-800">{user?.name?.split(' ')[0]}</span>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </button>
                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 top-full z-20 mt-2 w-56 animate-fade-in rounded-xl border border-slate-200 bg-white p-1.5 shadow-lift">
                      <div className="border-b border-slate-100 px-3 py-2.5">
                        <p className="text-sm font-bold text-navy-900">{user?.name}</p>
                        <p className="text-xs text-slate-500">{user?.email}</p>
                        <span className="mt-1.5 inline-block rounded-full bg-electric-50 px-2 py-0.5 text-xs font-semibold text-electric-700">
                          {user ? roleLabels[user.role] : ''}
                        </span>
                      </div>
                      <Link to="/dashboard" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-navy-700 hover:bg-slate-100">
                        <LayoutDashboard className="h-4 w-4 text-slate-400" /> Dashboard
                      </Link>
                      <Link to="/profile" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-navy-700 hover:bg-slate-100">
                        <Users className="h-4 w-4 text-slate-400" /> Profile
                      </Link>
                      {user?.role === 'CLUB_ADMIN' && (
                        <Link to="/club-admin" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-navy-700 hover:bg-slate-100">
                          <Shield className="h-4 w-4 text-slate-400" /> Club Admin
                        </Link>
                      )}
                      {user?.role === 'CAMPUS_ADMIN' && (
                        <Link to="/admin" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-navy-700 hover:bg-slate-100">
                          <Shield className="h-4 w-4 text-slate-400" /> Campus Admin
                        </Link>
                      )}
                      <button onClick={handleLogout} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50">
                        <LogOut className="h-4 w-4" /> Sign out
                      </button>
                    </div>
                  </>
                )}
              </div>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl text-navy-700 hover:bg-slate-100"
                aria-label="Menu"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hidden sm:block">
                <Button variant="ghost" size="sm">Log in</Button>
              </Link>
              <Link to="/register" className="hidden sm:block">
                <Button size="sm">Get started</Button>
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl text-navy-700 hover:bg-slate-100"
                aria-label="Menu"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </>
          )}
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white animate-fade-in">
          <div className="container-app py-4 space-y-1">
            {publicLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-navy-700 hover:bg-slate-100"
              >
                {l.label}
              </Link>
            ))}
            {isAuthenticated && (
              <>
                <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-navy-700 hover:bg-slate-100">Dashboard</Link>
                <Link to="/notifications" onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-navy-700 hover:bg-slate-100">Notifications</Link>
                <Link to="/profile" onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-navy-700 hover:bg-slate-100">Profile</Link>
                {user?.role === 'CLUB_ADMIN' && (
                  <Link to="/club-admin" onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-navy-700 hover:bg-slate-100">Club Admin</Link>
                )}
                {user?.role === 'CAMPUS_ADMIN' && (
                  <Link to="/admin" onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-navy-700 hover:bg-slate-100">Campus Admin</Link>
                )}
                <button onClick={handleLogout} className="block w-full rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-red-600 hover:bg-red-50">Sign out</button>
              </>
            )}
            {!isAuthenticated && (
              <div className="flex gap-2 pt-2">
                <Link to="/login" onClick={() => setMobileOpen(false)} className="flex-1">
                  <Button variant="outline" fullWidth size="sm">Log in</Button>
                </Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="flex-1">
                  <Button fullWidth size="sm">Get started</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
