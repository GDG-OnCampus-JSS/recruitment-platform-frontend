'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/common/form-input';
import LogoGrid from '@/components/common/logo-grid';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { AuthCard } from '@/components/common/auth-card';
import { Divider } from '@/components/common/divider';
import { postApi } from '@/api/api';
import { apiEndPoints } from '@/api/apiEndpoints';
import { statusCode } from '@/constants/apiStatus';
import { useSessionStorage } from '@/hooks/use-session-storage';
import { useToast } from '@/hooks/use-toast';
import { Spinner } from '@/components/common/spinner';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address').optional(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { setSessionData } = useSessionStorage();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const { status, data: responseData } = await postApi(apiEndPoints.users.login, data);

    if (status === statusCode.Ok200) {
      console.log('Response:', responseData);
      setSessionData('user', data);
      router.push('/dashboard');
    } else {
      const errorMessage =
        Array.isArray(responseData?.errors) && responseData.errors.length > 0
          ? responseData.errors[0]
          : responseData?.message || 'Something went wrong. Please try again.';
      toast({
        variant: 'destructive',
        title: 'Authenctication Error',
        description: errorMessage,
      });
    }
  };

  // // toast for UI testing, do not push in production
  // useEffect(() => {
  //   // Trigger a permanent toast on mount for UI testing
  //   toast({
  //     variant: 'destructive',
  //     title: 'Permanent Toast',
  //     description: 'This toast is for UI testing and will not auto-dismiss.',
  //     duration: Infinity,
  //   });
  // }, [toast]);

  return (
    <LogoGrid>
      <AuthCard
        footer={{
          text: 'Register as a new user',
          linkText: 'Register',
          href: '/register',
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-6 flex items-center justify-between gap-32"
        >
          <motion.h1 variants={itemVariants} className="text-heading-1 font-medium text-gray-900">
            Welcome Back!
          </motion.h1>
          <motion.div variants={itemVariants}>
            <Link href="/">
              <Image src="/gdg-logo.svg" height={40} width={40} alt="GDG Logo" />
            </Link>
          </motion.div>
        </motion.div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, (errors) => {
              console.log('Form validation errors:', errors);
            })}
            className="space-y-4"
          >
            <motion.div
              key="input"
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative"
            >
              <FormInput
                name="email"
                type="text"
                label="Email"
                placeholder="Enter your Email Address"
                isAsterisk
              />
              <div className="mt-4 items-center">
                <div className="relative">
                  <FormInput
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    placeholder="Enter your password"
                    isAsterisk
                  />
                  <Icon
                    icon={showPassword ? 'fluent:eye-16-regular' : 'fluent:eye-off-16-regular'}
                    height="24"
                    width="24"
                    className="absolute right-4 top-9 cursor-pointer text-neutral-700"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </div>
                <div className="mt-2 flex items-center justify-end">
                  <Link
                    href="/forgot-password"
                    className="text-xs font-medium text-[#6366f1] hover:text-[#5558e7]"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
            </motion.div>
            <Button
              type="submit"
              className="h-11 w-full border bg-btn-primary tracking-wide hover:bg-indigo-600"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Spinner className="text-white" />
                </>
              ) : (
                'Submit'
              )}
            </Button>
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
            </div>
          </form>
        </Form>
      </AuthCard>
    </LogoGrid>
  );
}

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
