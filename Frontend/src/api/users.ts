import type { User } from '@/types';
import { mockUsers } from '@/data/mock/mockUsers';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const usersApi = {
  async getById(id: string): Promise<User | null> {
    await delay(200);
    return mockUsers.find((u) => u.id === id) ?? null;
  },

  async getAll(): Promise<User[]> {
    await delay(400);
    return mockUsers;
  },

  async updateProfile(userId: string, data: Partial<User>): Promise<User> {
    await delay(500);
    const user = mockUsers.find((u) => u.id === userId);
    if (!user) throw new Error('User not found.');
    Object.assign(user, data);
    return user;
  },
};
