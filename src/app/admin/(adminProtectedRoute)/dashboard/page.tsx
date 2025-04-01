'use client';

import brain from '@/components/dashboardlayout/brain';
import clip from '@/components/dashboardlayout/clip-board';
import meet from '@/components/dashboardlayout/meet';
import StepCard from '@/components/dashboardlayout/step-card';
import useAdminStore from '@/stores/adminStore';

export const steps = [
  {
    step: 1,
    title: 'Task Round',
    description: '',
    icon: clip,
    buttonText: 'View List',
    buttonVariant: 'outline' as const,
    iconColor: '#4285F4',
    buttonBgColor: 'bg-[#4285F4]',
    gradientBg: 'bg-blue-gradient',
    action: '/',
    eventStartDate: new Date('2023-10-01T00:00:00Z'),
    eventEndDate: new Date('2023-10-31T23:59:59Z'),
  },
  {
    step: 2,
    title: 'Create Quiz',
    description: '',
    icon: brain,
    buttonText: 'View Quiz',
    buttonVariant: 'default' as const,
    iconColor: '#FBBC04',
    buttonBgColor: 'bg-[#FBBC04]',
    gradientBg: 'bg-yellow-gradient',
    action: 'dashboard/create-quiz',
    eventStartDate: new Date('2023-10-01T00:00:00Z'),
    eventEndDate: new Date('2023-10-31T23:59:59Z'),
  },
  {
    step: 3,
    title: 'All Candidates',
    description: '',
    icon: meet,
    buttonText: 'View List',
    buttonVariant: 'destructive' as const,
    iconColor: '#EA4335',
    buttonBgColor: 'bg-[#EA4335]',
    gradientBg: 'bg-red-gradient',
    action: 'dashboard/all-candidates',
    eventStartDate: new Date('2023-10-01T00:00:00Z'),
    eventEndDate: new Date('2023-10-31T23:59:59Z'),
  },
];

export default function AdminPage() {
  const admin = useAdminStore((state) => state.admin);
  return (
    <div className="min-h-screen w-full px-4 pb-7 pt-32 sm:px-6 md:px-8 lg:mx-auto lg:w-[1000px] xl:w-[1120px]">
      <h1 className="pb-10 text-xl font-normal capitalize text-[#3D3D3D] sm:text-3xl lg:text-[28px]">
        Welcome back {admin?.domain?.split(' ')[0]} Lead
      </h1>

      <div className="grid grid-cols-1 gap-5 pb-12 sm:grid-cols-2 md:grid-cols-3">
        {steps.map((step) => (
          <StepCard key={step.step} {...step} />
        ))}
      </div>
    </div>
  );
}
