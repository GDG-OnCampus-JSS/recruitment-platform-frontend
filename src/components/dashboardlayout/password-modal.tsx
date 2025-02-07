import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PasswordModalProps } from '@/lib/types';
import FormInput from '@/components/common/form-input';

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

const PasswordModal = ({ isOpen, onOpenChange, onSave }: PasswordModalProps) => {
  const methods = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    mode: 'onSubmit',
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: z.infer<typeof passwordSchema>) => {
    onSave(data);
    onOpenChange(false);
    methods.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[82vw] sm:max-w-[598px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Change Password</DialogTitle>
            <Button variant="ghost" className="h-6 w-6 p-0" onClick={() => onOpenChange(false)} />
          </div>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4 py-4">
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
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordModal;
