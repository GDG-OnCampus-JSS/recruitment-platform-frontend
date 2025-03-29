import { ChevronDown, LogOut, Mail, Phone, UserCog } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useAuth, useAuthStore } from '@/context/authContext';
import { mockUser } from '@/lib/options';
import { User } from '@/lib/types';
import { Button } from '../ui/button';

const ProfileDropdown = ({ onEditProfile }: { onEditProfile: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayUser, setDisplayUser] = useState<User | null>(null);
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setDisplayUser((user || mockUser) as User);
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  if (loading || !displayUser) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="relative inline-block text-left">
      <Button
        type="button"
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-[36px] items-center gap-2 rounded-[37px] px-4"
      >
        <Image src="/avatar.svg" alt="Profile" width={26} height={26} className="rounded-full" />
        <ChevronDown className="h-4 w-4" />
      </Button>

      {isOpen && (
        <div className="fixed right-4 top-20 z-50 min-w-[300px] rounded-[8px] bg-[#fff] md:absolute md:right-0 md:mt-2 md:w-[360px]">
          <div className="p-4">
            <div className="mb-4 flex w-[304px] items-center gap-4 space-x-3 pr-4">
              <Image
                src={displayUser.photo || '/DP.jpeg'}
                alt="Profile"
                width={48}
                height={48}
                className="h-[68px] w-[68px] rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-normal">{displayUser.name}</h3>
                <p className="text-base font-bold text-[#F4B400]">{displayUser.domain}</p>
              </div>
            </div>

            <div className="mb-4 space-y-2 pl-5 pt-10">
              <p className="flex items-center gap-2 pb-3 text-base font-normal">
                <Mail className="h-5 w-5" />
                {displayUser.email}
              </p>
              <p className="flex items-center gap-2 text-base font-normal">
                <Phone className="h-5 w-5" />
                {displayUser.phone}
              </p>
            </div>

            <div className="flex justify-between px-5 pt-7">
              <Button
                type="button"
                variant="outline"
                className="flex w-[102px] items-center gap-1 space-x-1 rounded-[6px] px-3 py-2 text-sm text-[#635BFF]"
                onClick={() => {
                  onEditProfile();
                  setIsOpen(false);
                }}
              >
                <UserCog size={16} />
                <span>Edit Profile</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handleLogout}
                className="flex w-[102px] items-center gap-1 space-x-1 rounded-[6px] px-3 py-2 text-sm text-[#DB4437]"
              >
                <LogOut size={16} />
                <span>Log out</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
