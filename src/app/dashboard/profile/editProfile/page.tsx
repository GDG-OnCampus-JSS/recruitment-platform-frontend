'use client';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuthStore } from '@/context/authContext';
import { FormData, SocialLink } from '@/types/types';
import { yearOptions, domainOptions, SOCIAL_PLATFORMS } from '@/types/options';
import PasswordModal from '@/components/dashboardlayout/passwordModal';
import { profileService } from '@/context/profileContext';

const EditProfilePage = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileImage, setProfileImage] = useState<string>('/DP.jpeg');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const userId = user?.id || 'dev-123';

  const initialFormData: FormData = {
    name: '',
    email: '',
    phone: '',
    admissionNumber: '',
    domain: '',
    year: '',
    photo: '',
    resume: '',
    ...SOCIAL_PLATFORMS.reduce(
      (acc, { platform }) => ({
        ...acc,
        [platform.toLowerCase()]: '',
      }),
      {} as Record<string, string>,
    ),
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const userData = await profileService.getUserProfile(userId);
        const socialLinks = (await profileService.getSocialLinks(userId)) || [];

        setProfileImage(userData.photo || '/DP.jpeg');
        setFormData((prev) => ({
          ...prev,
          name: userData.name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          admissionNumber: userData.admissionNumber || '',
          domain: userData.domain || '',
          year: userData.year || '',
          photo: userData.photo || '',
          resume: userData.resume || '',
          ...(Array.isArray(socialLinks)
            ? socialLinks.reduce(
                (acc: Record<string, string>, link: SocialLink) => ({
                  ...acc,
                  [link.name.toLowerCase()]: link.link,
                }),
                {},
              )
            : {}),
        }));
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };

    loadProfile();
  }, [userId]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    setIsSubmitting(true);
    try {
      const userId = 'dev-123';
      await profileService.updateProfile(userId, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        admissionNumber: formData.admissionNumber,
        domain: formData.domain,
        year: formData.year,
        photo: profileImage,
        resume: formData.resume,
      });

      const existingSocialLinks: SocialLink[] = await profileService.getSocialLinks(userId);

      for (const { platform } of SOCIAL_PLATFORMS) {
        const platformLower = platform.toLowerCase();
        const newLink = formData[platformLower];
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
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSaveChanges();
  };

  const handleSavePassword = (passwords: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    console.log('Saving password:', passwords);
  };

  return (
    <div className="min-h-screen space-y-6 p-2 pb-52 pt-12">
      <div className="w-full ">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between pt-4">
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="px- text=[#2F3B00] font-product-sans flex items-center gap-2 rounded-3xl border py-2 text-[16px] font-normal leading-5"
            >
              <span>←</span> Back
            </Button>
          </Link>
          <h1 className="font-product-sans absolute left-[80%] -translate-x-[100%] transform text-xl font-medium">
            Your Profile
          </h1>
          <div className="w-[82px]" />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <Card className="max-w-[1120px] border border-gray-200">
          <CardContent className="p-4 sm:p-10">
            <div className="mx-auto w-full max-w-[1120px] space-y-8">
              {/* Personal Info */}
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
                <div className="w-full sm:w-80">
                  <h2 className="font-product-sans text-[16px] font-medium leading-[19.41px] text-[#100C2C]">
                    About
                  </h2>
                  <p className="text-base font-normal text-gray-500">
                    Tell us about yourself so that we know who you are.
                  </p>
                </div>

                <div className="flex-1 space-y-6">
                  <div className="space-y-4">
                    <label className="font-product-sans block text-[16px] font-normal leading-[19.41px]">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border p-3"
                    />

                    <div className="mt-4">
                      <label
                        htmlFor="photo"
                        className="flex cursor-pointer flex-col items-center gap-4 sm:flex-row"
                      >
                        <div className="relative h-[75px] w-[75px] overflow-hidden rounded-full">
                          <Image src={profileImage} alt="Profile" layout="fill" objectFit="cover" />
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
                      <div>
                        <label className="font-product-sans block pb-1 text-[16px] font-normal leading-[19.41px]">
                          Email address*
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border p-3"
                        />
                      </div>

                      <div>
                        <label className="font-product-sans block pb-1 text-[16px] font-normal leading-[19.41px]">
                          Phone Number*
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border p-3"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className="font-product-sans block pb-1 text-[16px] font-normal leading-[19.41px]">
                            Academic year*
                          </label>
                          <select
                            name="year"
                            value={formData.year}
                            onChange={handleInputChange}
                            className="w-full rounded-lg border bg-white p-3"
                          >
                            {yearOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="font-product-sans block pb-1 text-[16px] font-normal leading-[19.41px]">
                            Admission number*
                          </label>
                          <input
                            type="text"
                            name="admissionNumber"
                            value={formData.admissionNumber}
                            onChange={handleInputChange}
                            className="w-full rounded-lg border p-3"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center py-1">
                <div className="w-full border-b border-[#DDE3FF]"></div>
              </div>

              {/* Professional Sec */}
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
                <div className="w-full sm:w-80">
                  <h2 className="font-product-sans text-[16px] font-medium leading-[19.41px] text-black">
                    Professional Identity
                  </h2>
                  <p className="text-gray-500">
                    Sharing more details about yourself will help you stand out more.
                  </p>
                </div>

                <div className="flex-1 space-y-6">
                  <div>
                    <label className="font-product-sans block pb-1 text-[16px] font-normal leading-[19.41px]">
                      Domain*
                    </label>
                    <select
                      name="domain"
                      value={formData.domain}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border bg-white p-3"
                    >
                      {domainOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-4">
                    <label
                      htmlFor="photo"
                      className="flex cursor-pointer flex-col items-center gap-4 sm:flex-row"
                    >
                      <div className="relative h-[160px] w-[265px] overflow-hidden rounded-[8px] border">
                        <Image src="/" alt="RESUME" layout="fill" objectFit="cover" />
                        <input
                          type="file"
                          id="resume-upload"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                        />
                      </div>
                      <span className="mt-2 border border-[#DDE3FF] p-3 text-[#100C2C] sm:mt-0">
                        Re-Upload Resume
                      </span>
                    </label>
                  </div>

                  {SOCIAL_PLATFORMS.map(({ platform }) => (
                    <div key={platform}>
                      <label className="font-product-sans block pb-1 text-[16px] font-normal leading-[19.41px]">
                        {platform} Link (optional)
                      </label>
                      <input
                        type="url"
                        name={platform.toLowerCase()}
                        placeholder="Paste link here"
                        className="w-full rounded-lg border p-3 text-[#DADADA]"
                        onChange={handleInputChange}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mx-auto flex max-w-[1120px] flex-col items-center justify-between gap-4 px-4 pt-8 sm:flex-row sm:px-6">
          <Button
            variant="outline"
            onClick={() => setIsPasswordModalOpen(true)}
            className="w-full border-[#635BFF] px-6 text-[#635BFF] hover:bg-[#635BFF] hover:text-white sm:w-auto"
          >
            Change password
          </Button>
          <Button
            onClick={handleSaveChanges}
            className="w-full bg-[#635BFF] px-6 text-white hover:bg-[#635BFF]/90 sm:w-auto"
          >
            Save Changes
          </Button>
        </div>
      </form>

      <PasswordModal
        isOpen={isPasswordModalOpen}
        onOpenChange={setIsPasswordModalOpen}
        onSave={handleSavePassword}
      />
    </div>
  );
};

export default EditProfilePage;
