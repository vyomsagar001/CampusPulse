import type { Issue } from '@/types';
import { mockIssues } from '@/data/mock/mockIssues';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const issuesApi = {
  async getByUserId(userId: string): Promise<Issue[]> {
    await delay(300);
    return mockIssues.filter((i) => i.userId === userId);
  },

  async create(data: Omit<Issue, 'id' | 'status' | 'createdAt' | 'userId'>, userId: string): Promise<Issue> {
    await delay(500);
    const issue: Issue = {
      id: `i${Date.now()}`,
      ...data,
      status: 'SUBMITTED',
      createdAt: new Date().toISOString(),
      userId,
    };
    mockIssues.unshift(issue);
    return issue;
  },
};
