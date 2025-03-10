'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AuthCard } from '@/components/common/auth-card';
import LogoGrid from '@/components/common/logo-grid';
import { EmailStep } from './email-step';

export default function ForgotPasswordPage() {
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
            <h1 className="text-heading-1 font-medium text-gray-900">Forgot Password</h1>
            <Link href="/">
              <Image src="/gdg-logo.svg" height={40} width={40} alt="GDG Logo" />
            </Link>
          </div>
          <p className="text-sm font-extralight text-muted-foreground">
            Enter your email to reset password
          </p>
        </div>
        {/* Email step */}
        <EmailStep />
        {/* Email step end */}
      </AuthCard>
    </LogoGrid>
  );
}
