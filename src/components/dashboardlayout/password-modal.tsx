import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import FormInput from '@/components/common/form-input';
import useUserStore from '@/stores/userStore';
import { postApi } from '@/api/api';
import { apiEndPoints } from '@/api/apiEndpoints';
import { handleToastApiResponse } from '@/lib/helpers';
import { statusCode } from '@/constants/apiStatus';
import { Form } from '../ui/form';
import { X } from 'lucide-react';

const passwordSchema = z
  .object({
    oldPassword: z.string().min(8, 'Old password must be at least 8 characters'),
    newPassword: z.string().min(8, 'New password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Confirm password must be at least 8 characters'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match!",
    path: ['confirmPassword'],
  });

export interface PasswordModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const PasswordModal = ({ isOpen, setIsOpen }: PasswordModalProps) => {
  const user = useUserStore((state) => state.user);

  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof passwordSchema>) => {
    const payLoad = {
      email: user?.email,
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };

    const { status, data } = await postApi(
      apiEndPoints.users.resetPasswordWithOldPassword,
      payLoad,
    );

    handleToastApiResponse(status, data);

    if (status === statusCode.Ok200) setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <DialogContent className="w-[82vw] sm:max-w-[598px] [&>button]:hidden">
        <DialogHeader className="flex flex-row justify-between">
          <DialogTitle className="text-xl font-normal sm:text-[28px]">Change Password</DialogTitle>
          <DialogClose onClick={() => setIsOpen(false)}>
            <X size={24} />
          </DialogClose>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormInput
              name="oldPassword"
              type="password"
              label="Old Password"
              placeholder="••••••••••••"
            />
            <FormInput
              name="newPassword"
              type="password"
              label="New Password"
              placeholder="••••••••••••"
            />
            <FormInput
              name="confirmPassword"
              type="password"
              label="Confirm New Password"
              placeholder="••••••••••••"
            />
            <Button type="submit" className="w-full bg-[#635BFF] text-white hover:bg-[#635BFF]/90">
              Save Password
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordModal;
