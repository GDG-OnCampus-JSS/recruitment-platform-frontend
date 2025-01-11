'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Phone, Mail, Pencil } from 'lucide-react';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/common/form-input';
import { TooltipProvider } from '@/components/ui/tooltip';
import LogoGrid from '@/components/common/logo-grid';
import { validatePhoneNumber } from '@/utils/phoneValidation';

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const inputVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 250,
      damping: 20,
      duration: 0.7,
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.4,
    },
  },
};

const verificationVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 250,
      damping: 20,
      delay: 0.3,
      duration: 0.7,
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.4,
    },
  },
};

const registerSchema = z.object({
  email: z.string().email('Please enter a valid email address').optional(),
  phone: z.string().refine(validatePhoneNumber, {
    message: 'Please enter a valid phone number',
  }).optional(),
  verificationCode: z.string().min(6, 'Please enter the 6-digit code').optional(),
  fullName: z.string().min(2, 'Full name must be at least 2 characters').optional(),
  academicYear: z.enum(['1', '2', '3', '4', '5']).optional(),
  admissionNumber: z.string().min(5, 'Admission number must be at least 5 characters').optional(),
  password: z.string().min(8, 'Password must be at least 8 characters').optional(),
  confirmPassword: z.string().min(8, 'Confirm password must be at least 8 characters').optional(),
  domain: z.string().min(1, 'Please select a domain').optional(),
  resume: z.any().refine((file) => !file || file instanceof File, 'Please upload a file').optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export default function RegisterPage() {
  const router = useRouter();
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [isVerifying, setIsVerifying] = useState(false);
  const [registrationData, setRegistrationData] = useState<{ email?: string; phone?: string }>({});
  const [isResending, setIsResending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      phone: '',
      verificationCode: '',
      fullName: '',
      academicYear: '',
      admissionNumber: '',
      password: '',
      confirmPassword: '',
      domain: '',
      resume: null,
    },
  });

  async function onSubmit(values: any) {
    if (!isVerifying) {
      // Store the registration data and show verification form
      setRegistrationData(values);
      setIsVerifying(true);
      form.reset({ verificationCode: '' });
    } else {
      // Verify OTP and redirect to onboarding
      try {
        setIsLoading(true);
        // Here you would verify the OTP with your backend
        console.log('Verifying OTP:', values.verificationCode);
        // If verification is successful, redirect to onboarding
        router.push('/register/onboarding');
      } catch (error) {
        console.error('Verification failed:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }

  const switchMethod = () => {
    if (!isVerifying) {
      const newMethod = method === 'email' ? 'phone' : 'email';
      setMethod(newMethod);
      form.reset({ [newMethod]: '' });
    }
  };

  const handleBack = () => {
    setIsVerifying(false);
    // Pre-fill the form with the previous value
    if (registrationData.email) {
      setMethod('email');
      form.setValue('email', registrationData.email);
    } else if (registrationData.phone) {
      setMethod('phone');
      form.setValue('phone', registrationData.phone);
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
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mb-6 flex items-center justify-between gap-4"
            >
              <motion.h1
                variants={itemVariants}
                className="text-heading-1 font-medium text-gray-900"
              >
                {isVerifying ? `Verify your ${method}` : "Register to Recruitments'25"}
              </motion.h1>
              <motion.div variants={itemVariants}>
                <Image src="/gdg-logo.svg" height={40} width={40} alt="GDG Logo" />
              </motion.div>
            </motion.div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <AnimatePresence mode="wait">
                  {!isVerifying ? (
                    <motion.div
                      key="input"
                      variants={inputVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
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
                  ) : (
                    <motion.div
                      key="verification"
                      variants={verificationVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <div className="space-y-6">
                        <div className="min-w-[400px] max-w-[500px] text-sm text-muted-foreground">
                          We've sent a code to{' '}
                          <span className="font-medium text-gray-900">
                            {registrationData.email || registrationData.phone}{' '}
                            <Button
                              variant="link"
                              className="h-auto border p-1"
                              onClick={handleBack}
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
                </AnimatePresence>
                <Button
                  type="submit"
                  className="h-11 w-full border bg-btn-primary tracking-wide hover:bg-indigo-600"
                  disabled={isLoading}
                >
                  {isLoading ? 'Please wait...' : 'Continue'}
                </Button>
                {isVerifying && (
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
                {!isVerifying && (
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
              </form>
            </Form>
          </div>
          <div className="mt-[33px] bg-gray-medium p-4 text-center text-sm text-black">
            Already registered?{' '}
            <a href="/login" className="font-medium text-[#6366f1] underline hover:text-[#5558e7]">
              Log In
            </a>
          </div>
        </motion.div>
      </TooltipProvider>
    </LogoGrid>
  );
}
