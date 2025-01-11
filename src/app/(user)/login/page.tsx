'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Phone, Mail } from 'lucide-react';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/common/form-input';
import { TooltipProvider } from '@/components/ui/tooltip';
import LogoGrid from '@/components/common/logo-grid';
import Link from 'next/link';
import { Icon } from '@iconify/react';

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

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number').optional(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export default function LoginPage() {
  const router = useRouter();
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      phone: '',
      password: '',
    },
  });

  async function onSubmit(values: any) {
    try {
      setIsLoading(true);
      // handle the login with your backend
      console.log('Logging in with:', values);
      // If login is successful, redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const switchMethod = () => {
    const newMethod = method === 'email' ? 'phone' : 'email';
    setMethod(newMethod);
    form.reset({ [newMethod]: '' });
  };

  return (
    <LogoGrid>
      <TooltipProvider>
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto mt-20 w-[500px] overflow-hidden rounded-[1rem] border-card bg-white shadow-card duration-300 hover:rounded-[1.5rem]"
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
                Welcome Back!
              </motion.h1>
              <motion.div variants={itemVariants}>
                <Link href="/">
                  <Image src="/gdg-logo.svg" height={40} width={40} alt="GDG Logo" />
                </Link>
              </motion.div>
            </motion.div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                      method === 'email' ? 'Enter your email address' : 'Enter your phone number'
                    }
                    isAsterisk
                    className={method === 'phone' ? 'pl-14' : ''}
                  />
                  {method === 'phone' && (
                    <div className="absolute left-3 top-[36px] text-sm">
                      <span>+ 91</span>
                      <span className="ml-2 text-gray-light">|</span>
                    </div>
                  )}
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
                  disabled={isLoading}
                >
                  {isLoading ? 'Please wait...' : 'Continue'}
                </Button>
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
              </form>
            </Form>
          </div>
          <div className="mt-[5px] bg-gray-extra-light p-4 text-center text-sm text-black">
            Don't have an account?{' '}
            <a
              href="/register"
              className="font-medium text-[#6366f1] underline hover:text-[#5558e7]"
            >
              Register Now
            </a>
          </div>
        </motion.div>
      </TooltipProvider>
    </LogoGrid>
  );
}
