import type { Announcement } from '@/types';

export const mockAnnouncements: Announcement[] = [
  {
    id: 'a1',
    title: 'AIrena 2026 registrations are now open',
    description:
      'The flagship AI hackathon returns this September. 36 hours, ₹2L prize pool, and mentors from Google DeepMind and Microsoft Research. Register before Sep 18.',
    author: 'AIML Community',
    date: '2026-08-10T09:00:00Z',
    priority: 'HIGH',
    category: 'EVENT',
  },
  {
    id: 'a2',
    title: 'Library extended hours during mid-sem week',
    description:
      'The central library will remain open until 2 AM from Sep 23 to Sep 30 to support mid-semester exam preparation.',
    author: 'Campus Administration',
    date: '2026-08-14T11:00:00Z',
    priority: 'MEDIUM',
    category: 'GENERAL',
  },
  {
    id: 'a3',
    title: 'Campus Carnival — performer registrations closing soon',
    description:
      'Last chance to sign up as a performer for Campus Carnival. Solo and group acts welcome. Registrations close Oct 3.',
    author: 'Cultural Committee',
    date: '2026-08-13T15:00:00Z',
    priority: 'MEDIUM',
    category: 'EVENT',
  },
  {
    id: 'a4',
    title: 'Scheduled maintenance on campus Wi-Fi',
    description:
      'Campus Wi-Fi will be unavailable on Aug 24 from 1 AM to 5 AM for infrastructure upgrades. Wired connections in labs will remain active.',
    author: 'IT Services',
    date: '2026-08-15T08:00:00Z',
    priority: 'LOW',
    category: 'IMPORTANT',
  },
  {
    id: 'a5',
    title: 'Mid-semester examinations — seating plan released',
    description:
      'The seating plan for mid-semester examinations is now available on the student portal. Please verify your room and seat number before the exam date.',
    author: 'Examination Cell',
    date: '2026-08-16T10:00:00Z',
    priority: 'HIGH',
    category: 'IMPORTANT',
  },
];
