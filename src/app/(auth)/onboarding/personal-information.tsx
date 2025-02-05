import { Form } from '@/components/ui/form';
import { validatePhoneNumber } from '@/utils/phoneValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import FormInput from '@/components/common/form-input';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';

const personalInfoSchema = z
  .object({
    fullname: z.string().min(3, 'Full name should be at least 3 characters'),
    phone: z.string().refine(validatePhoneNumber, {
      message: 'Please enter a valid phone number',
    }),
    password: z.string().min(8, 'Password should be minimum 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ['confirmPassword'],
  });

type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;

interface Props {
  initialValues?: {
    fullname?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
  };
  onSuccess: (values: PersonalInfoFormValues) => void;
}

export const PersonalInformation = ({ initialValues, onSuccess }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullname: initialValues?.fullname || '',
      phone: initialValues?.phone || '',
      password: initialValues?.password || '',
      confirmPassword: initialValues?.confirmPassword || '',
    },
  });

  useEffect(() => {
    if (initialValues) {
      Object.entries(initialValues).forEach(([key, value]) => {
        if (value) {
          form.setValue(key as keyof PersonalInfoFormValues, value);
        }
      });
    }
  }, [initialValues, form]);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSuccess)} className="space-y-4">
          <FormInput
            name="fullname"
            label="Full Name"
            placeholder="Enter your full name"
            isAsterisk
          />
          <div className="relative">
            <FormInput
              name="phone"
              label="Phone Number"
              placeholder="Enter your phone number"
              className="pl-14"
              isAsterisk
            />
            <div className="absolute left-3 top-[36px] cursor-not-allowed text-sm">
              + 91
              <span className="ml-2 text-gray-light">|</span>
            </div>
          </div>
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
              placeholder="Confirm your password"
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
            Next
          </Button>
        </form>
      </Form>
    </div>
  );
};
