'use client';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { navItems } from '@/lib/options';
import MobileMenu from './mobile-menu-header';

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <nav className="ml-2 hidden items-center lg:flex">
            {navItems.map((item) => (
              <Link href={item.href} key={item.href} className="h-full">
                <Button
                  variant="ghost"
                  className={`gap-2 ${pathname === item.href ? 'text-black' : ''}`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm font-normal leading-4">{item.label}</span>
                </Button>
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center">
          <div className="hidden lg:block">
            <Button
              variant="outline"
              className="flex items-center justify-center gap-1 px-4 py-2 text-[#432AD8]"
              onClick={() => router.push('/login')}
            >
              Login
            </Button>
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
            onCloseMenu={() => setIsMobileMenuOpen(false)}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
