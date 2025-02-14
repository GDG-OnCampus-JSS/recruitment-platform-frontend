'use client';
import { useState, useEffect, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form } from '@/components/ui/form';
import FormInput from '@/components/common/form-input';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogHeader } from '@/components/ui/dialog';
import { useAuthStore } from '@/context/authContext';
import { SocialLink, EditProfileProps } from '@/lib/types';
import { yearOptions, domainOptions, SOCIAL_PLATFORMS } from '@/lib/options';
import PasswordModal from '@/components/dashboardlayout/password-modal';
import { profileService } from '@/context/profileContext';
import { PencilLine,Upload,X } from 'lucide-react';
import OptionsSelect from '@/components/common/options-select';
import { validatePhoneNumber } from '@/utils/phoneValidation';
import { ApiRoutes } from '@/api/routes';
import { toast } from 'sonner';

const profileSchema = z.object({
  name: z.string().min(1, 'Full name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .min(10, 'Please enter a valid phone number')
    .refine((value) => validatePhoneNumber(value), {
      message: 'Invalid phone number',
    }),
  admissionNumber: z.string().min(1, 'Admission number is required'),
  domain: z.string().min(1, 'Domain is required'),
  year: z.string().min(1, 'Academic year is required'),
  photo: z.string().optional(),
  resume: z.string().optional(),
  ...SOCIAL_PLATFORMS.reduce(
    (acc, { platform }) => {
      const platformKey = platform.toLowerCase();
      return {
        ...acc,
        [platformKey]: z.string().url('Invalid URL').optional().or(z.literal('')),
      };
    },
    {} as Record<string, any>,
  ),
});

const EditProfilePage = ({isOpen, onClose }: EditProfileProps) => {
  const router = useRouter();
  const { user } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileImage, setProfileImage] = useState<string>('/DP.jpeg');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<'basic' | 'professional'>('basic');
  const userId = user?.id || 'dev-123';

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      admissionNumber: '',
      domain: '',
      year: '',
      photo: '',
      resume: '',
      ...SOCIAL_PLATFORMS.reduce(
        (acc, { platform }) => {
          acc[platform.toLowerCase()] = '';
          return acc;
        },
        {} as Record<string, string>,
      ),
    },
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const userData = await profileService.getUserProfile(userId);
        const socialLinks = (await profileService.getSocialLinks(userId)) || [];

        if (userData) {
          setProfileImage(userData.photo || '/DP.jpeg');
        }
        const socialLinksData = socialLinks.reduce(
          (acc: Record<string, string>, link: SocialLink) => ({
            ...acc,
            [link.name.toLowerCase()]: link.link,
          }),
          {},
        );

        form.reset({
          ...userData,
          ...socialLinksData,
        });
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };
    loadProfile();
  }, [userId, form]);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        form.setValue('photo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
      form.setValue('resume', file.name);
    }
  };

  const handleRemoveResume = () => {
    setResumeFile(null);
    form.setValue('resume', '');
    const fileInput = document.getElementById('resume-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

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

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    try {
      setIsSubmitting(true);
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      if (profileImageFile) formData.append('photo', profileImageFile);
      if (resumeFile) formData.append('resume', resumeFile);

      const response = await profileService.updateProfile(userId, formData);
      if (!response) {
        throw new Error('Profile update failed');
      }
      const existingSocialLinks: SocialLink[] = await profileService.getSocialLinks(userId);

      for (const { platform } of SOCIAL_PLATFORMS) {
        const platformLower = platform.toLowerCase();
        const newLink = values[platformLower as keyof typeof values];
        const existingLink = existingSocialLinks.find(
          (link) => link.name.toLowerCase() === platformLower,
        );

        if (existingLink && newLink) {
          await profileService.updateSocialLink(existingLink.id, newLink);
        } else if (!existingLink && newLink) {
          await profileService.createSocialLink(userId, platform, newLink);
        } else if (existingLink && !newLink) {
          await profileService.deleteSocialLink(existingLink.id);
        }
      }
      onClose();
      router.refresh();
    } catch (error) {
      console.error('Error saving changes:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen && !isPasswordModalOpen} onOpenChange={onClose}>
    <DialogContent className="max-h-[90vh] w-[400px] sm:w-[598px] overflow-y-auto scrollbar-none p-0">
      <DialogHeader className="p-4">
        <DialogTitle className="text-xl pl-2 sm:text-[28px] sm:pl-10 font-normal">
          Edit Profile
        </DialogTitle>
      </DialogHeader>

      <div className="flex flex-col items-center px-4 sm:px-6 pt-6">
        <div className="relative mb-6">
          <div className="relative h-24 w-24 sm:h-32 sm:w-32 overflow-hidden rounded-full">
            <Image
              src={profileImage}
              alt="Profile"
              layout="fill"
              objectFit="cover"
              className="sm:h-32 sm:w-32"
            />
          </div>
          <label
            className="absolute bottom-0 right-0 cursor-pointer"
            htmlFor="photo-upload"
          >
            <input
              type="file"
              id="photo-upload"
              className="hidden"
              onChange={handleImageUpload}
              accept="image/*"
            />
            <PencilLine className="h-6 w-6 sm:h-8 sm:w-8 bg-[#E7E7E7] p-1 rounded-[333px]" />
          </label>
        </div>

        <div className="mb-6 w-full sm:pl-2 sm:w-[470px] overflow-x-auto border-b">
          <div className="flex min-w-max">
            <Button
              type="button"
              variant="ghost"
              className={`flex rounded-none font-medium text-sm sm:text-base sm:w-[94px] border-b-[1px] px-4 sm:px-6 py-2 ${
                activeTab === 'basic'
                  ? 'border-[#100C2C]'
                  : 'border-transparent'
              }`}
              onClick={() => setActiveTab('basic')}
            >
              Basic Details
            </Button>
            <Button
              type="button"
              variant="ghost"
              className={`flex rounded-none font-medium text-sm sm:text-base sm:w-[152px] border-b-[1px] ml-4 sm:ml-6 py-2 ${
                activeTab === 'professional'
                  ? 'border-[#100C2C]'
                  : 'border-transparent'
              }`}
              onClick={() => setActiveTab('professional')}
            >
              Professional Identity
            </Button>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full px-4 sm:w-[518px] sm:pl-[10px]"
        >
          {activeTab === 'basic' ? (
            <div className="space-y-3">
              <FormInput
                name="name"
                label="Name"
                isAsterisk
                className="h-[76px] font-normal text-base"
              />
              <FormInput
                name="email"
                label="Email"
                isAsterisk
                className="h-[76px] font-normal text-base"
              />
              <FormInput
                name="phone"
                label="Phone no"
                isAsterisk
                className="h-[76px] font-normal text-base"
              />
              <OptionsSelect
                label="Academic year"
                name="year"
                onSelectionChange={(value) => form.setValue('year', value)}
                options={yearOptions}
                placeholder="Select your year"
                isAsterisk
                className="font-normal text-base"
              />
              <FormInput
                name="admissionNumber"
                label="Admission number"
                isAsterisk
                className="h-[79px] font-normal text-base"
              />
            </div>
          ) : (
            <div className="space-y-3">
              <OptionsSelect
                label="Domain"
                name="domain"
                onSelectionChange={(value) => form.setValue('domain', value)}
                options={domainOptions}
                placeholder="Select your domain"
                isAsterisk
                className="font-normal text-base"
              />

              <div className="space-y-3">
                <label className="text-base font-medium">
                  Upload Resume (optional)
                </label>
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('resume-upload')?.click()}
                    className="w-full"
                  >
                    <Upload /> Select file
                  </Button>
                  <input
                    type="file"
                    id="resume-upload"
                    className="hidden"
                    onChange={handleResumeUpload}
                    accept=".pdf,.doc,.docx"
                  />
                </div>
                {resumeFile && (
                  <div className="flex items-center justify-between rounded-md border border-gray-200 p-2">
                    <span className="text-sm text-gray-600 truncate max-w-[200px]">
                      {resumeFile.name}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleRemoveResume}
                      className="h-8 w-8 p-0 hover:bg-gray-100"
                    >
                      <X className="h-4 w-4 text-gray-500" />
                    </Button>
                  </div>
                )}
              </div>

              {SOCIAL_PLATFORMS.map(({ platform }) => (
                <FormInput
                  key={platform}
                  name={platform.toLowerCase()}
                  label={`${platform} Profile (optional)`}
                  placeholder="Paste link here"
                  className="font-normal text-base text-[#000000]"
                />
              ))}
            </div>
          )}

          <div className="mt-6 flex flex-col items-center justify-between pt-3">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full my-2 bg-[#635BFF] font-medium text-base hover:text-white"
            >
              {isSubmitting ? 'Saving...' : 'Save changes'}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsPasswordModalOpen(true)}
              className="text-[#DB4437] w-full pb-4 font-medium text-base"
            >
              Change Password
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>

    <PasswordModal
      isOpen={isPasswordModalOpen}
      onOpenChange={setIsPasswordModalOpen}
      onSave={handleSavePassword}
    />
  </Dialog>
  );
};

export default EditProfilePage;
