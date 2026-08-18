import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { type ReactNode } from 'react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { TargetCursor } from '@/components/effects/TargetCursor';
import { AppLayout, PublicLayout } from '@/components/layout/AppLayout';
import { LandingPage } from '@/pages/Landing';
import { LoginPage } from '@/pages/Login';
import { RegisterPage } from '@/pages/Register';
import { DashboardPage } from '@/pages/Dashboard';
import { EventsPage } from '@/pages/Events';
import { EventDetailsPage } from '@/pages/EventDetails';
import { ClubsPage } from '@/pages/Clubs';
import { ClubDetailsPage } from '@/pages/ClubDetails';
import { ClubAdminPage } from '@/pages/ClubAdmin';
import { AdminPage } from '@/pages/Admin';
import { AnnouncementsPage } from '@/pages/Announcements';
import { NotificationsPage } from '@/pages/Notifications';
import { IssuesPage } from '@/pages/Issues';
import { ProfilePage } from '@/pages/Profile';
import type { UserRole } from '@/types';

function ProtectedRoute({ children, roles }: { children: ReactNode; roles?: UserRole[] }) {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (roles && user && !roles.includes(user.role)) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout><LandingPage /></PublicLayout>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/events" element={<PublicLayout><EventsPage /></PublicLayout>} />
      <Route path="/events/:id" element={<PublicLayout><EventDetailsPage /></PublicLayout>} />
      <Route path="/clubs" element={<PublicLayout><ClubsPage /></PublicLayout>} />
      <Route path="/clubs/:id" element={<PublicLayout><ClubDetailsPage /></PublicLayout>} />
      <Route path="/announcements" element={<PublicLayout><AnnouncementsPage /></PublicLayout>} />

      <Route path="/dashboard" element={<ProtectedRoute><AppLayout><DashboardPage /></AppLayout></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><AppLayout><NotificationsPage /></AppLayout></ProtectedRoute>} />
      <Route path="/issues" element={<ProtectedRoute><AppLayout><IssuesPage /></AppLayout></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><AppLayout><ProfilePage /></AppLayout></ProtectedRoute>} />
      <Route path="/club-admin" element={<ProtectedRoute roles={['CLUB_ADMIN', 'CAMPUS_ADMIN']}><AppLayout><ClubAdminPage /></AppLayout></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute roles={['CAMPUS_ADMIN']}><AppLayout><AdminPage /></AppLayout></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <TargetCursor
          spinDuration={3}
          hideDefaultCursor={true}
          parallaxOn={true}
          cursorColor="#ffffff"
        />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
