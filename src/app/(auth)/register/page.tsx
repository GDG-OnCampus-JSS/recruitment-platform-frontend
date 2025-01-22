'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Phone, Mail, Router } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LogoGrid from '@/components/common/logo-grid';
import Link from 'next/link';
import { AuthCard } from '@/components/common/auth-card';
import { EmailStep } from './email-step';
import { VerificationStep } from './verification-step';
import { PhoneStep } from './phone-step';
import { useRouter } from 'next/navigation';
import { Divider } from '@/components/common/divider';

export default function RegisterPage() {
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [isVerifying, setIsVerifying] = useState(false);
  const [registrationData, setRegistrationData] = useState<{ email?: string; phone?: string }>({});
  const [initialStep, setInitialStep] = useState<number>(0);
  const router = useRouter(); // Correct initialization of router

  const switchMethod = () => {
    if (!isVerifying) {
      const newMethod = method === 'email' ? 'phone' : 'email';
      setMethod(newMethod);
    }
  };

  const steps = [{ label: 'Register to Recruitments 25' }, { label: `Verify your ${method}` }];

  const handleNextStep = (data?: { email?: string; phone?: string }) => {
    if (data) {
      setRegistrationData(data);
    }
    if (initialStep < steps.length - 1) {
      setInitialStep(initialStep + 1);
      setIsVerifying(true);
    } else {
      console.log('Final Registration Data:', {
        ...registrationData,
      });
      router.push('/onboarding');
    }
  };

  const handleEdit = () => {
    const currentMethod = method;
    const currentData = registrationData;

    setInitialStep(0);
    setIsVerifying(false);

    setMethod(currentMethod);
    setRegistrationData(currentData);
  };

  const renderForm = (step: number) => {
    switch (step) {
      case 0:
        return method === 'email' ? (
          <EmailStep
            onSuccess={(data) => handleNextStep({ email: data.email })}
            initialValue={registrationData.email}
          />
        ) : (
          <PhoneStep
            onSuccess={(data) => handleNextStep({ phone: data.phone })}
            initialValue={registrationData.phone}
          />
        );
      case 1:
        return (
          <VerificationStep
            method={method}
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
            {isVerifying ? `Verify your ${method}` : "Register to Recruitments'25"}
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
                onClick={() => window.open('/api/auth/google', '_self')}
              >
                <Image src="/icons/google.svg" height={20} width={20} alt="Google" />
                Continue with Google
              </Button>
              <Button
                variant="outline"
                type="button"
                className="h-11 w-full font-light"
                onClick={switchMethod}
              >
                {method === 'email' ? (
                  <>
                    <Phone className="h-6 w-6" />
                    Continue with Phone
                  </>
                ) : (
                  <>
                    <Mail className="h-12 w-12" />
                    Continue with Email
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </AuthCard>
    </LogoGrid>
  );
}
