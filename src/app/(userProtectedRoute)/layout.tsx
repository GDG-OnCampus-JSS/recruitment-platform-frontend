'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Spinner } from '@/components/common/spinner';
import useUserStore from '@/stores/userStore';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   if (!user || user === null) {
  //     router.push('/login');
  //   }

  //   setIsLoading(false);
  // }, [user, router]);

  // if (isLoading) {
  //   return (
  //     <div className="flex h-screen w-full items-center justify-center">
  //       <Spinner className="text-theme" />
  //     </div>
  //   );
  // }

  // if (user) {
  return <>{children}</>;
  // }
};

export default Layout;
