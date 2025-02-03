'use client';
import { create } from 'zustand';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import { AuthState } from '@/lib/types';
import { getApi, postApi, getByIdApi } from '@/api/api';
import { toast } from 'sonner';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: process.env.NODE_ENV === 'development' ? false : true,
  setLoading: (loading: boolean) => set({ loading }),

  fetchUserDetails: async (id: string) => {
    const { status, data } = await getByIdApi('/users', id);
    if (status === 200) {
      set({ user: data['Fetched user'] });
      return data['Fetched user'];
    }
    toast.error('Failed to load user profile');
    return null;
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
      toast.error('Session expired - Please login again');
    } finally {
      set({ loading: false });
    }
  },

  login: async (email: string, password: string) => {
    set({ loading: true });
    const { status, data } = await postApi('/users/login', { email, password });

    if (status === 200) {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('accessToken='))
        ?.split('=')[1];

      if (token) {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        await useAuthStore.getState().fetchUserDetails(decoded.id);
      }
      toast.success('Login successful');
      return { success: true };
    }

    set({ loading: false });
    toast.error(data?.message || 'Login failed');
    return { success: false, error: data?.message };
  },

  logout: async () => {
    const { status } = await postApi('/users/logout', {}); // No try-catch needed
    if (status === 200) {
      set({ user: null });
      toast.success('Logged out successfully');
    } else {
      toast.error('Logout failed');
    }
  },
}));

export const useAuth = () => {
  const [authState, setAuthState] = useState(() => ({
    user: useAuthStore.getState().user,
    loading: useAuthStore.getState().loading,
  }));

  useEffect(() => {
    const unsubscribe = useAuthStore.subscribe((state) => {
      setAuthState({
        user: state.user,
        loading: state.loading,
      });
    });

    return unsubscribe;
  }, []);

  return useMemo(() => authState, [authState]);
};

export const useAuthCheck = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { checkAuth, setLoading } = useAuthStore();

  useEffect(() => {
    let isMounted = true;

    const verifyAuth = async () => {
      if (pathname === '/login') {
        setLoading(false);
        return;
      }

      if (isMounted) {
        await checkAuth();
      }
    };

    verifyAuth();

    return () => {
      isMounted = false;
    };
  }, [pathname]);
};
