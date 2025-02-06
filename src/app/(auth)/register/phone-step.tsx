import * as z from 'zod';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { validatePhoneNumber } from '@/utils/phoneValidation';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import FormInput from '@/components/common/form-input';
import { Button } from '@/components/ui/button';
import { postApi } from '@/api/api';
import { apiEndPoints } from '@/api/apiEndpoints';
import { statusCode } from '@/constants/apiStatus';

const phoneSchema = z.object({
  phone: z.string().min(1, 'Phone number is required').refine(validatePhoneNumber, {
    message: 'Please enter a valid phone number',
  }),
});

type PhoneFormValues = z.infer<typeof phoneSchema>;

interface PhoneStepProps {
  onSuccess: (data: PhoneFormValues) => void;
  initialValue?: string;
}

export const PhoneStep = ({ onSuccess, initialValue }: PhoneStepProps) => {
  const form = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: initialValue || '',
    },
  });

  useEffect(() => {
    if (initialValue) {
      form.setValue('phone', initialValue);
    }
  }, [initialValue, form]);

  const onSubmit = async (data: PhoneFormValues) => {
    onSuccess(data);

    const { status, data: responseData } = await postApi(apiEndPoints.users.verifyPhone, data);
    if (status === statusCode.Ok200) {
      console.log('Response:', responseData);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="relative">
          <FormInput
            control={form.control}
            name="phone"
            type="tel"
            label="Phone Number"
            placeholder="Enter your Phone Number"
            className="pl-14"
            info="We'll send you a verification code to this phone number"
            isAsterisk
          />
          <div className="absolute left-3 top-[36px] cursor-not-allowed text-sm">
            + 91
            <span className="ml-2 text-gray-light">|</span>
          </div>
        </div>
        <Button type="submit" className="h-11 w-full bg-btn-primary hover:bg-indigo-600">
          Continue
        </Button>
      </form>
    </Form>
  );
};
