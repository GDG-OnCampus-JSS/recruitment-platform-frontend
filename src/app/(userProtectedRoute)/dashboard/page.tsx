'use client';
import { CircleAlert } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import brain from '@/components/dashboardlayout/brain';
import clip from '@/components/dashboardlayout/clip-board';
import meet from '@/components/dashboardlayout/meet';
import PermissionPopup from '@/components/dashboardlayout/permission-popup';
import StepCard from '@/components/dashboardlayout/step-card';
import { blobUrl } from '@/lib/helpers';
import { reqFields, mockUser } from '@/lib/options';
import useUserStore from '@/stores/userStore';

export const steps = [
  {
    step: 1,
    title: 'Task Round',
    description: 'Solve and create! Impress us with your solution.',
    icon: clip,
    buttonText: 'View Tasks',
    iconColor: '#4285F4',
    buttonBgColor: 'bg-[#4285F4]',
    gradientBg: 'bg-blue-gradient',
    action: '/dashboard/task-round',
    eventStartDate: new Date('2025-04-13T00:00:00'),
    eventEndDate: new Date('2025-04-02T03:00:00'),
  },
  {
    step: 2,
    title: 'Aptitude Quiz',
    description: 'A quick 30-min quiz to test your technical aptitude.',
    icon: brain,
    buttonText: 'Start Now',
    iconColor: '#FBBC04',
    buttonBgColor: 'bg-[#FBBC04]',
    gradientBg: 'bg-yellow-gradient',
    action: '/quiz',
    eventStartDate: new Date('2025-04-14T00:00:00'),
    eventEndDate: new Date('2025-04-02T03:00:00'),
  },
  {
    step: 3,
    title: 'Personal Interview',
    description: 'The final step, a conversation to seal your place.',
    icon: meet,
    buttonText: 'View Timing',
    iconColor: '#EA4335',
    buttonBgColor: 'bg-[#EA4335]',
    gradientBg: 'bg-red-gradient',
    action: '#',
    eventStartDate: new Date('2025-04-15T00:00:00'),
    eventEndDate: new Date('2025-04-02T03:00:00'),
  },
];

export default function DashboardPage() {
  const user = useUserStore((state) => state.user);

  const isProfileComplete = reqFields.every(
    (field) =>
      mockUser[field as keyof typeof mockUser] &&
      mockUser[field as keyof typeof mockUser]?.toString().trim() !== '',
  );

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasSubscribed = localStorage.getItem('subscribed');
    
    if (!hasSubscribed) {
      setShowPopup(true);
    }
  }, []);
  
  const handlePopupClose = () => {
    localStorage.setItem('subscribed', 'true');
    setShowPopup(false);
  };

  return (
    <div className="mt-20 min-h-screen">
      {showPopup && <PermissionPopup onClose={handlePopupClose} />}
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="mb-14 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
          <div className="flex items-center gap-4 sm:gap-6">
            <Image
              src={user?.photo ? blobUrl(user.photo) : '/avatar.svg'}
              alt="User"
              width={80}
              height={80}
              className="size-16 rounded-full object-contain sm:size-20"
            />
            <div className="">
              <h1 className="mb-1 text-lg font-medium sm:text-3xl">
                Hey {user?.name.split(' ')[0]}!
              </h1>
              {!isProfileComplete && (
                <div className="flex items-start gap-1 sm:items-center">
                  <CircleAlert size={20} className="hidden text-red-500 sm:block" />
                  <h3 className="text-sm text-red-500 sm:text-base">
                    Your profile is not complete.{' '}
                    <Link
                      href="/dashboard/profile"
                      className="font-normal tracking-wide text-black underline underline-offset-4"
                    >
                      Complete now!
                    </Link>
                  </h3>
                </div>
              )}
            </div>
          </div>

          <h2 className="text-sm font-medium sm:text-xl">Your Dashboard</h2>
        </div>

        <div className="mx-auto mb-6 grid w-full max-w-[1280px] grid-cols-1 justify-items-center gap-4 sm:mb-20 sm:grid-cols-2 sm:gap-5 md:grid-cols-3">
          {steps.map((step) => (
            <StepCard key={step.step} {...step} />
          ))}
        </div>
      </div>
    </div>
  );
}
