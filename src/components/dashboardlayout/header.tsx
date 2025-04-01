'use client';
import { Hand, Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { postApi } from '@/api/api';
import { apiEndPoints } from '@/api/apiEndpoints';
import { Button } from '@/components/ui/button';
import { statusCode } from '@/constants/apiStatus';
import { blobUrl, handleToastApiResponse } from '@/lib/helpers';
import { options, navItems, mockUser } from '@/lib/options';
import { User } from '@/lib/types';
import useUserStore from '@/stores/userStore';
import EditProfileDialog from '../admin/edit-profile';
import ProfileDropdown from '../admin/profile-dropdown';
import Dropdown from '../common/selectComp';
import MobileMenu from './mobile-menu';
import NotificationButton from './notification';

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const [displayUser, setDisplayUser] = useState<User>(user || ({} as User));

  const logoutUser = useUserStore((state) => state.logout);

  const isAdminRoute = pathname?.startsWith('/admin');

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
    const { status, data: responseData } = await postApi(apiEndPoints.users.logout);

    handleToastApiResponse(status, responseData);

    if (status == statusCode.Ok200) {
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
              className="flex items-center justify-center gap-1 rounded-[22px] px-3 py-2"
              onClick={() => router.push('/help')}
            >
              <Hand size={18} />
              <span className="text-sm font-normal leading-4 text-[#100C2C]">I have a doubt</span>
            </Button>
          </div>

          <NotificationButton className="mx-4" />

          <div className="hidden sm:block">
            {isAdminRoute ? (
              <ProfileDropdown onEditProfile={() => setIsEditProfileOpen(true)} />
            ) : (
              <Dropdown
                imageSrc={user?.photo ? blobUrl(user.photo) : '/avatar.svg'}
                onLogout={handleLogout}
              />
            )}
          </div>

          <Button
            variant="ghost"
            className="ml-2 rounded-md border md:ml-0 lg:hidden"
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
            onHelpClick={() => router.push('/help')}
            isAdminRoute={isAdminRoute}
            onEditProfile={() => setIsEditProfileOpen(true)}
            isEditProfileOpen={isEditProfileOpen}
            onCloseEditProfile={() => setIsEditProfileOpen(false)}
            userData={displayUser}
            onSubmitProfile={handleProfileSubmit}
            onCloseMenu={() => setIsMobileMenuOpen(false)}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
