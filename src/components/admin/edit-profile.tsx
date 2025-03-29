'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { PencilLine, X } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { ApiRoutes } from '@/api/routes';
import FormInput from '@/components/common/form-input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useAuthStore } from '@/context/authContext';
import { User } from '@/lib/types';
import PasswordModal from '../dashboardlayout/password-modal';

interface EditProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userData: User;
  onSubmit: (values: z.infer<typeof profileSchema>) => Promise<void>;
}

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  domain: z.string().min(1, 'Domain is required'),
});

export default function EditProfileDialog({
  isOpen,
  onClose,
  userData,
  onSubmit,
}: EditProfileDialogProps) {
  const [profileImage, setProfileImage] = useState(userData?.photo || '/avatar.jpg');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: userData?.name || '',
      email: userData?.email || '',
      phone: userData?.phone || '',
      domain: userData?.domain || '',
    },
  });

  useEffect(() => {
    if (userData) {
      form.reset({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        domain: userData.domain,
      });
      setProfileImage(userData.photo || '/avatar.jpg');
    }
  }, [userData, form]);

  const handleSavePassword = async (passwords: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      if (passwords.newPassword !== passwords.confirmPassword) {
        toast.error('New password and confirm password do not match');
        return;
      }
      const { user } = useAuthStore.getState();

      const token = user?.token;
      if (!token) {
        toast.error('Authentication required');
        return;
      }
      const { status, data } = await ApiRoutes.resetPassword({
        token,
        newPassword: passwords.newPassword,
      });

      if (status === 200) {
        toast.success('Password updated successfully');
        setIsPasswordModalOpen(false);
      } else {
        toast.error(data?.message || 'Failed to update password');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error('An error occurred while updating the password');
    }
  };

  const handleSubmit = async (values: z.infer<typeof profileSchema>) => {
    await onSubmit(values);
    onClose();
  };

  return (
    <div>
      <Dialog open={isOpen && !isPasswordModalOpen} onOpenChange={onClose}>
        <DialogContent className="w-[350px] sm:w-[598px]">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-normal">Edit Profile</DialogTitle>
            </div>
          </DialogHeader>

          <div className="flex justify-center py-4">
            <div className="relative mb-6">
              <div className="relative h-32 w-32 overflow-hidden rounded-full">
                <Image
                  src={profileImage}
                  alt="Profile"
                  layout="fill"
                  objectFit="cover"
                  className="h-32 w-32"
                />
              </div>
              <div className="absolute bottom-0 right-0 cursor-pointer">
                <PencilLine className="h-8 w-8 rounded-[333px] bg-[#E7E7E7] p-[5px]" />
              </div>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormInput name="name" label="Name" type="text" />
              <FormInput name="email" label="Email" type="text" />
              <FormInput name="phone" label="Phone no" type="text" />
              <FormInput name="domain" label="Domain" type="text" />

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="ghost"
                  className="h-auto p-0 text-base font-medium text-[#DB4437]"
                  onClick={() => setIsPasswordModalOpen(true)}
                >
                  Change Password
                </Button>

                <Button type="submit" className="rounded-[6px] bg-[#635BFF] px-5 py-3">
                  Save changes
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <PasswordModal isOpen={isPasswordModalOpen} setIsOpen={setIsPasswordModalOpen} />
    </div>
  );
}
