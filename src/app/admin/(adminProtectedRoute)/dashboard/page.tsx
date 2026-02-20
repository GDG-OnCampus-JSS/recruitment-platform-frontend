'use client';

import { useEffect, useState } from 'react';
import StepCard from '@/components/admin/admin-step-card';
import { adminSteps } from '@/constants/dashboard';
import { StepCardProps } from '@/lib/types';
import useAdminStore from '@/stores/adminStore';

export default function AdminPage() {
  const [stepsToShow, setStepsToShow] = useState<StepCardProps[]>([]);
  const admin = useAdminStore((state) => state.admin);

  useEffect(() => {
    setStepsToShow(adminSteps);
  }, []);

  return (
    <div className="mt-20 min-h-screen">
      <div className="mx-auto max-w-6xl px-4">
        <div className="pb-10">
          <h1 className="text-xl font-normal capitalize text-[#3D3D3D] sm:text-3xl lg:text-[28px]">
            Welcome back {admin?.domain?.split(' ')[0]} Lead
          </h1>
          <p>{admin?.email}</p>
        </div>
        <div className="grid grid-cols-1 gap-5 pb-12 sm:grid-cols-2 md:grid-cols-3">
          {adminSteps.map((step) => (
            <StepCard key={step.step} {...step} />
          ))}
        </div>
      </div>
    </div>
  );
}
