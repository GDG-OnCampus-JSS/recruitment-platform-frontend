'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LogoGrid from '@/components/common/logo-grid';
import { useRouter } from 'next/navigation';
import { EmailStep } from './email-step';
import { VerificationStep } from './verification-step';
import { NewPasswordStep } from './new-password-step';
import { AuthCard } from '@/components/common/auth-card';
import { Button } from '@/components/ui/button';
import { Mail, Phone } from 'lucide-react';
import { PhoneStep } from './phone-step';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(0);
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [formData, setFormData] = useState<{
    email?: string;
    phone?: string;
    verificationCode?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const router = useRouter();

  const handleEmailSubmit = (values: any) => {
    if (method === 'email') {
      setFormData((prev) => ({ ...prev, email: values.email }));
    } else {
      setFormData((prev) => ({ ...prev, phone: values.phone }));
    }
    setStep(1);
  };

  const handleVerificationSubmit = (values: { verificationCode: string }) => {
    setFormData((prev) => ({ ...prev, verificationCode: values.verificationCode }));
    setStep(2);
  };

  const handlePasswordSubmit = async (values: { password: string; confirmPassword: string }) => {
    const finalData = {
      ...formData,
      ...values,
    };

    try {
      console.log('Final submission:', finalData);
      router.push('/login');
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const switchMethod = () => {
    setMethod(method === 'email' ? 'phone' : 'email');
    setFormData({}); // Clear form data when switching methods
  };

  const getStepTitle = () => {
    switch (step) {
      case 0:
        return 'Forgot Password';
      case 1:
        return 'Verify Code';
      case 2:
        return 'Reset Password';
      default:
        return 'Forgot Password';
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case 0:
        return method === 'email'
          ? 'Enter your email to reset password'
          : 'Enter your phone number to reset password';
      case 1:
        return `Enter the verification code sent to your ${method}`;
      case 2:
        return 'Create your new password';
      default:
        return 'Enter your email to reset password';
    }
  };

  return (
    <LogoGrid>
      <AuthCard
        footer={{
          text: 'Remembered password?',
          linkText: 'Login',
          href: '/login',
        }}
      >
        <div className="mb-10 space-y-1">
          <div className="flex items-center justify-between gap-32">
            <h1 className="text-heading-1 font-medium text-gray-900">{getStepTitle()}</h1>
            <Link href="/">
              <Image src="/gdg-logo.svg" height={40} width={40} alt="GDG Logo" />
            </Link>
          </div>
          <p className="text-sm font-extralight text-muted-foreground">{getStepDescription()}</p>
        </div>

        {step === 0 && (
          <div>
            {method === 'email' ? (
              <EmailStep initialValue={formData.email || ''} onSubmit={handleEmailSubmit} />
            ) : (
              <PhoneStep initialValue={formData.phone} onSubmit={handleEmailSubmit} />
            )}
            <div className="relative my-4 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative bg-white px-4">
                <span className="text-sm text-gray-500">or</span>
              </div>
            </div>
            <div className="grid gap-2">
              <Button
                variant="outline"
                type="button"
                className="h-11 w-full font-light"
                onClick={() => window.open('/api/auth/google', '_self')}
              >
                <Image
                  src="/icons/google.svg"
                  height={20}
                  width={20}
                  alt="Google"
                  className="mr-2"
                />
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
                    <Phone className="mr-2 h-5 w-5" />
                    Continue with Phone
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-5 w-5" />
                    Continue with Email
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {step === 1 && (
          <VerificationStep
            method={method}
            contact={method === 'email' ? formData.email || '' : formData.phone || ''}
            initialValue={formData.verificationCode}
            onSubmit={handleVerificationSubmit}
            onBack={handleBack}
          />
        )}

        {step === 2 && (
          <NewPasswordStep
            initialValues={formData}
            onSubmit={handlePasswordSubmit}
            onBack={handleBack}
          />
        )}
      </AuthCard>
    </LogoGrid>
  );
}
