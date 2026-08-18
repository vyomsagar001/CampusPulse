import type { AppNotification } from '@/types';

export const mockNotifications: AppNotification[] = [
  {
    id: 'n1',
    type: 'REGISTRATION_CONFIRMATION',
    title: 'Registration confirmed',
    message: "You're registered for AIrena 2026. See you on Sep 20!",
    timestamp: '2026-08-12T10:05:00Z',
    read: false,
    eventId: 'e1',
  },
  {
    id: 'n2',
    type: 'EVENT_REMINDER',
    title: 'Event reminder',
    message: "Tech Tuesday: Building with LLMs starts in 2 days. Don't forget your laptop.",
    timestamp: '2026-08-23T09:00:00Z',
    read: false,
    eventId: 'e2',
  },
  {
    id: 'n3',
    type: 'NEW_ANNOUNCEMENT',
    title: 'New announcement',
    message: 'Mid-semester examinations seating plan has been released.',
    timestamp: '2026-08-16T10:05:00Z',
    read: false,
  },
  {
    id: 'n4',
    type: 'REGISTRATION_CONFIRMATION',
    title: 'Registration confirmed',
    message: "You're registered for ML Madness: Vision Edition.",
    timestamp: '2026-08-11T10:05:00Z',
    read: true,
    eventId: 'e5',
  },
  {
    id: 'n5',
    type: 'EVENT_CANCELLATION',
    title: 'Event update',
    message: 'The Quantum Computing Seminar has concluded. Thanks for attending!',
    timestamp: '2026-08-18T17:30:00Z',
    read: true,
    eventId: 'e12',
  },
];
