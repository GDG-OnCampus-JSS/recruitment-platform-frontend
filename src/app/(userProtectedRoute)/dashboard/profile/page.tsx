'use client';
import { Mail, Phone, GraduationCap, UserPen, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import EditProfilePage from '@/components/common/edit-profile';
import { Spinner } from '@/components/common/spinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import FileViewer from '@/components/ui/resumeViewer';
import { blobUrl } from '@/lib/helpers';
import { reqFields, mockUser, socialIconMapping } from '@/lib/options';
import { User } from '@/lib/types';
import useUserStore from '@/stores/userStore';
import SocialLinksDisplay from './social-links';

export default function ProfilePage() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const calculateProfileCompletion = (user: User | null) => {
    if (!user) return 0;

    const requiredFields = [
      'name',
      'email',
      'phone',
      'admissionNumber',
      'domain',
      'year',
      'photo',
      'resume',
      'socialLinks',
    ];

    let completed = 0;

    requiredFields.forEach((field) => {
      const value = user[field as keyof User];

      if (field === 'socialLinks') {
        if (Array.isArray(value) && value.length > 0) {
          completed++;
        }
      } else if (typeof value === 'string') {
        if (value.trim() !== '') {
          completed++;
        }
      } else {
        if (value !== null && value !== undefined) {
          completed++;
        }
      }
    });

    return Math.round((completed / requiredFields.length) * 100);
  };

  const profileCompletion = calculateProfileCompletion(user);
  const isProfileComplete = profileCompletion === 100;

  const handleOpenEditProfile = () => {
    setIsEditProfileOpen(true);
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="text-indigo-500" />
      </div>
    );
  }
  return (
    <div className="mb-20 mt-20 min-h-screen sm:mb-0">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="mx-auto mt-4 flex items-center justify-between">
          <Button
            variant="outline"
            className="group flex gap-1 rounded-3xl border border-main px-4 py-2 font-normal tracking-wide"
            onClick={() => router.back()}
          >
            <ArrowLeft className="transition-transform duration-500 group-hover:-translate-x-1" />{' '}
            Back
          </Button>
          <h1 className="text-xl font-medium">Profile</h1>
        </div>
        <div className="mt-4">
          <div className="grid grid-cols-1 grid-rows-2 gap-5 lg:grid-cols-3">
            {/* first card */}
            <Card className="row-span-2 border-main bg-blue p-2 shadow-sm">
              <CardContent className="relative p-4">
                <Button
                  variant="ghost"
                  className="absolute right-4 top-4 rounded-lg border-2 border-[#432AD880] bg-white p-2 transition hover:bg-indigo-50"
                  onClick={handleOpenEditProfile}
                >
                  <UserPen size={20} />
                </Button>
                <div className="">
                  <div className="w-fit rounded-full border-2 border-dashed border-[#635BFF]">
                    <div className="size-32 overflow-hidden rounded-full border-2 border-[#635BFF]">
                      <Image
                        src={user.photo ? blobUrl(user.photo) : '/avatar.svg'}
                        alt="Profile"
                        width={130}
                        height={130}
                        className="h-full w-full"
                      />
                    </div>
                  </div>
                  <div className="my-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-medium tracking-tight">{user.name}</h2>
                      <div className="flex items-center gap-2">
                        <div className="flex size-3 items-center justify-center rounded-full bg-indigo-100">
                          <span className="rounded-full text-lg text-[#635BFF]">•</span>
                        </div>
                        <span className="text-max text-nowrap">
                          {user.year ? (user.year == '1' ? '1st Year' : '2nd Year') : 'Update year'}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm capitalize text-[#635BFF]">
                      Aspiring {user.domain ? 'Aspiring ' + user.domain : 'Update domain'}
                    </p>
                  </div>
                  <div>
                    <div className="my-2 w-full border-b border-neutral-200"></div>
                    <div className="flex items-center justify-between gap-2 py-2">
                      <span className="text-sm font-medium">{profileCompletion}%</span>
                      <div className="w-full rounded-full border border-main bg-[#F2F2F2]">
                        <div
                          className="h-[7px] rounded-full bg-[#635BFF]"
                          style={{ width: `${profileCompletion}%` }}
                        />
                      </div>
                    </div>
                    <p className="my-3 text-[#838383]">
                      {isProfileComplete
                        ? 'Your profile is complete!'
                        : 'Complete your profile to let recruiters know more about you!'}
                    </p>
                    {!isProfileComplete && (
                      <Button
                        variant="outline"
                        className="w-full border-indigo-400 px-4 py-5 text-sm text-indigo-600 transition-colors hover:bg-[#635BFF] hover:text-white"
                        onClick={handleOpenEditProfile}
                      >
                        Complete profile
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* second card */}
            <Card className="border-main shadow-sm">
              <CardContent className="p-8">
                <h3 className="mb-4 text-xl font-medium">Basic details</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail size={18} className="text-[#3D3D3D]" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone size={18} className="text-[#3D3D3D]" />
                    <span>{user.phone ? user.phone : 'Update phone number'}</span>
                  </div>
                  <div className="flex items-center gap-3 break-all text-sm">
                    <GraduationCap size={18} className="text-[#3D3D3D]" />
                    <span>
                      {user.admissionNumber ? user.admissionNumber : 'Update admission number'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* third card */}
            <Card className="border-main shadow-sm">
              <CardContent className="p-8">
                <h3 className="mb-4 text-xl font-medium">Your resume</h3>
                <div className="mx-auto rounded-lg border border-[#635BFF]">
                  {user.resume ? (
                    <FileViewer fileUrl={blobUrl(user.resume)} className={''} />
                  ) : (
                    <p className="py-8 text-center text-muted-foreground">No resume uploaded</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* fourth card */}
            <SocialLinksDisplay
              socialLinks={user?.socialLinks}
              className="border-main shadow-sm lg:col-span-2"
            />
          </div>
        </div>
        <EditProfilePage isOpen={isEditProfileOpen} onClose={() => setIsEditProfileOpen(false)} />
      </div>
    </div>
  );
}
