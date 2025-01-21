'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BellIcon, Hand, User, Home, LayoutGrid, Globe, Medal, Menu, Import } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import Dropdown from '../common/selectComp';
import NotificationButton from './notification';
import { useAuthStore } from '@/context/authContext';
import { LogoutResponse } from '@/types/types';
import { options, navItems } from '@/types/options';


export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleDropdownSelect = async (value: string) => {
    setSelectedOption(value);
    if (value === 'profile') {
      router.push('dashboard/profile');
    } else if (value === 'logout') {
      await handleLogout();
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error during logout:', error);
      alert('An error occurred during logout.');
    }
  };

  return (
    <header className="fixed left-0 top-0 z-10 w-full border-b bg-[#FFFFFF]">
      <div className="mx-auto flex h-[66px] w-full items-center justify-between px-4 sm:px-20">
        {/* Left section */}
        <div className="flex items-center gap-12 md:gap-6">
          <Link href="/">
            <div className="flex h-[32px] w-[187px] items-center gap-1 md:w-[127px]">
              <div className="h-[32px] w-[32px]">
                <Image
                  src="/logo.jpeg"
                  alt="Logo"
                  width={26}
                  height={26}
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="font-sans text-sm font-normal leading-4">GDG JSSATEN</span>
            </div>
          </Link>
        </div>

        <nav className="hidden h-[32px] w-[606.88px] items-center gap-[19.58px] sm:flex">
          {navItems.map((item) => (
            <Link href={item.href} key={item.href} className="h-full">
              <Button
                variant="ghost"
                className={`gap-2 ${pathname === item.href ? 'text-black' : ''}`}
              >
                <item.icon className="h-4 w-4" />
                <span className="font-sans text-sm font-normal leading-4">{item.label}</span>
              </Button>
            </Link>
          ))}
        </nav>

        <div className="flex h-[36px] w-[267px] items-center gap-1 sm:gap-[16px]">
          <Button
            variant="outline"
            className="h-[36px] w-[133px] gap-1 rounded-[22px] border border-[#000000] px-3 py-2"
            onClick={() => router.push('/help')}
          >
            <Hand size={18} />
            <span className="font-sans text-sm font-normal leading-4 sm:inline">
              I Have a doubt?
            </span>
          </Button>

          <NotificationButton />

          <div className="hidden sm:block">
            <Button
              variant="ghost"
              className="h-[36px] w-[66px] rounded-[37px] border border-[#DDE3FF] bg-[#FFFFFF] p-[8px]"
            >
              <Image src="/avatar.png" alt="User" width={26} height={26} className="rounded-full" />
              <Dropdown options={options} onSelect={handleDropdownSelect} />
              {selectedOption && <span className="sr-only">Selected: {selectedOption}</span>}
            </Button>{' '}
          </div>

          <div className="z-50 flex items-center md:hidden">
            <Button
              variant="ghost"
              className="rounded-md"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
          {isMobileMenuOpen && (
            <div className="absolute left-0 right-0 top-16 w-full bg-white p-4 shadow-md md:hidden">
              <nav className="">
                {navItems.map((item) => (
                  <Link href={item.href} key={item.href} className="ite w-full">
                    <Button
                      variant="ghost"
                      className={`gap-2 ${pathname === item.href ? 'text-black' : ''} w-full text-left`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="font-sans text-sm font-normal leading-4">{item.label}</span>
                    </Button>
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
