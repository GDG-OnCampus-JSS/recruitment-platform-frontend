import { useEffect } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { OTPInput } from '@/components/common/form-otp';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { postApi } from '@/api/api';
import { apiEndPoints } from '@/api/apiEndpoints';
import { statusCode } from '@/constants/apiStatus';

interface VerificationStepProps {
  method: 'email' | 'phone';
  data: {
    email?: string;
    phone?: string;
  };
  next: (values: { verificationCode: string }) => void;
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
    const data = {
      email: contactValue,
      otp: parseInt(values.otp),
    };

    const { status, data: responseData } = await postApi(apiEndPoints.users.verifyEmail, {
      data,
    });

    if (status === statusCode.Ok200) {
      console.log('Response:', responseData);
    }
  };

  const resendOtpToEmail = async () => {
    const reqData = {
      email: data.email,
    };
    const { status, data: responseData } = await postApi(apiEndPoints.users.registerEmail, {
      reqData,
    });

    if (status === statusCode.Ok200) {
      console.log('Response:', responseData);
    }
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
          <OTPInput className="w-96" name="otp" isAsterisk />

          <div>
            <Button className="h-11 w-full" variant="outline" onClick={resendOtpToEmail}>
              Resend code
            </Button>
            <Button type="submit" className="mt-2 h-11 w-full bg-btn-primary hover:bg-indigo-600">
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
