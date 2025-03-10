'use client';
import Link from 'next/link';
import { CircleAlert } from 'lucide-react';
import StepCard from '@/components/dashboardlayout/step-card';
import Image from 'next/image';
import { reqFields, mockUser } from '@/lib/options';
import clip from '@/components/dashboardlayout/clip-board';
import brain from '@/components/dashboardlayout/brain';
import meet from '@/components/dashboardlayout/meet';
import useUserStore from '@/stores/userStore';
import { blobUrl } from '@/lib/helpers';

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
    <div className="min-h-screen lg:min-h-[calc(100vh-212px)]">
      <div className="mx-auto px-4 pt-20">
        <div className="mb-8 flex items-start justify-between">
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 rounded-full">
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
                <div className="flex items-center gap-2">
                  <div className="hidden text-[#EB8D8D] sm:block">
                    <CircleAlert size={24} />
                  </div>
                  <p className="items-center text-[14px] font-normal tracking-[0.02em] text-[#EB8D8D] sm:flex sm:gap-2 sm:text-base">
                    Your profile is not complete!{' '}
                    <Link
                      href="/dashboard/profile"
                      className="font-normal leading-[24.26px] tracking-[0.02em] text-black underline sm:text-xl"
                    >
                      Complete now
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="h-6 sm:w-[153px] sm:pt-6">
            <h2 className="font-medium leading-[24.26px] sm:text-[20px]">Your Dashboard</h2>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 justify-items-center gap-5 sm:mb-20 sm:grid-cols-2 md:grid-cols-3">
          {steps.map((step) => (
            <StepCard key={step.step} {...step} />
          ))}
        </div>
      </div>
    </div>
  );
}
