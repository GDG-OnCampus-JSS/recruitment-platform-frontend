'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { apiEndPoints } from '@/api/apiEndpoints';
import { AuthCard } from '@/components/common/auth-card';
import { Divider } from '@/components/common/divider';
import LogoGrid from '@/components/common/logo-grid';
import { Button } from '@/components/ui/button';
import { statusCode } from '@/constants/apiStatus';
import { useSessionStorage } from '@/hooks/use-session-storage';
import { useToast } from '@/hooks/use-toast';
import useUserStore from '@/stores/userStore';
import { EmailStep } from './email-step';
import { VerificationStep } from './verification-step';

export default function RegisterPage() {
  const [method, setMethod] = useState<'email'>('email');
  const [isVerifying, setIsVerifying] = useState(false);
  const [registrationData, setRegistrationData] = useState<{ email?: string }>({});
  const [initialStep, setInitialStep] = useState<number>(0);
  const router = useRouter();
  const { toast } = useToast();
  const setUser = useUserStore((state) => state.setUser);

  const steps = [{ label: 'Register to Recruitments 25' }, { label: `Verify your email` }];

  const handleNextStep = async (data?: { email?: string }) => {
    if (data) {
      setRegistrationData(data);
    }
    if (initialStep < steps.length - 1) {
      setInitialStep(initialStep + 1);
      setIsVerifying(true);
    } else {
      toast({
        variant: 'success',
        title: 'OTP verified successfully',
        description: 'OTP verified continue with further steps',
        duration: 5000,
      });
      router.push('/onboarding');
    }
  };

  const handleGoogleLogin = () => {
    const googleAuthUrl = `${process.env.NEXT_PUBLIC_API_URL}${apiEndPoints.oauth.googleAuth}`;
    window.location.href = googleAuthUrl;
    sessionStorage.setItem('googleLoginTriggered', 'true');
  };

  const handleEdit = () => {
    const currentData = registrationData;

    setInitialStep(0);
    setIsVerifying(false);

    setRegistrationData(currentData);
  };

  const renderForm = (step: number) => {
    switch (step) {
      case 0:
        return (
          <EmailStep
            onSuccess={(data) => handleNextStep({ email: data.email })}
            initialValue={registrationData.email}
          />
        );
      case 1:
        return (
          <VerificationStep
            data={registrationData}
            next={() => handleNextStep()}
            onEdit={handleEdit}
          />
        );
    }
  };

  return (
    <LogoGrid>
      <AuthCard
        footer={{
          text: 'Already Registered?',
          linkText: 'Log In',
          href: '/login',
        }}
      >
        {/* Title */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <h1 className="text-heading-1 font-medium text-gray-900">
            {isVerifying ? `Verify your email` : "Register to Recruitments'25"}
          </h1>
          <div>
            <Link href="/">
              <Image src="/gdg-logo.svg" height={40} width={40} alt="GDG Logo" />
            </Link>
          </div>
        </div>

        <div>{renderForm(initialStep)}</div>

        {!isVerifying && (
          <>
            <Divider className="my-4" text="or" />
            <div className="grid gap-2">
              <Button
                variant="outline"
                type="button"
                className="h-11 w-full font-light"
                onClick={handleGoogleLogin}
              >
                <Image src="/icons/google.svg" height={20} width={20} alt="Google" />
                Continue with Google
              </Button>
            </div>
          </>
        )}
      </AuthCard>
    </LogoGrid>
  );
}
