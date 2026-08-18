import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { User, UserRole } from '@/types';
import { authApi } from '@/api';

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    studentId: string;
    department: string;
    year: number;
    interests: string[];
    skills: string[];
  }) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = 'campuspulse_auth';

interface StoredAuth {
  token: string;
  user: User;
}

function loadStored(): StoredAuth | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredAuth;
  } catch {
    return null;
  }
}

function saveStored(auth: StoredAuth) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
}

function clearStored() {
  localStorage.removeItem(STORAGE_KEY);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [stored, setStored] = useState<StoredAuth | null>(() => loadStored());
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { token, user } = await authApi.login(email, password);
      const auth = { token, user };
      saveStored(auth);
      setStored(auth);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(
    async (data: Parameters<AuthContextValue['register']>[0]) => {
      setIsLoading(true);
      try {
        const { token, user } = await authApi.register(data);
        const auth = { token, user };
        saveStored(auth);
        setStored(auth);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const logout = useCallback(() => {
    clearStored();
    setStored(null);
  }, []);

  const switchRole = useCallback(
    (role: UserRole) => {
      if (!stored) return;
      const updated = { ...stored, user: { ...stored.user, role } };
      saveStored(updated);
      setStored(updated);
    },
    [stored],
  );

  const updateUser = useCallback(
    (data: Partial<User>) => {
      if (!stored) return;
      const updated = { ...stored, user: { ...stored.user, ...data } };
      saveStored(updated);
      setStored(updated);
    },
    [stored],
  );

  const value: AuthContextValue = {
    user: stored?.user ?? null,
    token: stored?.token ?? null,
    isAuthenticated: !!stored,
    isLoading,
    login,
    register,
    logout,
    switchRole,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
