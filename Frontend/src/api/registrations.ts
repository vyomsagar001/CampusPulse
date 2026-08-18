import type { Registration } from '@/types';
import { mockRegistrations } from '@/data/mock/mockRegistrations';
import { mockEvents } from '@/data/mock/mockEvents';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const registrationsApi = {
  async getByUserId(userId: string): Promise<Registration[]> {
    await delay(300);
    return mockRegistrations.filter((r) => r.userId === userId);
  },

  async getByEventId(eventId: string): Promise<Registration[]> {
    await delay(300);
    return mockRegistrations.filter((r) => r.eventId === eventId);
  },

  async create(eventId: string, userId: string): Promise<Registration> {
    await delay(500);
    const existing = mockRegistrations.find((r) => r.eventId === eventId && r.userId === userId);
    if (existing) return existing;
    const reg: Registration = {
      id: `r${Date.now()}`,
      eventId,
      userId,
      status: 'CONFIRMED',
      registeredAt: new Date().toISOString(),
    };
    mockRegistrations.push(reg);
    const event = mockEvents.find((e) => e.id === eventId);
    if (event) event.registeredCount = (event.registeredCount ?? 0) + 1;
    return reg;
  },

  async cancel(registrationId: string): Promise<void> {
    await delay(300);
    const reg = mockRegistrations.find((r) => r.id === registrationId);
    if (reg) {
      reg.status = 'CANCELLED';
      const event = mockEvents.find((e) => e.id === reg.eventId);
      if (event) event.registeredCount = Math.max(0, (event.registeredCount ?? 0) - 1);
    }
  },
};
