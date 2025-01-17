import { useEffect } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import FormInput from '@/components/common/form-input';
import { Button } from '@/components/ui/button';

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type EmailFormValues = z.infer<typeof emailSchema>;

interface EmailStepProps {
  onSuccess: (data: EmailFormValues) => void;
  initialValue?: string;
}

export const EmailStep = ({ onSuccess, initialValue }: EmailStepProps) => {
  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: initialValue || '',
    },
  });

  useEffect(() => {
    if (initialValue) {
      form.setValue('email', initialValue);
    }
  }, [initialValue, form]);

  const onSubmit = async (data: EmailFormValues) => {
    try {
      onSuccess(data);
    } catch (error) {
      console.error('Error submitting email:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          control={form.control}
          name="email"
          type="text"
          label="Email"
          placeholder="Enter your email address"
          info="We'll send you a verification code to this email"
          isAsterisk
        />
        <Button type='submit' className='w-full bg-btn-primary h-11 hover:bg-indigo-600'>Continue</Button>
      </form>
    </Form>
  );
};
