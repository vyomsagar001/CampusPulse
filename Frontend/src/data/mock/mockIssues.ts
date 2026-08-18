import type { Issue } from '@/types';

export const mockIssues: Issue[] = [
  {
    id: 'i1',
    title: 'Broken projector in NLH 301',
    description: 'The projector in NLH 301, AB-3 is flickering and unusable during workshops. Needs replacement or repair.',
    category: 'INFRASTRUCTURE',
    location: 'NLH 301, AB-3',
    status: 'IN_REVIEW',
    createdAt: '2026-08-09T12:00:00Z',
    userId: 'u1',
  },
  {
    id: 'i2',
    title: 'Hostel Block C water cooler not working',
    description: 'The water cooler on the 2nd floor of Block C has been out of order for 3 days.',
    category: 'HOSTEL',
    location: 'Hostel Block C, 2nd Floor',
    status: 'RESOLVED',
    createdAt: '2026-08-01T09:00:00Z',
    userId: 'u1',
  },
  {
    id: 'i3',
    title: 'Campus shuttle late during evening slot',
    description: 'The 6 PM campus shuttle has been consistently 20-30 minutes late for the past week.',
    category: 'TRANSPORT',
    location: 'Main Gate',
    status: 'SUBMITTED',
    createdAt: '2026-08-14T18:30:00Z',
    userId: 'u1',
  },
];
