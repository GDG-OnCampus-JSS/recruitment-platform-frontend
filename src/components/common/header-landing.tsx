'use client';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { postApi } from '@/api/api';
import { apiEndPoints } from '@/api/apiEndpoints';
import { Button } from '@/components/ui/button';
import { statusCode } from '@/constants/apiStatus';
import { blobUrl, handleToastApiResponse } from '@/lib/helpers';
import { navItems } from '@/lib/options';
import useUserStore from '@/stores/userStore';
import MobileMenu from './mobile-menu-header';
import Dropdown from './selectComp';

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useUserStore();
  const logoutUser = useUserStore((state) => state.logout);

  const handleLogout = async () => {
    const loginMethod = user?.loginMethod;

    if (loginMethod == 'google') {
      logoutUser();
      return;
    }

    const { status, data: responseData } = await postApi(apiEndPoints.users.logout);
    handleToastApiResponse(status, responseData);
    if (status == statusCode.Ok200) {
      setIsMobileMenuOpen(false);
      router.push('/');
      logoutUser();
    }
  };

  return (
    <header className="fixed left-0 top-0 z-20 w-full border-b bg-white py-3 md:border-b-0 lg:bg-white/50 lg:backdrop-blur-lg">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-8">
        <div className="flex items-center">
          <Link href="/">
            <div className="flex items-center gap-2 md:w-[127px]">
              <Image src="/logo.svg" alt="Logo" width={26} height={26} className="" />
              <span className="text-sm font-normal leading-4">GDG JSSATEN</span>
            </div>
          </Link>
          <span className="ml-2 hidden h-5 w-[1.5px] bg-neutral-200 lg:inline-block"></span>
          <nav className="ml-2 hidden items-center gap-2 lg:flex">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className={
                  pathname === item.href ? 'border-none bg-indigo-200/80 hover:bg-indigo-200' : ''
                }
                onClick={() => {
                  router.push(item.href);
                }}
                disabled={item.label === 'Results'}
              >
                <item.icon className="h-4 w-4" />
                <span className="text-sm font-normal leading-4">{item.label}</span>
              </Button>
            ))}
          </nav>
        </div>

        <div className="flex items-center">
          <div className="hidden lg:block">
            {user ? (
              <Dropdown
                imageSrc={user?.photo ? blobUrl(user.photo) : '/avatar.svg'}
                onLogout={handleLogout}
              />
            ) : (
              <Button
                variant="outline"
                className="flex items-center justify-center gap-1 px-4 py-2 text-[#432AD8]"
                onClick={() => router.push('/login')}
              >
                Login
              </Button>
            )}
          </div>
          <Button
            variant="ghost"
            className="ml-2 rounded-md border md:ml-0 lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu />
          </Button>

          <MobileMenu
            isOpen={isMobileMenuOpen}
            navItems={navItems}
            pathname={pathname}
            onLogout={handleLogout}
            onCloseMenu={() => setIsMobileMenuOpen(false)}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
