import { type ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';

interface AppLayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

export function AppLayout({ children, showSidebar = true }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="container-app flex gap-8">
        {showSidebar && <Sidebar />}
        <main className="min-w-0 flex-1 py-6 lg:py-8 pb-24 lg:pb-8">
          {children}
        </main>
      </div>
      <MobileNav />
    </div>
  );
}

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
