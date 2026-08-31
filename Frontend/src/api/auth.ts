import type { User } from '@/types';

const API_URL = 'http://localhost:5000/api/users';

export const authApi = {
  // Google Login
  async googleLogin(
    credential: string,
  ): Promise<{ token: string; user: User }> {
    const response = await fetch(`${API_URL}/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        credential,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Google login failed');
    }

    return {
      token: data.token,
      user: {
        ...data.user,
        id: data.user.id,
      },
    };
  },

  // Email / Password Login
  async login(
    email: string,
    password: string,
  ): Promise<{ token: string; user: User }> {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return {
      token: data.token,
      user: {
        ...data.user,
        id: data.user.id,
      },
    };
  },
};