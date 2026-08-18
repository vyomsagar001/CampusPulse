import type { AppNotification } from '@/types';
import { mockNotifications } from '@/data/mock/mockNotifications';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const notificationsApi = {
  async getByUserId(userId: string): Promise<AppNotification[]> {
    await delay(300);
    void userId;
    return mockNotifications;
  },

  async markAsRead(id: string): Promise<void> {
    await delay(150);
    const n = mockNotifications.find((x) => x.id === id);
    if (n) n.read = true;
  },

  async markAllAsRead(userId: string): Promise<void> {
    await delay(200);
    void userId;
    mockNotifications.forEach((n) => (n.read = true));
  },
};
