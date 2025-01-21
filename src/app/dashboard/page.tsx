'use client';
import { ClipboardList, Brain, Users } from 'lucide-react';
import Link from 'next/link';
import StepCard from '@/components/dashboardlayout/stepCard';
import Image from 'next/image';
import { useAuth } from '@/context/authContext';
import { reqFields, mockUser } from '@/types/options';

export const steps = [
  {
    step: 1,
    title: 'Task Round',
    description: 'Show your technical prowess up with your solution.',
    icon: 'ClipboardList',
    buttonText: 'View more',
    buttonVariant: 'outline' as const,
    iconColor: '#4285F4',
    buttonBgColor: 'bg-[#4285F4]',
    gradientBg: 'bg-blue-gradient',
    action: '/dashboard/taskRound',
  },
  {
    step: 2,
    title: 'Aptitude Quiz',
    description: 'A quick 30-min quiz to test your technical aptitude.',
    icon: 'Brain',
    buttonText: 'Start Quiz',
    buttonVariant: 'default' as const,
    iconColor: '#FBBC04',
    buttonBgColor: 'bg-[#FBBC04]',
    gradientBg: 'bg-yellow-gradient',
    action: '/dashboard/aptitudeQuiz',
  },
  {
    step: 3,
    title: 'Personal Interview',
    description: 'The final step, a conversation to seal your place.',
    icon: 'Users',
    buttonText: 'Schedule now',
    buttonVariant: 'destructive' as const,
    iconColor: '#EA4335',
    buttonBgColor: 'bg-[#EA4335]',
    gradientBg: 'bg-red-gradient',
    action: '#',
  },
];

// const mockUser = {
//   id: 'dev-123',
//   name: 'Developer User',
//   email: 'developer@example.com',
//   phone: '+91 9876543210',
//   admissionNumber: '23cseds999',
//   domain: 'Design',
//   year: '1st year',
// };

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const displayUser = user || mockUser;

  const isProfileComplete = reqFields.every(
    (field) =>
      mockUser[field as keyof typeof mockUser] &&
      mockUser[field as keyof typeof mockUser].toString().trim() !== '',
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-52">
      <div className="mx-auto max-w-[1120px] px-4 pt-20">
        <div className="mb-8 flex items-start justify-between">
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 overflow-hidden rounded-full">
              <Image
                src="/avatar.png"
                alt="User"
                width={80}
                height={80}
                className="h-20 w-20 rounded-full"
              />
            </div>
            <div className="flex flex-col gap-1 font-sans">
              <h1 className="text-[28px] font-bold leading-[33.96px] text-black">
                Hey! {displayUser.name}
              </h1>
              {!isProfileComplete && (
                <p className="text-base font-normal tracking-[0.02em] text-[#EB8D8D]">
                  Your profile is not complete!{' '}
                  <Link
                    href="/dashboard/profile"
                    className="font-sans text-xl font-normal leading-[24.26px] tracking-[0.02em] text-black underline"
                  >
                    Complete now
                  </Link>
                </p>
              )}
            </div>
          </div>

          <div className="h-6 w-[153px]">
            <h2 className="font-sans text-[20px] font-medium leading-[24.26px]">Your Dashboard</h2>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 md:grid-cols-3">
          {steps.map((step) => (
            <StepCard key={step.step} {...step} />
          ))}
        </div>
      </div>
    </div>
  );
}
