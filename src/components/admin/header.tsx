'use client';

import { Loader2Icon } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { postApi } from '@/api/api';
import { apiEndPoints } from '@/api/apiEndpoints';
import { statusCode } from '@/constants/apiStatus';
import { handleToastApiResponse } from '@/lib/helpers';
import useAdminStore from '@/stores/adminStore';
import NotificationButton from '../dashboardlayout/notification';
import { Button } from '../ui/button';

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const logoutAdmin = useAdminStore((state) => state.logout);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const getLinkClass = (path: string) => {
    const isActive = pathname === path;
    return `transition-colors hover:text-indigo-600 ${isActive ? 'text-indigo-600' : 'text-gray-600'}`;
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const { status, data: responseData } = await postApi(apiEndPoints.admin.logout);
      handleToastApiResponse(status, responseData);
      if (status === statusCode.Ok200) {
        logoutAdmin();
        router.push('/admin');
      }
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="fixed top-2 z-50 w-full">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-8 rounded-2xl border border-gray-200/50 bg-white/20 px-4 py-3 backdrop-blur-md">
          <h1 className="tracking-tight text-gray-900">Admin Panel</h1>

          <nav aria-label="Main navigation" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <Link href="/admin/dashboard" className={getLinkClass('/admin/dashboard')}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/dashboard/create-quiz"
                  className={getLinkClass('/admin/dashboard/create-quiz')}
                >
                  Create Quiz
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/dashboard/upload-task"
                  className={getLinkClass('/admin/dashboard/upload-task')}
                >
                  Upload Task
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/dashboard/all-candidates"
                  className={getLinkClass('/admin/dashboard/all-candidates')}
                >
                  All Candidates
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <NotificationButton mode="admin" />
          <Button
            onClick={handleLogout}
            disabled={isLoggingOut}
            variant="destructive"
            className="w-24 rounded-2xl py-[10px]"
          >
            {isLoggingOut ? <Loader2Icon className="animate-spin" /> : 'Logout'}
          </Button>
        </div>
      </div>
    </header>
  );
};
