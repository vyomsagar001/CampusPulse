import type { CampusEvent } from '@/types';
import { mockEvents } from '@/data/mock/mockEvents';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const eventsApi = {
  async getAll(): Promise<CampusEvent[]> {
    await delay(400);
    return mockEvents;
  },

  async getById(id: string): Promise<CampusEvent | null> {
    await delay(300);
    return mockEvents.find((e) => e.id === id) ?? null;
  },

  async getByClubId(clubId: string): Promise<CampusEvent[]> {
    await delay(300);
    return mockEvents.filter((e) => e.club === clubId);
  },

  async create(data: Partial<CampusEvent>): Promise<CampusEvent> {
    await delay(500);
    const event: CampusEvent = {
      id: `e${Date.now()}`,
      title: data.title ?? 'Untitled Event',
      description: data.description ?? '',
      club: data.club ?? '',
      category: data.category ?? 'OTHER',
      venue: data.venue ?? '',
      startDate: data.startDate ?? new Date().toISOString(),
      endDate: data.endDate ?? new Date().toISOString(),
      registrationDeadline: data.registrationDeadline ?? new Date().toISOString(),
      capacity: data.capacity ?? 100,
      registeredCount: 0,
      banner: data.banner,
      status: data.status ?? 'DRAFT',
      createdBy: data.createdBy ?? 'u2',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockEvents.unshift(event);
    return event;
  },

  async delete(id: string): Promise<void> {
    await delay(300);
    const idx = mockEvents.findIndex((e) => e.id === id);
    if (idx >= 0) mockEvents.splice(idx, 1);
  },
};
