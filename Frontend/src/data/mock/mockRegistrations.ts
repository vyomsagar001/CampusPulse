import type { Registration } from '@/types';

export const mockRegistrations: Registration[] = [
  { id: 'r1', eventId: 'e1', userId: 'u1', status: 'CONFIRMED', registeredAt: '2026-08-12T10:00:00Z' },
  { id: 'r2', eventId: 'e2', userId: 'u1', status: 'CONFIRMED', registeredAt: '2026-08-10T10:00:00Z' },
  { id: 'r3', eventId: 'e5', userId: 'u1', status: 'CONFIRMED', registeredAt: '2026-08-11T10:00:00Z' },
  { id: 'r4', eventId: 'e12', userId: 'u1', status: 'CONFIRMED', registeredAt: '2026-08-14T10:00:00Z' },
  { id: 'r5', eventId: 'e3', userId: 'u1', status: 'WAITLISTED', registeredAt: '2026-08-09T10:00:00Z' },
];
