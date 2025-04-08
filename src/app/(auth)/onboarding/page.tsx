'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { AuthCard } from '@/components/common/auth-card';
import LogoGrid from '@/components/common/logo-grid';
import { AdditionalDetails } from './additional-details';
import { PersonalInformation } from './personal-information';

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<any>({});

  const nextStep = () => {
    setStep(1);
  };

  const prevStep = () => {
    setStep(0);
  };

  return (
    <LogoGrid>
      <AuthCard>
        <div className="mb-10 space-y-1">
          <div className="flex items-center justify-between gap-32">
            <h1 className="text-heading-1 font-medium leading-[1em] tracking-[0.02em] text-gray-900">
              {step === 0 ? 'Personal Information' : 'Additional Details'}
            </h1>
            <Link href="/">
              <Image src="/gdg-logo.svg" height={40} width={40} alt="GDG Logo" />
            </Link>
          </div>
          <p className="text-sm font-extralight text-muted-foreground">
            {step === 0 ? 'Tell us a bit about yourself' : 'Complete your profile'}
          </p>
        </div>
        {step === 0 ? (
          <PersonalInformation formData={formData} setFormData={setFormData} nextStep={nextStep} />
        ) : (
          <AdditionalDetails formData={formData} setFormData={setFormData} prevStep={prevStep} />
        )}
      </AuthCard>
    </LogoGrid>
  );
}
