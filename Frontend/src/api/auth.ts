import type { User } from '@/types';
import { mockUsers } from '@/data/mock/mockUsers';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const authApi = {
  async login(email: string, password: string): Promise<{ token: string; user: User }> {
    await delay(600);
    const user = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) throw new Error('No account found with this email.');
    if (!password) throw new Error('Password is required.');
    return { token: `mock-jwt-${user.id}`, user };
  },

  async register(data: {
    name: string;
    email: string;
    password: string;
    studentId: string;
    department: string;
    year: number;
    interests: string[];
    skills: string[];
  }): Promise<{ token: string; user: User }> {
    await delay(700);
    if (mockUsers.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
      throw new Error('An account with this email already exists.');
    }
    const user: User = {
      id: `u${Date.now()}`,
      name: data.name,
      email: data.email,
      role: 'STUDENT',
      studentId: data.studentId,
      academic: { department: data.department, year: data.year },
      interests: data.interests,
      skills: data.skills,
      profile: { bio: '', phone: '' },
    };
    return { token: `mock-jwt-${user.id}`, user };
  },

  async getProfile(userId: string): Promise<User> {
    await delay(300);
    const user = mockUsers.find((u) => u.id === userId);
    if (!user) throw new Error('User not found.');
    return user;
  },
};
