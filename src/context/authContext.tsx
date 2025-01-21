'use client';
import { create } from 'zustand';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AuthState } from '@/types/types';

const api = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
});

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: process.env.NODE_ENV === 'development' ? false : true,

  setLoading: (loading: boolean) => set({ loading }),

  fetchUserDetails: async (id: string) => {
    try {
      const response = await api.get(`/users/${id}`);
      set({ user: response.data['Fetched user'] });
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    }
  },

  checkAuth: async () => {
    try {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('accessToken='))
        ?.split('=')[1];

      if (token) {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        await useAuthStore.getState().fetchUserDetails(decoded.id);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      set({ loading: false });
    }
  },

  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/users/login', { email, password });

      const cookies = document.cookie.split('; ');
      const token = cookies.find((row) => row.startsWith('accessToken='))?.split('=')[1];

      if (token) {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        await useAuthStore.getState().fetchUserDetails(decoded.id);
      }

      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed',
      };
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await api.post('/users/logout');
      set({ user: null });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  },
}));

export const useAuth = () => {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  return { user, loading };
};

export const useAuthCheck = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { checkAuth, setLoading } = useAuthStore();

  useEffect(() => {
    const handleAuthCheck = async () => {
      if (pathname === '/login') {
        setLoading(false);
        return;
      }
      await checkAuth();
    };

    handleAuthCheck();
  }, [pathname, router, checkAuth, setLoading]);
};
