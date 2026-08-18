import type { Club } from '@/types';

const API_URL = 'http://localhost:5000/api/clubs';

export const clubsApi = {
  async getAll(): Promise<Club[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error('Failed to fetch clubs');
    }

    const data = await response.json();

    return data.clubs.map((club: any) => ({
      ...club,
      id: club._id,
    }));
  },

  async getById(id: string): Promise<Club | null> {
    const response = await fetch(`${API_URL}/${id}`);

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error('Failed to fetch club');
    }

    const data = await response.json();

    return {
      ...data.club,
      id: data.club._id,
    };
  },

  async getByAdminId(adminId: string): Promise<Club[]> {
    const clubs = await this.getAll();

    return clubs.filter((club) =>
      club.admins.includes(adminId)
    );
  },
};