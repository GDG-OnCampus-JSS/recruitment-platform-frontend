'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form } from '@/components/ui/form';
import FormInput from '@/components/common/form-input';
import { Button } from '@/components/ui/button';
import { postApi } from '@/api/api';
import { apiEndPoints } from '@/api/apiEndpoints';
import { statusCode } from '@/constants/apiStatus';

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email'),
});

interface EmailStepProps {
  initialValue?: string;
  onSuccess: (values: { email: string }) => void;
}

export const EmailStep = ({ initialValue, onSuccess }: EmailStepProps) => {
  const form = useForm<{ email: string }>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: initialValue || '',
    },
  });

  const onSubmit = async (data: z.infer<typeof emailSchema>) => {
    onSuccess({ email: data.email });

    const { status, data: responseData } = await postApi(apiEndPoints.users.verifyEmail, data.email);

    if (status === statusCode.Ok200) {
      console.log('Response:', responseData);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormInput name="email" label="Email" placeholder="Enter your email" isAsterisk />
          <Button type="submit" className="h-11 w-full bg-btn-primary hover:bg-indigo-600">
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
};
