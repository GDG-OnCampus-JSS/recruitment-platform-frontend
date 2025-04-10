'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { getApi, postApi } from '@/api/api';
import { apiEndPoints } from '@/api/apiEndpoints';
import { AuthCard } from '@/components/common/auth-card';
import FormInput from '@/components/common/form-input';
import LogoGrid from '@/components/common/logo-grid';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { statusCode } from '@/constants/apiStatus';
import { handleToastApiResponse } from '@/lib/helpers';

const newPasswordSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Confirm password must be at least 8 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type NewPasswordFormValues = z.infer<typeof newPasswordSchema>;

const ResetPasswordPage = () => {
  const router = useRouter();
  const token = useParams().token?.toString();
  console.log(token);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<NewPasswordFormValues>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const validateToken = async (token: string) => {
    const { status, data } = await getApi(apiEndPoints.users.verifyToken(token));

    if (status === statusCode.Ok200) setIsTokenValid(true);
    else setIsTokenValid(false);

    handleToastApiResponse(status, data);
  };

  const onSubmit = async (data: NewPasswordFormValues) => {
    const payLoadData = {
      password: data.password,
      token: token,
    };

    const { status, data: responseData } = await postApi(
      apiEndPoints.users.resetPassword,
      payLoadData,
    );

    handleToastApiResponse(status, responseData);

    if (status === statusCode.Ok200) {
      router.push('/login');
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (token) {
      validateToken(token);
    }
    setIsLoading(false);
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isTokenValid) {
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
            <div className="flex flex-col items-center gap-20">
              <Link href="/">
                <Image src="/gdg-logo.svg" height={40} width={40} alt="GDG Logo" />
              </Link>
              <div className="flex flex-col items-center gap-4">
                <h1 className="text-center text-heading-1 font-medium text-gray-900">
                  The token has expired. Kindly request a new token
                </h1>
                <Button className="h-11 w-full bg-btn-primary hover:bg-indigo-600">
                  <Link href="/forgot-password">Request New Token</Link>
                </Button>
              </div>
            </div>
          </div>
        </AuthCard>
      </LogoGrid>
    );
  }

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
            <h1 className="text-heading-1 font-medium text-gray-900">Reset Password</h1>
            <Link href="/">
              <Image src="/gdg-logo.svg" height={40} width={40} alt="GDG Logo" />
            </Link>
          </div>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="relative">
                <FormInput
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  label="New Password"
                  placeholder="Enter your new password"
                  isAsterisk
                />
                <Icon
                  icon={showPassword ? 'fluent:eye-16-regular' : 'fluent:eye-off-16-regular'}
                  width="24"
                  height="24"
                  className="absolute right-4 top-9 cursor-pointer text-neutral-700"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>

              <div className="relative">
                <FormInput
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  label="Confirm Password"
                  placeholder="Confirm your new password"
                  isAsterisk
                />
                <Icon
                  icon={showConfirmPassword ? 'fluent:eye-16-regular' : 'fluent:eye-off-16-regular'}
                  width="24"
                  height="24"
                  className="absolute right-4 top-9 cursor-pointer text-neutral-700"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              </div>

              <Button type="submit" className="h-11 w-full bg-btn-primary hover:bg-indigo-600">
                Reset Password
              </Button>
            </form>
          </Form>
        </div>
      </AuthCard>
    </LogoGrid>
  );
};

export default ResetPasswordPage;
