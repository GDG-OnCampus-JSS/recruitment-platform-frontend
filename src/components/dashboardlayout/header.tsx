'use client';
import { Hand, Menu, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { postApi } from '@/api/api';
import { apiEndPoints } from '@/api/apiEndpoints';
import { Button } from '@/components/ui/button';
import { statusCode } from '@/constants/apiStatus';
import { handleToastApiResponse } from '@/lib/helpers';
import { navItems } from '@/lib/options';
import { User } from '@/lib/types';
import { cn } from '@/lib/utils';
import useUserStore from '@/stores/userStore';
import EditProfileDialog from '../admin/edit-profile';
import ProfileDropdown from '../admin/profile-dropdown';
import Dropdown from '../common/selectComp';
import MobileMenu from './mobile-menu';
import NotificationButton from './notification';

// header for dashboard and signed in users
export const Header = ({ isAdmin }: { isAdmin: boolean }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const [displayUser, setDisplayUser] = useState<User>(user || ({} as User));

  const logoutUser = useUserStore((state) => state.logout);

  const isAdminRoute = pathname?.startsWith('/admin');

  // scroll State
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setIsScrolled(true);
        setIsCollapsed(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const contentVariants = {
    open: {
      width: 'auto',
      opacity: 1,
      marginLeft: '0.5rem',
      transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] },
    },
    collapsed: {
      width: 0,
      opacity: 0,
      marginLeft: 0,
      transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] },
    },
  };

  const handleProfileSubmit = async (values: any): Promise<void> => {
    //   if (!user?.id) return;
    //   const updatedProfile = await profileService.updateProfile(user.id, values);
    //   if (updatedProfile) {
    //     toast.success('Profile updated successfully');
    //     setDisplayUser(updatedProfile);
    //     setIsEditProfileOpen(false);
    //   } else {
    //     toast.error('Failed to update profile');
    //   }
  };

  const handleLogout = async () => {
    const loginMethod = user?.loginMethod;

    if (loginMethod == 'google') {
      logoutUser();
      router.push('/');
      return;
    }

    const { status, data: responseData } = await postApi(apiEndPoints.users.logout);
    handleToastApiResponse(status, responseData);
    if (status == statusCode.Ok200) {
      logoutUser();
      setIsMobileMenuOpen(false);
      router.push('/');
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
                onClick={() => {
                  router.push(item.href);
                }}
                disabled={item.label === 'Results'}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span className="text-sm font-normal leading-4">{item.label}</span>
              </Button>
            ))}
          </motion.nav>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="ml-2 flex items-center justify-center rounded-full"
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
          <div className="hidden lg:block">
            <Button
              variant="outline"
              className="flex items-center justify-center gap-1 rounded-[22px] border border-neutral-200/50 bg-white/30 px-3 py-2 shadow-inner backdrop-blur-lg"
              onClick={() =>
                window.open('https://chat.whatsapp.com/KIzWKEujQqbHgOWKAtYhWj', '_blank')
              }
            >
              <Hand size={18} />
              <span className="text-sm font-normal leading-4 text-[#100C2C]">I have a doubt</span>
            </Button>
          </div>

          <NotificationButton mode={isAdmin ? 'admin' : 'user'} className="mx-2" />

          <div className="hidden sm:block">
            {isAdminRoute ? (
              <ProfileDropdown onEditProfile={() => setIsEditProfileOpen(true)} />
            ) : (
              user && <Dropdown user={user} onLogout={handleLogout} />
            )}
          </div>

          <Button
            variant="ghost"
            className="ml-2 rounded-3xl border border-neutral-200/50 bg-white/30 shadow-inner backdrop-blur-lg md:ml-0 lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu />
          </Button>

          <EditProfileDialog
            isOpen={isEditProfileOpen}
            onClose={() => setIsEditProfileOpen(false)}
            userData={displayUser}
            onSubmit={handleProfileSubmit}
          />
          <MobileMenu
            isOpen={isMobileMenuOpen}
            navItems={navItems}
            pathname={pathname}
            onHelpClick={() => router.push('https://chat.whatsapp.com/KIzWKEujQqbHgOWKAtYhWj')}
            isAdminRoute={isAdminRoute}
            onEditProfile={() => setIsEditProfileOpen(true)}
            isEditProfileOpen={isEditProfileOpen}
            onCloseEditProfile={() => setIsEditProfileOpen(false)}
            userData={displayUser}
            onLogout={handleLogout}
            onSubmitProfile={handleProfileSubmit}
            onCloseMenu={() => setIsMobileMenuOpen(false)}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
