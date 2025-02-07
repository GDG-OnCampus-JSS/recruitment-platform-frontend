'use client';
import { useState, useEffect, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form } from '@/components/ui/form';
import FormInput from '@/components/common/form-input';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuthStore } from '@/context/authContext';
import { SocialLink, SelectOptions } from '@/lib/types';
import { yearOptions, domainOptions, SOCIAL_PLATFORMS } from '@/lib/options';
import PasswordModal from '@/components/dashboardlayout/password-modal';
import { profileService } from '@/context/profileContext';
import { ArrowLeft } from 'lucide-react';
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

const EditProfilePage = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileImage, setProfileImage] = useState<string>('/DP.jpeg');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

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

      router.push('/dashboard/profile');
    } catch (error) {
      console.error('Error saving changes:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen space-y-6 p-2 pt-12">
      <div className="w-full">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between pt-4">
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="px- text=[#2F3B00] flex items-center gap-2 rounded-3xl border py-2 text-[16px] font-normal leading-5"
            >
              <ArrowLeft /> Back
            </Button>
          </Link>
          <h1 className="font-medium sm:text-xl">Your Profile</h1>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="max-w-[1120px] border border-gray-200">
            <CardContent className="p-4 sm:p-10">
              <div className="mx-auto w-full max-w-[1120px] space-y-8">
                {/* Personal Info */}
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
                  <div className="w-full sm:w-80">
                    <h2 className="text-[16px] font-medium leading-[19.41px] text-[#100C2C]">
                      About
                    </h2>
                    <p className="text-base font-normal text-gray-500">
                      Tell us about yourself so that we know who you are.
                    </p>
                  </div>

                  <div className="flex-1 space-y-6">
                    <div className="space-y-4">
                      <FormInput name="name" label="Full Name*" type="text" />

                      <div className="mt-4">
                        <label
                          htmlFor="photo"
                          className="flex cursor-pointer flex-col items-center gap-4 sm:flex-row"
                        >
                          <div className="relative h-[75px] w-[75px] overflow-hidden rounded-full">
                            <Image
                              src={profileImage}
                              alt="Profile"
                              layout="fill"
                              objectFit="cover"
                            />
                            <input
                              type="file"
                              id="photo"
                              className="hidden"
                              onChange={handleImageUpload}
                              accept="image/*"
                            />
                          </div>
                          <span className="mt-2 border border-[#DDE3FF] p-3 text-[#100C2C] sm:mt-0">
                            Upload a new photo
                          </span>
                        </label>
                      </div>

                      <div className="space-y-4">
                        <FormInput name="email" label="Email address*" type="text" />

                        <FormInput name="phone" label="Phone Number*" type="text" />

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <OptionsSelect
                            label="Academic year*"
                            value={form.watch('year')}
                            onSelectionChange={(value) => form.setValue('year', value)}
                            options={yearOptions}
                            placeholder="Select your year"
                          />

                          <FormInput name="admissionNumber" label="Admission number*" type="text" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center py-1">
                  <div className="w-full border-b border-[#DDE3FF]"></div>
                </div>

                {/* Professional Section */}
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
                  <div className="w-full sm:w-80">
                    <h2 className="text-[16px] font-medium leading-[19.41px] text-black">
                      Professional Identity
                    </h2>
                    <p className="text-gray-500">
                      Sharing more details about yourself will help you stand out more.
                    </p>
                  </div>

                  <div className="flex-1 space-y-6">
                    <OptionsSelect
                      label="Domain*"
                      value={form.watch('domain')}
                      onSelectionChange={(value) => form.setValue('domain', value)}
                      options={domainOptions}
                      placeholder="Select your domain"
                    />

                    <div className="mt-4">
                      <label
                        htmlFor="resume-upload"
                        className="flex cursor-pointer flex-col items-center gap-4 sm:flex-row"
                      >
                        <div className="relative h-[160px] w-[265px] overflow-hidden rounded-[8px] border">
                          <Image src="/" alt="RESUME" layout="fill" objectFit="cover" />
                          <input
                            type="file"
                            id="resume-upload"
                            className="hidden"
                            accept=".pdf,.doc,.docx"
                            onChange={handleResumeUpload}
                          />
                        </div>
                        <span className="mt-2 border border-[#DDE3FF] p-3 text-[#100C2C] sm:mt-0">
                          Re-Upload Resume
                        </span>
                      </label>
                    </div>

                    {SOCIAL_PLATFORMS.map(({ platform }) => (
                      <FormInput
                        key={platform}
                        name={platform.toLowerCase()}
                        label={`${platform} Link (optional)`}
                        type="url"
                        placeholder="Paste link here"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mx-auto flex max-w-[1120px] flex-col items-center justify-between gap-4 px-4 pt-8 sm:flex-row sm:px-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsPasswordModalOpen(true)}
              className="w-full border-[#635BFF] px-6 text-[#635BFF] hover:bg-[#635BFF] hover:text-white sm:w-auto"
            >
              Change password
            </Button>
            <Button
              type="submit"
              className="w-full bg-[#635BFF] px-6 text-white hover:bg-[#635BFF]/90 sm:w-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Form>

      <PasswordModal
        isOpen={isPasswordModalOpen}
        onOpenChange={setIsPasswordModalOpen}
        onSave={handleSavePassword}
      />
    </div>
  );
};

export default EditProfilePage;
