'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/common/form-input';
import { TooltipProvider } from '@/components/ui/tooltip';
import LogoGrid from '@/components/common/logo-grid';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail, Pencil } from 'lucide-react';
import { Icon } from '@iconify/react';

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

const phoneSchema = z.object({
  phone: z.string().min(10, 'Please enter a valid phone number'),
});

const verificationSchema = z.object({
  verificationCode: z.string().min(6, 'Please enter the 6-digit code'),
});

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Confirm password must be at least 8 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(0);
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resetData, setResetData] = useState<{ email?: string; phone?: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(
      step === 0
        ? method === 'email'
          ? emailSchema
          : phoneSchema
        : step === 1
          ? verificationSchema
          : resetPasswordSchema,
    ),
    defaultValues: {
      email: '',
      phone: '',
      verificationCode: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: any) {
    if (step === 0) {
      // Send OTP
      setResetData(values);
      setStep(1);
      form.reset({ verificationCode: '' });
    } else if (step === 1) {
      // Verify OTP
      setStep(2);
      form.reset({ password: '', confirmPassword: '' });
    } else {
      // Reset Password
      try {
        setIsLoading(true);
        console.log('Resetting password:', values);
        // send the data to your backend
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }

  const switchMethod = () => {
    if (step === 0) {
      const newMethod = method === 'email' ? 'phone' : 'email';
      setMethod(newMethod);
      form.reset({ [newMethod]: '' });
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    try {
      // Simulate API call to resend code
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(`New verification code sent to your ${method}`);
    } catch (error) {
      console.error('Failed to resend code. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <LogoGrid>
      <TooltipProvider>
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto mt-1 w-[500px] overflow-hidden rounded-[1rem] border-card bg-white shadow-card duration-300 hover:rounded-[1.5rem]"
        >
          <div className="p-12">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h1 className="text-heading-1 font-medium text-gray-900">
                {step === 0
                  ? 'Forgot Password'
                  : step === 1
                    ? `Verify your ${method}`
                    : 'Reset Password'}
              </h1>
              <Link href="/">
                <Image src="/gdg-logo.svg" height={40} width={40} alt="GDG Logo" />
              </Link>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <AnimatePresence mode="wait">
                  {step === 0 && (
                    <motion.div
                      key="input"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ type: 'spring', stiffness: 250, damping: 20, duration: 0.7 }}
                      className="relative"
                    >
                      <FormInput
                        name={method === 'email' ? 'email' : 'phone'}
                        type={method === 'email' ? 'email' : 'tel'}
                        label={method === 'email' ? 'Email' : 'Phone Number'}
                        placeholder={
                          method === 'email'
                            ? 'Enter your email address'
                            : 'Enter your phone number'
                        }
                        info={`We'll send a verification code to this ${method}`}
                        isAsterisk
                        className={method === 'phone' ? 'pl-14' : ''}
                      />
                      {method === 'phone' && (
                        <div className="absolute left-3 top-[36px] text-sm">
                          <span>+ 91</span>
                          <span className="ml-2 text-gray-light">|</span>
                        </div>
                      )}
                    </motion.div>
                  )}
                  {step === 1 && (
                    <motion.div
                      key="verification"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{
                        type: 'spring',
                        stiffness: 250,
                        damping: 20,
                        delay: 0.3,
                        duration: 0.7,
                      }}
                    >
                      <div className="space-y-6">
                        <div className="min-w-[400px] max-w-[500px] text-sm text-muted-foreground">
                          We've sent a code to{' '}
                          <span className="font-medium text-gray-900">
                            {resetData.email || resetData.phone}{' '}
                            <Button
                              variant="link"
                              className="h-auto border p-1"
                              onClick={() => setStep(0)}
                            >
                              <Pencil className="h-3 w-3" />
                            </Button>
                          </span>{' '}
                          . Please enter to verify
                        </div>
                        <FormInput
                          name="verificationCode"
                          label=""
                          placeholder="Enter the 6-digit code"
                          isAsterisk
                          className="text-center text-lg tracking-wider"
                          maxLength={6}
                        />
                      </div>
                    </motion.div>
                  )}
                  {step === 2 && (
                    <motion.div
                      key="reset"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{
                        type: 'spring',
                        stiffness: 250,
                        damping: 20,
                        delay: 0.3,
                        duration: 0.7,
                      }}
                      className="space-y-6"
                    >
                      <div className="relative">
                        <FormInput
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          label="New Password"
                          placeholder="Enter new password"
                          isAsterisk
                        />
                        <Icon
                          icon={
                            showPassword ? 'fluent:eye-16-regular' : 'fluent:eye-off-16-regular'
                          }
                          width="24"
                          height="24"
                          className="absolute right-4 top-9 cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      </div>
                      <div>
                        <div className="relative">
                          <FormInput
                            name="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password text-neutral-700'}
                            label="Confirm Password"
                            placeholder="Re-enter new password"
                            isAsterisk
                          />
                          <Icon
                            icon={
                              showConfirmPassword
                                ? 'fluent:eye-16-regular'
                                : 'fluent:eye-off-16-regular'
                            }
                            width="24"
                            height="24"
                            className="absolute right-4 top-9 cursor-pointer text-neutral-700"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <Button
                  type="submit"
                  className="h-11 w-full border bg-btn-primary tracking-wide hover:bg-indigo-600"
                  disabled={isLoading}
                >
                  {isLoading ? 'Please wait...' : step === 2 ? 'Reset Password' : 'Continue'}
                </Button>
                {step === 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    className="mb-4 h-11 w-full bg-white font-light text-neutral-800 hover:bg-gray-50"
                    onClick={handleResendCode}
                    disabled={isResending}
                  >
                    {isResending ? 'Sending...' : 'Resend Code'}
                  </Button>
                )}
                {step === 0 && (
                  <>
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
              </form>
            </Form>
          </div>
          <div className="mt-[33px] bg-gray-extra-light p-4 text-center text-sm text-black">
            Remembered? Back to{' '}
            <a href="/login" className="font-medium text-[#6366f1] underline hover:text-[#5558e7]">
              Log In
            </a>
          </div>
        </motion.div>
      </TooltipProvider>
    </LogoGrid>
  );
}
