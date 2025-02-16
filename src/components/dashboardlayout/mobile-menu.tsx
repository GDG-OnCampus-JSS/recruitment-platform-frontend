import React from 'react';
import Link from 'next/link';
import { Hand } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavItem } from '@/lib/types';
import ProfileDropdown from '../admin/profile-dropdown';
import EditProfileDialog from '../admin/edit-profile';

interface MobileMenuProps {
  isOpen: boolean;
  navItems: NavItem[];
  pathname: string;
  onHelpClick: () => void;
  isAdminRoute: boolean;
  onEditProfile: () => void;
  isEditProfileOpen: boolean;
  onCloseEditProfile: () => void;
  userData: any;
  onSubmitProfile: (values: any) => Promise<void>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  navItems,
  pathname,
  onHelpClick,
  isAdminRoute,
  onEditProfile,
  isEditProfileOpen,
  onCloseEditProfile,
  userData,
  onSubmitProfile,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 top-[66px] z-50 bg-white">
        {isAdminRoute && (
          <div className="z-60 absolute right-4 top-4">
            <ProfileDropdown onEditProfile={onEditProfile} />
          </div>
        )}
        <div className="h-full overflow-y-auto pb-20">
          <nav className="px-2 py-4">
            {navItems.map((item) => (
              <Link href={item.href} key={item.href}>
                <div
                  className={`mb-2 flex items-center rounded-lg px-4 py-3 transition-colors ${
                    pathname === item.href
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      pathname === item.href ? 'text-indigo-600' : 'text-gray-400'
                    }`}
                  />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              </Link>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100 bg-white p-4">
            <Button
              variant="outline"
              onClick={onHelpClick}
              className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-black py-3 text-sm font-medium"
            >
              <Hand className="h-5 w-5" />
              <span>I Have a doubt?</span>
            </Button>
          </div>
        </div>
      </div>

      <EditProfileDialog
        isOpen={isEditProfileOpen}
        onClose={onCloseEditProfile}
        userData={userData}
        onSubmit={onSubmitProfile}
      />
    </>
  );
};

export default MobileMenu;
