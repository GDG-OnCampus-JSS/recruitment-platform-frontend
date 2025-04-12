'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Spinner } from '@/components/common/spinner';
import useAdminStore from '@/stores/adminStore';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const admin = useAdminStore((state) => state.admin);
  const [isLoading, setIsLoading] = useState(true);
  const [storeHydrated, setStoreHydrated] = useState(false);

  useEffect(() => {
    // Check for hydration by waiting a tick until localStorage is available
    const timeout = setTimeout(() => {
      const storedData = localStorage.getItem('admin-storage');
      if (storedData) {
        setStoreHydrated(true);
      } else {
        setStoreHydrated(true); // Still hydrate if no admin found
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!storeHydrated) return;

    if (!admin) {
      router.replace('/admin/login'); // use replace to avoid flash in browser history
    } else {
      setIsLoading(false);
    }
  }, [admin, storeHydrated, router]);

  if (!storeHydrated || isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner className="text-theme" />
      </div>
    );
  }

  return <>{children}</>;
};

export default Layout;
