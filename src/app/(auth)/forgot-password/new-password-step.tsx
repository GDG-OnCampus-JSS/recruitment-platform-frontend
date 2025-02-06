'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form } from '@/components/ui/form';
import FormInput from '@/components/common/form-input';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { postApi } from '@/api/api';
import { apiEndPoints } from '@/api/apiEndpoints';
import { statusCode } from '@/constants/apiStatus';

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

interface Props {
  initialValues?: {
    password?: string;
    confirmPassword?: string;
  };
  onSuccess: (values: NewPasswordFormValues) => void;
  onBack: () => void;
}

export const NewPasswordStep = ({ initialValues, onSuccess, onBack }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<NewPasswordFormValues>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: initialValues?.password || '',
      confirmPassword: initialValues?.confirmPassword || '',
    },
  });

  const onSubmit = async (data: NewPasswordFormValues) => {
    onSuccess(data);

    const { status, data: responseData } = await postApi(apiEndPoints.users.resetPassword, data);

    if (status === statusCode.Ok200) {
      console.log('Response:', responseData);
    }
  };

  return (
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

          <div className="space-y-2">
            <Button type="button" onClick={onBack} variant="outline" className="h-11 w-full">
              Back
            </Button>
            <Button type="submit" className="h-11 w-full bg-btn-primary hover:bg-indigo-600">
              Reset Password
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
