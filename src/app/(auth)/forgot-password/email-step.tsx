'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form } from '@/components/ui/form';
import FormInput from '@/components/common/form-input';
import { Button } from '@/components/ui/button';

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email'),
});

interface EmailStepProps {
  initialValue?: string;
  onSubmit: (values: { email: string }) => void;
}

export const EmailStep = ({ initialValue, onSubmit }: EmailStepProps) => {
  const form = useForm<{ email: string }>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: initialValue || '',
    },
  });

  const handleSubmit = (values: { email: string }) => {
    onSubmit({ email: values.email });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormInput
            name="email"
            label="Email"
            placeholder="Enter your email"
            isAsterisk
          />
          <Button type="submit" className="h-11 w-full bg-btn-primary hover:bg-indigo-600">
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
};
