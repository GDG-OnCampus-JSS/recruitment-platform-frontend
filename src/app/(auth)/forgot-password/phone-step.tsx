'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form } from '@/components/ui/form';
import FormInput from '@/components/common/form-input';
import { Button } from '@/components/ui/button';
import { validatePhoneNumber } from '@/utils/phoneValidation';
import { postApi } from '@/api/api';
import { apiEndPoints } from '@/api/apiEndpoints';
import { statusCode } from '@/constants/apiStatus';

const phoneSchema = z.object({
  phone: z.string().refine(validatePhoneNumber, {
    message: 'Please enter a valid phone number',
  }),
});

interface PhoneStepProps {
  initialValue?: string;
  onSuccess: (values: { phone: string }) => void;
}

export const PhoneStep = ({ initialValue, onSuccess }: PhoneStepProps) => {
  const form = useForm<{ phone: string }>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: initialValue || '',
    },
  });

  const onSubmit = async (data: z.infer<typeof phoneSchema>) => {
    onSuccess({ phone: data.phone });

    const { status, data: responseData } = await postApi(apiEndPoints.users.verifyPhone, data);

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
              name="phone"
              label="Phone Number"
              placeholder="Enter your phone number"
              isAsterisk
              className="pl-14"
            />
            <div className="absolute left-3 top-[36px] text-sm">
              + 91
              <span className="ml-2 text-gray-light">|</span>
            </div>
          </div>
          <Button type="submit" className="h-11 w-full bg-btn-primary hover:bg-indigo-600">
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
};
