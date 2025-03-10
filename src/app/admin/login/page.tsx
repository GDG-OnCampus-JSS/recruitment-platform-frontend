'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { postApi } from '@/api/api';
import { apiEndPoints } from '@/api/apiEndpoints';
import { AuthCard } from '@/components/common/auth-card';
import FormInput from '@/components/common/form-input';
import LogoGrid from '@/components/common/logo-grid';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { statusCode } from '@/constants/apiStatus';
import { useSessionStorage } from '@/hooks/use-session-storage';

export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { setSessionData } = useSessionStorage();
  const router = useRouter();

  const adminLoginSchema = z.object({
    email: z.string().email('Please entear a valid email address!'),
    password: z.string().min(1, 'Password is required!'),
  });

  const form = useForm<z.infer<typeof adminLoginSchema>>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof adminLoginSchema>) => {
    const { status, data: responseData } = await postApi(apiEndPoints.users.login, data);

    if (status === statusCode.Ok200) {
      console.log('Response:', responseData);
      setSessionData('admin', data);
      router.push('/admin/dashboard');
    }
  };

  return (
    <LogoGrid>
      <AuthCard>
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-6 flex items-center justify-between gap-32"
        >
          <motion.h1 variants={itemVariants} className="text-heading-1 font-medium text-gray-900">
            Admin login!
          </motion.h1>
          <motion.div variants={itemVariants}>
            <Link href="/">
              <Image src="/gdg-logo.svg" height={40} width={40} alt="GDG Logo" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Main */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <motion.div>
              <FormInput
                name="email"
                type="string"
                label="Email"
                placeholder="Enter your email"
                isAsterisk
              />
            </motion.div>
            <div className="relative">
              <FormInput
                name="password"
                type={showPassword ? 'string' : 'password'}
                label="Password"
                placeholder="Enter your email"
                isAsterisk
              />
              <Icon
                icon={showPassword ? 'fluent:eye-16-regular' : 'fluent:eye-off-16-regular'}
                height="24"
                width="24"
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-neutral-700"
                onClick={() => setShowPassword(!showPassword)}
              />
              <div className="mt-2 flex justify-end">
                <Link href="/forgot-password" className="text-sm text-btn-primary">
                  Forgot Password?
                </Link>
              </div>
            </div>
            <Button
              type="submit"
              className="h-11 w-full border bg-btn-primary tracking-wide hover:bg-indigo-600"
            >
              Submit
            </Button>
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
