'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Hand, Menu } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Dropdown from '../common/selectComp';
import NotificationButton from './notification';
import { useAuthStore } from '@/context/authContext';
import { options, navItems, mockUser } from '@/lib/options';
import { User } from '@/lib/types';
import EditProfileDialog from '../admin/edit-profile';
import ProfileDropdown from '../admin/profile-dropdown';
import MobileMenu from './mobile-menu';
import { profileService } from '@/context/profileContext';
import { toast } from 'sonner';
import { postApi } from '@/api/api';
import { apiEndPoints } from '@/api/apiEndpoints';
import { statusCode } from '@/constants/apiStatus';
import { useToast } from '@/hooks/use-toast';

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [displayUser, setDisplayUser] = useState<User>(user || mockUser);
  const { toast } = useToast();

  const isAdminRoute = pathname?.startsWith('/admin');

  useEffect(() => {
    if (isEditProfileOpen && user?.id) {
      fetchUserProfile();
    }
  }, [isEditProfileOpen, user?.id]);

  const fetchUserProfile = async () => {
    if (!user?.id) return;
    const profileData = await profileService.getUserProfile(user.id);
    if (profileData) {
      setDisplayUser(profileData);
    }
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

  const handleDropdownSelect = async (value: string) => {
    setSelectedOption(value);
    if (value === 'profile') {
      router.push('/dashboard/profile');
    } else if (value === 'logout') {
      await handleLogout();
    }
  };

  const handleLogout = async () => {
    const { status, data: responseData } = await postApi(apiEndPoints.users.logout);

    if (status == statusCode.Ok200) {
      router.push('/');
    } else {
      const errorMessage =
        Array.isArray(responseData?.errors) && responseData.errors.length > 0
          ? responseData.errors[0]
          : responseData?.message || 'Something went wrong. Please try again.';
      toast({
        variant: 'destructive',
        title: 'Something went wrong!',
        description: errorMessage,
      });
    }
  };

  return (
    <header className="fixed left-0 top-0 z-20 w-full border-b bg-white px-8 py-2 md:border-b-0 lg:bg-white/50 lg:backdrop-blur-lg">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
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

        <div className="flex items-center sm:gap-4">
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

          <NotificationButton />

          <div className="hidden sm:block">
            {isAdminRoute ? (
              <ProfileDropdown onEditProfile={() => setIsEditProfileOpen(true)} />
            ) : (
              <Button
                variant="ghost"
                className="h-[36px] w-[66px] rounded-[37px] border border-[#DDE3FF] bg-[#FFFFFF]"
              >
                <Image
                  src="/avatar.svg"
                  alt="User"
                  width={26}
                  height={26}
                  className="ml-2 rounded-full"
                />
                <Dropdown options={options} onSelect={handleDropdownSelect} />
                {selectedOption && <span className="sr-only">Selected: {selectedOption}</span>}
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
