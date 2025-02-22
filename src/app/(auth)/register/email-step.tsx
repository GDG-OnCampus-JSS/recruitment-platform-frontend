import { useEffect } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import FormInput from '@/components/common/form-input';
import { Button } from '@/components/ui/button';
import { postApi } from '@/api/api';
import { apiEndPoints } from '@/api/apiEndpoints';
import { statusCode } from '@/constants/apiStatus';
import { useSessionStorage } from '@/hooks/use-session-storage';

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
  const { setSessionData } = useSessionStorage();

  useEffect(() => {
    if (initialValue) {
      form.setValue('email', initialValue);
    }
  }, [initialValue, form]);

  const onSubmit = async (data: EmailFormValues) => {
    onSuccess(data);

    const { status, data: responseData } = await postApi(apiEndPoints.users.registerEmail, data);
    if (status === statusCode.Ok200) {
      console.log('Response:', responseData);
      setSessionData('email', data.email);
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
        <Button type="submit" className="h-11 w-full bg-btn-primary hover:bg-indigo-600">
          Continue
        </Button>
      </form>
    </Form>
  );
};
