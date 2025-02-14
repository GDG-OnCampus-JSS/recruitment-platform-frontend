'use client';

import StepCard from '@/components/dashboardlayout/step-card';
import clip from '@/components/dashboardlayout/clip-board';
import brain from '@/components/dashboardlayout/brain';
import meet from '@/components/dashboardlayout/meet';

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
    action: '/',
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
    action: '#',
  },
];

export default function AdminPage() {
  return (
    <div className="w-full  min-h-screen lg:min-h-[calc(100vh-212px)] px-4 pt-32 pb-7 sm:px-6 md:px-8 lg:w-[1000px] xl:w-[1120px] lg:mx-auto">

      <h1 className="text-2xl font-normal text-[#3D3D3D] pb-10   sm:text-3xl lg:text-[28px]">
        Machine Learning Dashboard
      </h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 pb-12">
        {steps.map((step) => (
          <StepCard key={step.step} {...step} />
        ))}
      </div>
    </div>
  );
}
