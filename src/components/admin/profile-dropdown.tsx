import React, { useState,useEffect } from 'react';
import { ChevronDown, LogOut, Mail, Phone, UserCog } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { useAuth,useAuthStore } from '@/context/authContext';
import { User } from '@/lib/types';
import { mockUser } from '@/lib/options';
import { useRouter } from 'next/navigation'; 


const ProfileDropdown = ({onEditProfile, }: { onEditProfile: () => void; 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayUser, setDisplayUser] = useState<User | null>(null);
  const { user, loading, logout} = useAuth();
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
        className="flex h-[36px] items-center gap-2 rounded-[37px]  px-4"
      >
        <Image 
          src="/avatar.svg" 
          alt="Profile" 
          width={26} 
          height={26} 
          className="rounded-full"
        />
        <ChevronDown className="h-4 w-4 " />
      </Button>

     
      {isOpen && (
        <div className="absolute right-0 mt-2 w-[360px] rounded-[8px] bg-[#fff]  ">
          <div className="p-4">
            
            <div className="flex items-center space-x-3 w-[304px] gap-4 pr-4 mb-4">
              <Image 
                src={displayUser.photo || '/DP.jpeg'}
                alt="Profile" 
                width={48} 
                height={48} 
                className="rounded-full object-cover w-[68px] h-[68px]"
              />
              <div>
                <h3 className="text-xl font-normal">{displayUser.name}</h3>
                <p className="text-base font-bold text-[#F4B400]">{displayUser.domain}</p>
              </div>
            </div>

           
            <div className="space-y-2 pt-10 pl-5 mb-4 ">
              <p className="text-base font-normal pb-3 flex items-center gap-2 "><Mail className='w-5 h-5'/>{displayUser.email}</p>
              <p className="text-base font-normal flex items-center gap-2  "><Phone className='w-5 h-5'/>{displayUser.phone}</p>
            </div>

           
            <div className="pt-7 flex justify-between px-5">
              <Button
                type="button"
                variant="outline"
                 className="w-[102px] flex items-center space-x-1 px-3 py-2 text-sm text-[#635BFF] gap-1  rounded-[6px] "
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
                className="w-[102px] flex items-center space-x-1 gap-1 px-3 py-2 text-sm text-[#DB4437]  rounded-[6px]"
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