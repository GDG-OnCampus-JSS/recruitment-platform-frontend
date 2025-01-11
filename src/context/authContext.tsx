'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  admissionNumber?: string;
  domain?: string;
  year?: string;
  photo?: string;
  resume?: string;
  socialLinks?: { platform: string; url: string }[];
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();

  const fetchUserDetails = async (id: string) => {
    try {
      const response = await fetch(`${process.env.API_URL}/users/${id}`, {
        credentials: 'include',
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData['Fetched user']);
      }
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${process.env.API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('accessToken='))
        ?.split('=')[1];

      if (token) {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        const userId = decoded.id;

        await fetchUserDetails(userId);
        router.push('/dashboard');
      }

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch(`${process.env.API_URL}/users/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (pathname === '/login') {
          setLoading(false);
          return;
        }
        const token = document.cookie
          .split('; ')
          .find((row) => row.startsWith('accessToken='))
          ?.split('=')[1];

        if (token) {
          const decoded = JSON.parse(atob(token.split('.')[1]));
          const userId = decoded.id;
          await fetchUserDetails(userId);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [[pathname, router]]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
