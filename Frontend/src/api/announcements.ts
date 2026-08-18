import type { Announcement } from '@/types';
import { mockAnnouncements } from '@/data/mock/mockAnnouncements';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const announcementsApi = {
  async getAll(): Promise<Announcement[]> {
    await delay(400);
    return mockAnnouncements;
  },
};
