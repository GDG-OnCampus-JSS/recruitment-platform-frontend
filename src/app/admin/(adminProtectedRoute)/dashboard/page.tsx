'use client';

import { useEffect, useState } from 'react';
import StepCard from '@/components/dashboardlayout/step-card';
import { adminSteps } from '@/constants/adminSteps';
import { StepCardProps } from '@/lib/types';
import useAdminStore from '@/stores/adminStore';

export default function AdminPage() {
  const [stepsToShow, setStepsToShow] = useState<StepCardProps[]>([]);
  const admin = useAdminStore((state) => state.admin);

  useEffect(() => {
    setStepsToShow(adminSteps);
  }, []);

  return (
    <div className="min-h-screen w-full px-4 pb-7 pt-32 sm:px-6 md:px-8 lg:mx-auto lg:min-h-[calc(100vh-212px)] lg:w-[1000px] xl:w-[1280px]">
      <h1 className="pb-10 text-xl font-normal capitalize text-[#3D3D3D] sm:text-3xl lg:text-[28px]">
        Welcome back {admin?.domain?.split(' ')[0]} Lead
      </h1>

      <div className="grid grid-cols-1 gap-5 pb-12 sm:grid-cols-2 md:grid-cols-3">
        {stepsToShow.map((step) => (
          <StepCard key={step.step} {...step} />
        ))}
      </div>
    </div>
  );
}
