'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import useUserStore from '@/stores/userStore';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  return <div>{user ? children : null}</div>;
};

export default Layout;
