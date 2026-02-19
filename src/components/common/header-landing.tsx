'use client';

import { Menu, ChevronRight, ChevronLeft, HandIcon } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { postApi } from '@/api/api';
import { apiEndPoints } from '@/api/apiEndpoints';
import { ZephyrPopup } from '@/components/home/zephyr-popup';
import { Button } from '@/components/ui/button';
import { statusCode } from '@/constants/apiStatus';
import { handleToastApiResponse } from '@/lib/helpers';
import { navItems } from '@/lib/options';
import { cn } from '@/lib/utils';
import useUserStore from '@/stores/userStore';
import MobileMenu from './mobile-menu-header';
import PrimaryButton from './primary-button';
import Dropdown from './selectComp';

// header for landing page
export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showZephyr, setShowZephyr] = useState(false);
  const { user } = useUserStore();
  const logoutUser = useUserStore((state) => state.logout);

  // scroll State
  const [isScrolled, setIsScrolled] = useState(false);
  const [isManuallyOpen, setIsManuallyOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
        setIsManuallyOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isCollapsed = isScrolled && !isManuallyOpen;

  const contentVariants = {
    open: {
      width: 'auto',
      opacity: 1,
      marginLeft: '0.5rem', // ml-2 equivalent
      transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] }, // Cubic bezier for smooth start/stop
    },
    collapsed: {
      width: 0,
      opacity: 0,
      marginLeft: 0,
      transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] },
    },
  };

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
    <header className="fixed top-0 z-20 my-3 w-full">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
        {/* COLLAPSIBLE CONTAINER */}
        <motion.div
          layout
          transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
          className="flex items-center rounded-3xl border border-neutral-200/50 bg-white/30 px-4 py-3 shadow-inner backdrop-blur-lg"
        >
          <Link href="/" className="z-10 flex-shrink-0">
            <div className="flex items-center gap-2">
              <Image src="/logo.svg" alt="Logo" width={26} height={26} />

              <motion.div
                initial="open"
                animate={isCollapsed ? 'collapsed' : 'open'}
                variants={contentVariants}
                className="overflow-hidden whitespace-nowrap"
              >
                <span className="text-sm font-normal leading-4">GDG JSSATEN</span>
              </motion.div>
            </div>
          </Link>

          <motion.div
            initial="open"
            animate={isCollapsed ? 'collapsed' : 'open'}
            variants={{
              open: { width: '1.5px', height: '1.25rem', opacity: 1, marginLeft: '0.5rem' },
              collapsed: { width: 0, height: '1.25rem', opacity: 0, marginLeft: 0 },
            }}
            className="hidden bg-neutral-200 lg:block"
          />

          <motion.nav
            initial="open"
            animate={isCollapsed ? 'collapsed' : 'open'}
            variants={contentVariants}
            className="hidden items-center gap-2 overflow-hidden whitespace-nowrap lg:flex"
          >
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className={cn(
                  'h-9 px-4 transition-colors',
                  pathname === item.href ? 'border-none bg-indigo-200/80 hover:bg-indigo-200' : '',
                )}
                onClick={() => router.push(item.href)}
                disabled={item.label === 'Results'}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span className="text-sm font-normal leading-4">{item.label}</span>
              </Button>
            ))}
          </motion.nav>

          <motion.button
            initial={{ width: 0, opacity: 0, scale: 0 }}
            animate={{
              width: isScrolled ? 'auto' : 0,
              opacity: isScrolled ? 1 : 0,
              scale: isScrolled ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsManuallyOpen(!isManuallyOpen)}
            className="ml-1 flex items-center justify-center rounded-full"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white transition-colors hover:bg-white">
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4 text-gray-700" />
              ) : (
                <ChevronLeft className="h-4 w-4 text-gray-700" />
              )}
            </div>
          </motion.button>
        </motion.div>

        <div className="flex items-center">
          <Button
            variant="ghost"
            className="mr-2 rounded-2xl border border-neutral-200/50 bg-transparent px-4 py-6 shadow-inner backdrop-blur-lg"
            onClick={() => setShowZephyr(true)}
          >
            <HandIcon />I have a doubt
          </Button>
          <ZephyrPopup open={showZephyr} onOpenChange={setShowZephyr} />
          <div className="hidden lg:block">
            {user ? (
              <Dropdown
                // imageSrc={user?.photo ? blobUrl(user.photo) : '/avatar.svg'}
                onLogout={handleLogout}
                user={user}
              />
            ) : (
              // <AnimatedButton
              //   className="flex items-center justify-center gap-2 rounded-2xl bg-secondary p-6 text-black shadow-inner hover:bg-secondary"
              //   onClick={() => router.push('/login')}
              // >
              //   <UserIcon />
              //   Login
              // </AnimatedButton>
              <PrimaryButton
                className="border-transparent bg-yellow-300 text-black shadow-inner backdrop-blur-lg"
                onClick={() => router.push('/login')}
              >
                Login
              </PrimaryButton>
            )}
          </div>
          <Button
            variant="ghost"
            className="rounded-md border border-neutral-200/50 bg-white/30 shadow-inner backdrop-blur-lg md:ml-0 lg:hidden"
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
