'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import useUserStore from '@/stores/userStore';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // const router = useRouter();
  // const user = useUserStore((state) => state.user);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   if (user === undefined) {
  //     return; // Still loading user state
  //   }

  //   setIsLoading(false);

  //   if (!user) {
  //     router.push('/login');
  //   }
  // }, [user, router]);

  // if (isLoading) {
  //   return <div>Loading...</div>; // Show a loader while fetching user state
  // }

  return <div>{children}</div>;
};

export default Layout;
