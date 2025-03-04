'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form } from '@/components/ui/form';
import FormInput from '@/components/common/form-input';
import { Button } from '@/components/ui/button';
import { postApi } from '@/api/api';
import { apiEndPoints } from '@/api/apiEndpoints';
import { handleToastApiResponse } from '@/lib/helpers';

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email'),
});

export const EmailStep = () => {
  const form = useForm<{ email: string }>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof emailSchema>) => {
    const requestData = {
      email: data.email,
    };

    const { status, data: responseData } = await postApi(
      apiEndPoints.users.requestPasswordReset,
      requestData,
    );

    handleToastApiResponse(status, responseData);
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
