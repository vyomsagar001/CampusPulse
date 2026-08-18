import type { Club } from '@/types';

const API_BASE_URL = 'http://localhost:5000/api';

export const clubsApi = {
  async getAll(): Promise<Club[]> {
    const response = await fetch(`${API_BASE_URL}/clubs`);

    if (!response.ok) {
      throw new Error('Failed to fetch clubs');
    }

    const data = await response.json();

    return data.clubs;
  },

  async getById(id: string): Promise<Club | null> {
    const response = await fetch(`${API_BASE_URL}/clubs/${id}`);

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error('Failed to fetch club');
    }

    const data = await response.json();

    return data.club;
  },

  async getByAdminId(adminId: string): Promise<Club[]> {
    const response = await fetch(
      `${API_BASE_URL}/clubs/admin/${adminId}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch clubs');
    }

    const data = await response.json();

    return data.clubs;
  },
};