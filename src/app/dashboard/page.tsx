'use client';
import { CircleAlert } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import brain from '@/components/dashboardlayout/brain';
import clip from '@/components/dashboardlayout/clip-board';
import meet from '@/components/dashboardlayout/meet';
import StepCard from '@/components/dashboardlayout/step-card';
import { blobUrl } from '@/lib/helpers';
import { reqFields, mockUser } from '@/lib/options';
import useUserStore from '@/stores/userStore';

export const steps = [
  {
    step: 1,
    title: 'Task Round',
    description: 'Show your technical prowess up with your solution.',
    icon: clip,
    buttonText: 'View more',
    buttonVariant: 'outline' as const,
    iconColor: '#4285F4',
    buttonBgColor: 'bg-[#4285F4]',
    gradientBg: 'bg-blue-gradient',
    action: '/dashboard/task-round',
  },
  {
    step: 2,
    title: 'Aptitude Quiz',
    description: 'A quick 30-min quiz to test your technical aptitude.',
    icon: brain,
    buttonText: 'Start Quiz',
    buttonVariant: 'default' as const,
    iconColor: '#FBBC04',
    buttonBgColor: 'bg-[#FBBC04]',
    gradientBg: 'bg-yellow-gradient',
    action: '/quiz',
  },
  {
    step: 3,
    title: 'Personal Interview',
    description: 'The final step, a conversation to seal your place.',
    icon: meet,
    buttonText: 'Schedule now',
    buttonVariant: 'destructive' as const,
    iconColor: '#EA4335',
    buttonBgColor: 'bg-[#EA4335]',
    gradientBg: 'bg-red-gradient',
    action: '#',
  },
];

export default function DashboardPage() {
  const user = useUserStore((state) => state.user);

  const isProfileComplete = reqFields.every(
    (field) =>
      mockUser[field as keyof typeof mockUser] &&
      mockUser[field as keyof typeof mockUser]?.toString().trim() !== '',
  );

  return (
    <div className="min-h-screen lg:px-44">
      <div className="mx-auto min-w-[320px] px-4 pt-20">
        <div className="mb-4 w-full text-center sm:hidden">
          <h2 className="text-xl font-medium">Your Dashboard</h2>
        </div>

        <div className="mb-6 flex w-full flex-col items-center gap-4 sm:mb-8 sm:flex-row sm:justify-between">
          <div className="flex w-full min-w-[300px] items-center gap-4 sm:w-auto sm:min-w-0 sm:gap-6">
            <div className="h-16 w-16 rounded-full sm:h-20 sm:w-20">
              <Image
                src={user?.photo ? blobUrl(user.photo) : '/avatar.svg'}
                alt="User"
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col md:gap-1">
              <h1 className="text-lg font-bold leading-[33.96px] text-[#151515] sm:text-[28px]">
                Hey! {user?.name}
              </h1>
              {!isProfileComplete && (
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="hidden text-[#EB8D8D] sm:block">
                    <CircleAlert size={24} />
                  </div>
                  <p className="items-center text-[14px] font-normal tracking-[0.02em] text-[#EB8D8D] sm:flex sm:gap-2 sm:text-base">
                    Your profile is not complete!{' '}
                    <Link
                      href="/dashboard/profile"
                      className="text-xs font-normal leading-5 tracking-[0.02em] text-black underline sm:text-xl sm:leading-[24.26px]"
                    >
                      Complete now
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="hidden w-full text-right sm:block sm:h-6 sm:w-[153px] sm:pt-6">
            <h2 className="text-[20px] font-medium leading-[24.26px]">Your Dashboard</h2>
          </div>
        </div>

        <div className="mb-6 grid w-full grid-cols-1 justify-items-center gap-4 sm:mb-20 sm:grid-cols-2 sm:gap-5 md:grid-cols-3">
          {steps.map((step) => (
            <StepCard key={step.step} {...step} />
          ))}
        </div>
      </div>
    </div>
  );
}
