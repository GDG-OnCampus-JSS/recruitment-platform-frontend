'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Spinner } from '@/components/common/spinner';
import useUserStore from '@/stores/userStore';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const [storeHydrated, setStoreHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedData = localStorage.getItem('user-storage');
    if (storedData !== null) {
      setStoreHydrated(true);
    } else {
      setStoreHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!storeHydrated) return;

    if (!user) {
      router.push('/login');
      return;
    }

    setIsLoading(false);
  }, [user, storeHydrated, router]);

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
