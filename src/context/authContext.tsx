'use client';
import { create } from 'zustand';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import { AuthState } from '@/lib/types';
import { ApiRoutes } from '@/api/routes';
import { toast } from 'sonner';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: process.env.NODE_ENV === 'development' ? false : true,
  setLoading: (loading: boolean) => set({ loading }),

  fetchUserDetails: async (userId: string) => {
    const currentState = useAuthStore.getState();
    const { status, data } = await ApiRoutes.getUserById(userId);
    if (status === 200) {
      const userData = data['Fetched user'];
      set({ user: { ...userData, token: currentState.user?.token } });
      return userData;
    }
    toast.error('Failed to load user profile');
    return null;
  },

  checkAuth: async () => {
    const currentState = useAuthStore.getState();
    const token = currentState.user?.token;
    if (!token) {
      set({ user: null, loading: false });
      toast.error('Session expired - Please login again');
      return;
    }
    const { status, data } = await ApiRoutes.verifyToken(token);

    if (status === 200) {
      const userId = data.userId;
      await useAuthStore.getState().fetchUserDetails(userId);
    } else {
      const refreshResponse = await ApiRoutes.refreshToken(token);
      if (refreshResponse.status === 200) {
        const userId = refreshResponse.data.userId;
        await useAuthStore.getState().fetchUserDetails(userId);
      } else {
        set({ user: null });
        toast.error('Session expired - Please login again');
      }
    }

    set({ loading: false });
  },

  login: async (email: string, password: string) => {
    set({ loading: true });
    const { status, data } = await ApiRoutes.login({ email, password });

    if (status === 200) {
      const { token, user: userData } = data;
      set({ user: { ...userData, token } });
      await useAuthStore.getState().fetchUserDetails(userData.id);
      toast.success('Login successful');
      return { success: true };
    }

    set({ loading: false });
    toast.error(data?.message || 'Login failed');
    return { success: false, error: data?.message };
  },

  logout: async () => {
    const { status } = await ApiRoutes.logout();
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
