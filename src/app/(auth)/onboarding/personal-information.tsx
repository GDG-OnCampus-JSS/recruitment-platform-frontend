import { Form } from '@/components/ui/form';
import { validatePhoneNumber } from '@/utils/phoneValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import FormInput from '@/components/common/form-input';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { checkIfObjectNotEmpty } from '@/lib/helpers';

const personalInfoSchema = z
  .object({
    name: z.string().min(3, 'Full name should be at least 3 characters'),
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
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  nextStep: () => void;
}

export const PersonalInformation = ({ formData, setFormData, nextStep }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: checkIfObjectNotEmpty(formData)
      ? { ...formData, phone: formData?.phone?.replace(/^\+91/, '') }
      : {
          name: '',
          phone: '',
          password: '',
          confirmPassword: '',
        },
  });

  const handleSubmit = (values: PersonalInfoFormValues) => {
    const modifiedValues = {
      ...values,
      phone: `+91${values.phone}`,
    };
    setFormData((prev: any) => ({ ...prev, ...modifiedValues }));
    nextStep();
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormInput name="name" label="Full Name" placeholder="Enter your full name" isAsterisk />
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
