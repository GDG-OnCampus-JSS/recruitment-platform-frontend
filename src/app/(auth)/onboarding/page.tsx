'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LogoGrid from '@/components/common/logo-grid';
import { PersonalInformation } from './personal-information';
import { AdditionalDetails } from './additional-details';
import { useRouter } from 'next/navigation';
import { AuthCard } from '@/components/common/auth-card';
import { useSessionStorage } from '@/hooks/use-session-storage';

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const router = useRouter();
  const { getSessionData } = useSessionStorage();

  const handlePersonalInfoSubmit = (values: any) => {
    setFormData((prev) => ({ ...prev, ...values }));
    setStep(1);
  };

  //use this to get email for registration

  const handleAdditionalDetailsSubmit = async (values: any) => {
    const finalData = {
      ...formData,
      ...values,
      ...getSessionData('registrationData'),
    };

    console.log('Final Data:', finalData);
    //call api
    // call postApi and then remove the data from sessionStorage
  };

  const handleBack = () => {
    setStep(0);
  };

  return (
    <LogoGrid>
      <AuthCard>
        <div className="mb-10 space-y-1">
          <div className="flex items-center justify-between gap-32">
            <h1 className="text-heading-1 font-medium text-gray-900">
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
          <PersonalInformation initialValues={formData} onSubmit={handlePersonalInfoSubmit} />
        ) : (
          <AdditionalDetails
            initialValues={formData}
            onSubmit={handleAdditionalDetailsSubmit}
            onBack={handleBack}
          />
        )}
      </AuthCard>
    </LogoGrid>
  );
}
