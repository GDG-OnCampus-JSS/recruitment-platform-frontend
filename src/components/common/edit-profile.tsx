'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { PencilLine, Upload, X } from 'lucide-react';
import Image from 'next/image';
import { useState, ChangeEvent, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { patchApi, postApi, uploadApi } from '@/api/api';
import { apiEndPoints } from '@/api/apiEndpoints';
import FormInput from '@/components/common/form-input';
import OptionsSelect from '@/components/common/options-select';
import { Spinner } from '@/components/common/spinner';
import PasswordModal from '@/components/dashboardlayout/password-modal';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogClose,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Progress } from '@/components/ui/progress';
import { statusCode } from '@/constants/apiStatus';
import { academicYearOptions, domainOptions } from '@/constants/registration';
import { blobUrl, extractBlobUrlSegment, handleToastApiResponse } from '@/lib/helpers';
import { SOCIAL_PLATFORMS } from '@/lib/options';
import { EditProfileProps } from '@/lib/types';
import useUserStore from '@/stores/userStore';
import { validatePhoneNumber } from '@/utils/phoneValidation';

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
  portfolio: z.string().url('Enter a correct url').or(z.literal('')).optional(),
  linkedin: z.string().url('Enter a correct url').or(z.literal('')).optional(),
  github: z.string().url('Enter a correct url').or(z.literal('')).optional(),
  dribble: z.string().url('Enter a correct url').or(z.literal('')).optional(),
  behance: z.string().url('Enter a correct url').or(z.literal('')).optional(),
  codechef: z.string().url('Enter a correct url').or(z.literal('')).optional(),
  other: z.string().url('Enter a correct url').or(z.literal('')).optional(),
  anyother: z.string().url('Enter a correct url').or(z.literal('')).optional(),
});

const EditProfilePage = ({ isOpen, onClose }: EditProfileProps) => {
  const user = useUserStore((state) => state.user);
  const updateUser = useUserStore((state) => state.updateUser);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<'basic' | 'professional'>('basic');
  const [openPasswordModal, setOpenPasswordModal] = useState(false);

  const [resumeUploadProgress, setResumeUploadProgress] = useState(0);

  const imageUploadRef = useRef<HTMLInputElement>(null);
  const resumeUploadRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      phone: user?.phone ?? '',
      admissionNumber: user?.admissionNumber ?? '',
      domain: user?.domain ?? '',
      year: user?.year?.toString() ?? '',
      photo: user?.photo ?? '',
      resume: user?.resume ?? '',
      portfolio: user?.socialLinks?.find((link) => link.name === 'portfolio')?.link ?? '',
      linkedin: user?.socialLinks?.find((link) => link.name === 'linkedin')?.link ?? '',
      github: user?.socialLinks?.find((link) => link.name === 'github')?.link ?? '',
      dribble: user?.socialLinks?.find((link) => link.name === 'dribble')?.link ?? '',
      behance: user?.socialLinks?.find((link) => link.name === 'behance')?.link ?? '',
      codechef: user?.socialLinks?.find((link) => link.name === 'codechef')?.link ?? '',
      other: user?.socialLinks?.find((link) => link.name === 'other')?.link ?? '',
      anyother: user?.socialLinks?.find((link) => link.name === 'other2')?.link ?? '',
    },
  });

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const { status, data } = await uploadApi(apiEndPoints.upload.uploadPhoto, file, 'photo');

      form.setValue('photo', extractBlobUrlSegment(data.url) || '');
      setProfileImageFile(file);

      handleToastApiResponse(status, data);
    }
  };

  const handleResumeUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const { status, data } = await uploadApi(
        apiEndPoints.upload.uploadResume,
        file,
        'resume',
        (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1),
          );
          setResumeUploadProgress(percentCompleted);
        },
      );

      form.setValue('resume', extractBlobUrlSegment(data.url) || '');
      setResumeFile(file);

      handleToastApiResponse(status, data);
    }
  };

  const handleRemoveResume = () => {
    setResumeFile(null);
    form.setValue('resume', '');
    const fileInput = resumeUploadRef.current;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    setIsSubmitting(true);

    const userUpdationData = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      admissionNumber: values.admissionNumber,
      domain: values.domain,
      year: values.year,
      photo: values.photo,
      resume: values.resume,
    };

    const userSocialLinksUpdationData = [
      { id: 'portfolio', name: 'portfolio', link: values.portfolio },
      { id: 'linkedin', name: 'linkedin', link: values.linkedin },
      { id: 'github', name: 'github', link: values.github },
      { id: 'dribble', name: 'dribble', link: values.dribble },
      { id: 'behance', name: 'behance', link: values.behance },
      { id: 'codechef', name: 'codechef', link: values.codechef },
      { id: 'other', name: 'other', link: values.other },
      { id: 'anyother', name: 'anyother', link: values.anyother },
    ].filter((link): link is { id: string; name: string; link: string } => !!link.link);

    const { status: userDataStatus, data: userData } = await patchApi(
      apiEndPoints.users.updateUserProfile,
      userUpdationData,
    );

    handleToastApiResponse(userDataStatus, userData, 'Profile updated successfully.');
    updateUser({ ...user, ...userUpdationData });

    if (userDataStatus !== statusCode.Ok200) {
      handleToastApiResponse(userDataStatus, userData, 'Failed to update profile.');
    }

    if (userSocialLinksUpdationData.length > 0) {
      const { status: socialLinksStatus, data: socialLinksData } = await postApi(
        `${apiEndPoints.users.updateSocialLinks}${user?.id}`,
        { socialLinks: userSocialLinksUpdationData },
      );

      handleToastApiResponse(
        socialLinksStatus,
        socialLinksData,
        'Social links updated successfully.',
      );
      updateUser({ ...user, socialLinks: userSocialLinksUpdationData });
    }

    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] w-[400px] min-w-max overflow-y-auto rounded-lg p-10 pb-8 scrollbar-none sm:w-[598px] [&>button]:hidden">
        <DialogHeader className="flex flex-row justify-between">
          <DialogTitle className="text-xl font-normal leading-[1em] sm:text-[28px]">
            Edit Profile
          </DialogTitle>
          <DialogClose onClick={onClose}>
            <X size={24} />
          </DialogClose>
        </DialogHeader>

        <div className="flex flex-col items-center pt-6">
          <div className="relative mb-6">
            <div className="relative h-24 w-24 overflow-hidden rounded-full sm:h-32 sm:w-32">
              <Image
                src={
                  user?.photo
                    ? blobUrl(user.photo)
                    : profileImageFile
                      ? URL.createObjectURL(profileImageFile)
                      : '/avatar.svg'
                }
                alt="Profile"
                width={128}
                height={128}
                className="object-cover sm:h-32 sm:w-32"
              />
            </div>
            <div className="absolute bottom-0 right-0 cursor-pointer">
              <input
                title="photo upload"
                type="file"
                id="photo-upload"
                className="hidden"
                onChange={handleImageUpload}
                ref={imageUploadRef}
                accept="image/*"
              />
              <PencilLine
                className="h-6 w-6 rounded-[333px] bg-[#E7E7E7] p-1 sm:h-8 sm:w-8"
                onClick={() => imageUploadRef.current?.click()}
              />
            </div>
          </div>

          <div className="mb-6 w-full overflow-x-auto border-b">
            <div className="flex min-w-max">
              <Button
                type="button"
                variant="ghost"
                className={`flex rounded-none border-b-[1px] px-4 py-2 text-sm font-medium sm:w-[94px] sm:px-6 sm:text-base ${
                  activeTab === 'basic' ? 'border-[#100C2C]' : 'border-transparent'
                }`}
                onClick={() => setActiveTab('basic')}
              >
                Basic Details
              </Button>
              <Button
                type="button"
                variant="ghost"
                className={`ml-4 flex rounded-none border-b-[1px] py-2 text-sm font-medium sm:ml-6 sm:w-[152px] sm:text-base ${
                  activeTab === 'professional' ? 'border-[#100C2C]' : 'border-transparent'
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
              <div className="space-y-4">
                <FormInput
                  name="name"
                  label="Name"
                  isAsterisk
                  className="h-[76px] text-base font-normal"
                />
                <FormInput
                  name="email"
                  label="Email"
                  isAsterisk
                  className="h-[76px] text-base font-normal"
                />
                <FormInput
                  name="phone"
                  label="Phone no"
                  isAsterisk
                  className="h-[76px] text-base font-normal"
                />
                <OptionsSelect
                  name="year"
                  label="Academic Year"
                  placeholder="Select your academic year"
                  isAsterisk
                  options={academicYearOptions}
                />
                <FormInput
                  name="admissionNumber"
                  label="Admission number"
                  isAsterisk
                  className="h-[79px] text-base font-normal"
                />
                <OptionsSelect
                  name="domain"
                  label="Domain"
                  placeholder="Select your domain"
                  isAsterisk
                  options={domainOptions}
                />
              </div>
            ) : (
              <div className="space-y-3">
                <div className="space-y-3">
                  <label className="text-base font-medium">Upload Resume (optional)</label>
                  <div className="flex items-center space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => resumeUploadRef.current?.click()}
                      className="w-full"
                    >
                      <Upload /> Select file
                    </Button>
                    <input
                      title="resume upload"
                      type="file"
                      id="resume-upload"
                      className="hidden"
                      onChange={handleResumeUpload}
                      ref={resumeUploadRef}
                      accept=".pdf"
                    />
                  </div>
                  {resumeFile && (
                    <div className="flex flex-col items-center justify-between gap-3 rounded-md border border-gray-200 px-4 py-3">
                      <div className="flex w-full items-center justify-between">
                        <span className="max-w-[200px] truncate text-sm text-gray-600">
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
                      <Progress value={resumeUploadProgress} className="h-2 w-full" />
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-4">
                  {SOCIAL_PLATFORMS.map(({ name }) => (
                    <FormInput
                      key={name}
                      name={name.toLowerCase()}
                      label={`${name} Profile (optional)`}
                      placeholder="Enter link here"
                      className="text-base font-normal text-[#000000]"
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 flex flex-col items-center justify-between pt-3">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="my-2 w-full bg-[#635BFF] text-base font-medium hover:bg-indigo-600"
              >
                {isSubmitting ? (
                  <Spinner className="h-4 w-4 animate-spin text-white" />
                ) : (
                  'Save changes'
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setOpenPasswordModal(true);
                  onClose();
                }}
                className="w-full text-sm font-medium text-[#DB4437]"
              >
                Change Password
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>

      {openPasswordModal && (
        <PasswordModal isOpen={openPasswordModal} setIsOpen={setOpenPasswordModal} />
      )}
    </Dialog>
  );
};

export default EditProfilePage;
