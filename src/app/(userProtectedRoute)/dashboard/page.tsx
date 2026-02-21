'use client';
import { CircleAlert } from 'lucide-react';
// import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import GeneratedAvatar from '@/components/common/generated-avatar';
import { Spinner } from '@/components/common/spinner';
import PermissionPopup from '@/components/dashboardlayout/permission-popup';
import StepCard from '@/components/dashboardlayout/step-card';
import { steps } from '@/constants/dashboard';
import { userAvatarVariant } from '@/constants/registration';
// import { blobUrl } from '@/lib/helpers';
import { StepCardProps, User } from '@/lib/types';
import useUserStore from '@/stores/userStore';

export default function DashboardPage() {
  const user = useUserStore((state) => state.user);
  const userDomain = user?.domain;
  const [showPopup, setShowPopup] = useState(false);
  const [stepsToShow, setStepsToShow] = useState<StepCardProps[]>([]);

  useEffect(() => {
    setStepsToShow(steps);
  }, []);

  const isProfileComplete = (user: User | null) => {
    if (!user) return false;

    const requiredFields = [
      'name',
      'email',
      'phone',
      'admissionNumber',
      'domain',
      'year',
      'resume',
      'socialLinks',
    ];

    let completed = 0;

    requiredFields.forEach((field) => {
      const value = user[field as keyof User];

      if (field === 'socialLinks') {
        if (Array.isArray(value) && value.length > 0) {
          completed++;
        }
      } else if (typeof value === 'string') {
        if (value.trim() !== '') {
          completed++;
        }
      } else {
        if (value !== null && value !== undefined) {
          completed++;
        }
      }
    });

    const result = Math.round((completed / requiredFields.length) * 100);
    return result === 100 ? true : false;
  };

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

  useEffect(() => {
    let filteredSteps = steps.filter((step) => step.step <= 3);

    if (userDomain === 'programmer') {
      const contestStep = steps.find((s) => s.step === 4);
      if (contestStep) {
        filteredSteps = filteredSteps.map((step) =>
          step.step === 2 ? { ...contestStep, step: 2 } : step,
        );
      }
    }
    setStepsToShow(filteredSteps);
  }, [userDomain]);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="mt-20 min-h-screen">
      {showPopup && <PermissionPopup onClose={handlePopupClose} />}
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-14 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
          <div className="flex items-center gap-4 sm:gap-6">
            {/* <Image
              src={user?.photo ? blobUrl(user.photo) : '/avatar.svg'}
              alt="User"
              width={80}
              height={80}
              className="size-16 rounded-full object-cover sm:size-20"
            /> */}
            <GeneratedAvatar
              seed={user.id}
              variant={userAvatarVariant}
              className="size-20 border"
            />
            <div>
              <h2 className="mb-2 text-lg font-medium tracking-[0.28px] sm:text-[28px]">
                Hey! {user?.name.split(' ')[0]}
              </h2>
              {!isProfileComplete(user) && (
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

          <h2 className="text-sm font-medium text-neutral-500 sm:text-xl lg:text-inherit">
            Your Dashboard
          </h2>
        </div>

        <div className="mx-auto mb-32 grid w-full max-w-[1280px] grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3">
          {stepsToShow.map((step: StepCardProps, index: number) => {
            return <StepCard key={index} {...step} />;
          })}
        </div>
      </div>
    </div>
  );
}
