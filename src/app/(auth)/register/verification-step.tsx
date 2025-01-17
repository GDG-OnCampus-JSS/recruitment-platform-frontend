import { useEffect } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import OTPInput from '@/components/common/otp-input';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';

interface VerificationStepProps {
  method: 'email' | 'phone';
  data: {
    email?: string;
    phone?: string;
  };
  next: () => void;
  onEdit: () => void;
}

const verificationSchema = z.object({
  otp: z.string().length(6, 'Please enter a valid 6-digit verification code'),
});

type VerificationFormValues = z.infer<typeof verificationSchema>;

export const VerificationStep = ({ method, data, next, onEdit }: VerificationStepProps) => {
  const form = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      otp: '',
    },
  });

  // Reset form when method changes
  useEffect(() => {
    form.reset();
  }, [method, form]);

  const onSubmit = async (values: VerificationFormValues) => {
    console.log('Submitted OTP', values.otp);
    next();
  };

  const contactValue = method === 'email' ? data.email : data.phone;

  return (
    <div className="space-y-6">
      <div className="min-w-[300px] max-w-[500px] text-sm text-muted-foreground">
        We've sent a code to{' '}
        <span className="font-medium text-gray-900">
          {contactValue}{' '}
          <Button 
            variant="link" 
            className="h-auto border p-1" 
            onClick={(e) => {
              e.preventDefault();
              onEdit();
            }}
          >
            <Pencil className="h-3 w-3" />
          </Button>
        </span>{' '}
        . Please enter to verify
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <OTPInput
            value={form.watch('otp')}
            onChange={(otp) => form.setValue('otp', otp, { shouldValidate: true })}
            isAsterisk
            validationError={form.formState.errors.otp?.message}
            length={6}
          />

          <div>
            <Button className="w-full h-11" variant="outline">Resend code</Button>
            <Button type="submit" className="mt-2 w-full bg-btn-primary h-11 hover:bg-indigo-600">
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
