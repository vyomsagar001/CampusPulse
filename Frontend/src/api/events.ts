import type { CampusEvent } from '@/types';

const API_URL = 'http://localhost:5000/api/events';

export const eventsApi = {
  async getAll(): Promise<CampusEvent[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }

    const data = await response.json();

    return data.events.map((event: any) => ({
      ...event,
      id: event._id,
      registeredCount: event.registeredCount ?? 0,
    }));
  },

  async getById(id: string): Promise<CampusEvent | null> {
    const response = await fetch(`${API_URL}/${id}`);

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error('Failed to fetch event');
    }

    const data = await response.json();

    return {
      ...data.event,
      id: data.event._id,
      registeredCount: data.event.registeredCount ?? 0,
    };
  },

  async getByClubId(clubId: string): Promise<CampusEvent[]> {
    const events = await this.getAll();

    return events.filter((event) => event.club === clubId);
  },
};