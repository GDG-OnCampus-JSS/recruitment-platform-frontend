'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import useAdminStore from '@/stores/adminStore';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // const router = useRouter();
  // const admin = useAdminStore((state) => state.admin);

  // useEffect(() => {
  //   if (!admin) {
  //     router.push('/admin/login');
  //   }
  // }, [admin, router]);

  // return <div>{admin ? children : null}</div>;

  return <div>{children}</div>;
};

export default Layout;
