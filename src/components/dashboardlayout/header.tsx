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

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [displayUser, setDisplayUser] = useState<User>(user || mockUser);

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
    if (!user?.id) return;
    const updatedProfile = await profileService.updateProfile(user.id, values);
    if (updatedProfile) {
      toast.success('Profile updated successfully');
      setDisplayUser(updatedProfile);
      setIsEditProfileOpen(false);
    } else {
      toast.error('Failed to update profile');
    }
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
    try {
      await logout();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <header className="fixed left-0 top-0 z-10 w-full border-b bg-[#FFFFFF]">
      <div className="mx-auto flex h-[66px] w-full items-center justify-between px-4 sm:px-20">
        <div className="flex items-center gap-12 md:gap-6">
          <Link href="/">
            <div className="flex h-[32px] w-[187px] items-center gap-1 md:w-[127px]">
              <div className="h-[32px] w-[32px]">
                <Image
                  src="/logo.svg"
                  alt="Logo"
                  width={26}
                  height={26}
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="text-sm font-normal leading-4">GDG JSSATEN</span>
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
                <span className="text-sm font-normal leading-4">{item.label}</span>
              </Button>
            </Link>
          ))}
        </nav>

        <div className="flex h-[36px] w-[267px] items-center gap-1 sm:gap-[16px]">
          <div className="hidden sm:block">
            <Button
              variant="outline"
              className="flex h-[36px] w-[133px] items-center justify-center gap-1 rounded-[22px] px-3 py-2"
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

          <div className="md:hidden">
            <Button
              variant="ghost"
              className="rounded-md"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
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
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
