import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/lib/types';

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  updateUser: (updatedFields: Partial<User>) => void;
  logout: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,

      setUser: (userData) => set({ user: userData }),

      updateUser: (updatedFields) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedFields } : null,
        })),

      logout: () => {
        useUserStore.persist.clearStorage();
        set({ user: null });
      },
    }),
    {
      name: 'user-storage',
    },
  ),
);

export default useUserStore;
