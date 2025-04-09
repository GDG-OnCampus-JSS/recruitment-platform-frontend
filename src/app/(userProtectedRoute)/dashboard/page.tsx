'use client';
import { CircleAlert } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import PermissionPopup from '@/components/dashboardlayout/permission-popup';
import StepCard from '@/components/dashboardlayout/step-card';
import { steps } from '@/constants/dashboard';
import { blobUrl } from '@/lib/helpers';
import { reqFields, mockUser } from '@/lib/options';
import { StepCardProps } from '@/lib/types';
import useUserStore from '@/stores/userStore';

export default function DashboardPage() {
  const user = useUserStore((state) => state.user);
  const [showPopup, setShowPopup] = useState(false);
  const [stepsToShow, setStepsToShow] = useState<StepCardProps[]>([]);

  useEffect(() => {
    setStepsToShow(steps);
  }, [steps]);

  const isProfileComplete = reqFields.every(
    (field) =>
      mockUser[field as keyof typeof mockUser] &&
      mockUser[field as keyof typeof mockUser]?.toString().trim() !== '',
  );

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
            <div>
              <h2 className="mb-2 text-lg font-medium tracking-[0.28px] sm:text-[28px]">
                Hey! {user?.name.split(' ')[0]}
              </h2>
              {!isProfileComplete && (
                <div className="flex items-start gap-1 sm:items-center">
                  <CircleAlert size={20} className="hidden text-red-500 sm:block" />
                  <h3 className="text-sm leading-[1em] tracking-[0.02em] text-red-500 sm:text-base">
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
          {stepsToShow.map((step: StepCardProps, index: number) => {
            return <StepCard key={index} {...step} />;
          })}
        </div>
      </div>
    </div>
  );
}
