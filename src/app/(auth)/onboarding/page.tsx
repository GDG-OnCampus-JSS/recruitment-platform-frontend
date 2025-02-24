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
import { postApi } from '@/api/api';
import { apiEndPoints } from '@/api/apiEndpoints';
import { statusCode } from '@/constants/apiStatus';
import { useToast } from '@/hooks/use-toast';

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const router = useRouter();
  const { getSessionData } = useSessionStorage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const nextStep = () => {
    setStep(1);
  };

  const prevStep = () => {
    setStep(0);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true); 
    const finalData = {
      ...formData,
      email: getSessionData('email'),
      year: formData.year ? Number(formData.year) : undefined,
    };
    console.log('Final Data', finalData);

    const { status, data: responseData } = await postApi(apiEndPoints.users.register, finalData);
    console.log(responseData);

    if (status === statusCode.Created201) {
      const successMessage = responseData?.message || 'Account registered.';
      toast({
        variant: 'success',
        title: 'Registration Successful',
        description: successMessage,
      });
      sessionStorage.removeItem('email');
      router.push('/dashboard');
    } else {
      const errorMessage =
        Array.isArray(responseData?.errors) && responseData.errors.length > 0
          ? responseData.errors[0]
          : responseData?.message || 'Something went wrong. Please try again.';
      toast({
        variant: 'destructive',
        title: 'Error!',
        description: errorMessage,
      });
      setIsSubmitting(true); 
    }
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
          <PersonalInformation formData={formData} setFormData={setFormData} nextStep={nextStep} />
        ) : (
          <AdditionalDetails
            formData={formData}
            setFormData={setFormData}
            nextStep={handleSubmit}
            prevStep={prevStep}
            isSubmitting={isSubmitting}
          />
        )}
      </AuthCard>
    </LogoGrid>
  );
}
