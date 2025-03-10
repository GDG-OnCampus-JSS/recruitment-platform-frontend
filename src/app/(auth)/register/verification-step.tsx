import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { postApi } from '@/api/api';
import { apiEndPoints } from '@/api/apiEndpoints';
import { OTPInput } from '@/components/common/form-otp';
import { Spinner } from '@/components/common/spinner';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { statusCode } from '@/constants/apiStatus';
import { useSessionStorage } from '@/hooks/use-session-storage';
import { useToast } from '@/hooks/use-toast';

interface VerificationStepProps {
  data: {
    email?: string;
  };
  next: () => void;
  onEdit: () => void;
}

const verificationSchema = z.object({
  otp: z.string().length(6, 'Please enter a valid 6-digit verification code'),
});

type VerificationFormValues = z.infer<typeof verificationSchema>;

export const VerificationStep = ({ data, next, onEdit }: VerificationStepProps) => {
  const [isResending, setIsResending] = useState<boolean>(false);
  const { toast } = useToast();
  // const { getSessionData } = useSessionStorage();
  const contactValue = data.email;

  const form = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      otp: '',
    },
  });

  const onSubmit = async (values: VerificationFormValues) => {
    const data = {
      email: contactValue,
      otp: parseInt(values.otp),
    };

    const { status, data: responseData } = await postApi(apiEndPoints.users.verifyEmail, data);

    if (status === statusCode.Ok200) {
      console.log('Response:', responseData);
      next();
    } else {
      toast({
        variant: 'destructive',
        title: 'Incorrect OTP',
      });
    }
  };

  const resendOtpToEmail = async () => {
    setIsResending(true);
    const reqData = {
      email: data.email,
    };
    const { status, data: responseData } = await postApi(apiEndPoints.users.registerEmail, reqData);

    if (status === statusCode.Ok200) {
      console.log('Response:', responseData);
      toast({
        variant: 'success',
        title: 'OTP Sent Successfully!',
        description:
          'A new OTP has been sent to your email. Please check your inbox and follow the instructions to proceed.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error Resending OTP!',
        description:
          'We encountered an issue while trying to resend your OTP. Please try again later or contact support if the problem persists.',
      });
    }
    setIsResending(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col text-sm leading-normal text-muted-foreground">
        <div className="flex items-center">
          <p className="mr-1"> We've sent a code to</p>
          <p className="font-medium text-gray-900">{contactValue}</p>
          <Button
            variant="ghost"
            className="ml-1 flex size-4 h-auto items-center gap-1 border"
            onClick={onEdit}
          >
            <Pencil className="size-1" />
          </Button>
        </div>
        <p>Please enter the code to verify</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <OTPInput className="w-96" name="otp" isAsterisk />
          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="h-11 w-full bg-btn-primary hover:bg-indigo-600"
            >
              {form.formState.isSubmitting ? <Spinner className="text-white" /> : 'Continue'}
            </Button>
            <Button
              type="button"
              onClick={resendOtpToEmail}
              className="h-11 w-full"
              variant="outline"
            >
              Resend code
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
