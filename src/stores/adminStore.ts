import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Admin } from '@/lib/types';

interface AdminState {
  admin: Admin | null;
  setAdmin: (admin: Admin) => void;
  updateAdmin: (updatedFields: Partial<Admin>) => void;
  logout: () => void;
}

const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      admin: null,
      setAdmin: (adminData) => set({ admin: adminData }),
      updateAdmin: (updatedFields) =>
        set((state) => ({
          admin: state.admin ? { ...state.admin, ...updatedFields } : null,
        })),

      logout: () => set({ admin: null }),
    }),
    {
      name: 'admin-storage',
    },
  ),
);

export default useAdminStore;
