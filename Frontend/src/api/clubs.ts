import type { Club } from '@/types';
import { mockClubs } from '@/data/mock/mockClubs';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const clubsApi = {
  async getAll(): Promise<Club[]> {
    await delay(400);
    return mockClubs;
  },

  async getById(id: string): Promise<Club | null> {
    await delay(300);
    return mockClubs.find((c) => c.id === id) ?? null;
  },

  async getByAdminId(adminId: string): Promise<Club[]> {
    await delay(300);
    return mockClubs.filter((c) => c.admins.includes(adminId));
  },
};
