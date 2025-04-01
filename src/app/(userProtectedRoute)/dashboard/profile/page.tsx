'use client';
import { Mail, Phone, GraduationCap, UserPen, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import FileViewer from '@/components/ui/resumeViewer';
import { blobUrl } from '@/lib/helpers';
import { reqFields, mockUser, socialIconMapping } from '@/lib/options';
import { User } from '@/lib/types';
import useUserStore from '@/stores/userStore';
import EditProfilePage from './edit-profile/page';

export default function ProfilePage() {
  const user = useUserStore((state) => state.user);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const calculateProfileCompletion = (user: User | null) => {
    if (!user) return 0;
    const fields = reqFields;
    const completedFields = fields.filter((field) => !!user[field as keyof typeof user]);
    return Math.round((completedFields.length / fields.length) * 100);
  };

  const profileCompletion = calculateProfileCompletion(user);
  const isProfileComplete = profileCompletion === 100;

  const handleOpenEditProfile = () => {
    setIsEditProfileOpen(true);
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen space-y-6 p-2 pt-12">
      <div className="w-full">
        <div className="mx-auto flex w-full items-center justify-between px-6 pt-4 xl:mt-9 xl:h-9 xl:max-w-6xl xl:px-8 xl:py-0">
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="text[#2F3B00] inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-3xl border px-4 py-2 text-base font-normal leading-5"
            >
              <ArrowLeft /> Back
            </Button>
          </Link>
          <h1 className="text-xl font-medium"> Profile</h1>
        </div>
      </div>

      <div className="mx-auto max-w-[1120px] px-4 pt-4 sm:px-6 xl:pt-0">
        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-1 lg:grid-cols-[320px_1fr] xl:mt-10">
          <Card className="w-full bg-blue p-2 shadow-sm sm:w-full lg:min-w-[300px] xl:h-[446px]">
            <CardContent className="relative p-4 xl:mt-8 xl:pt-0">
              <Button
                variant="ghost"
                className="absolute right-4 top-4 rounded-lg border border-[#432AD880] p-2 xl:top-0"
                onClick={handleOpenEditProfile}
              >
                <UserPen size={20} />
              </Button>
              <div className="flex flex-col items-start space-y-3">
                <div className="rounded-full border-4 border-dashed border-[#635BFF]">
                  <div className="h-[130px] min-w-[130px] overflow-hidden rounded-full border-2 border-[#635BFF]">
                    <Image
                      src={user.photo ? blobUrl(user.photo) : '/DP.jpeg'}
                      alt="Profile"
                      width={130}
                      height={130}
                      className="object-cover"
                    />
                  </div>
                </div>
                <div>
                  <div className="justify-betweem flex items-center gap-2">
                    <h2 className="text-xl font-medium xl:mr-4">{user.name}</h2>
                    <div className="relative flex items-center justify-center xl:mr-2">
                      <div className="absolute h-4 w-4 rounded-full bg-[#635BFF] opacity-10"></div>
                      <div className="relative h-[6px] w-[6px] rounded-full bg-[#635BFF]"></div>
                    </div>
                    <span className="text-max text-nowrap">
                      {user.year == '1' ? '1st Year' : '2nd Year'}
                    </span>
                  </div>
                  <p className="text-sm capitalize text-[#635BFF]">Aspiring {user.domain}</p>
                </div>

                <div className="w-full pt-2">
                  <div className="flex justify-center">
                    <div className="w-[280px] border-b border-[#0000001A]"></div>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="mb-1 text-sm font-medium">{profileCompletion}%</span>
                    <span className="mx-1 mb-1"> -</span>

                    <div className="mb-1 w-full rounded-full bg-[#F2F2F2]">
                      <div
                        className="h-[7px] rounded-full bg-[#635BFF]"
                        style={{ width: `${profileCompletion}%` }}
                      />
                    </div>
                  </div>
                  <p className="mb-3 p-2 text-[16px] font-normal leading-[19.41px] text-[#838383] lg:p-0">
                    {isProfileComplete
                      ? 'Your profile is complete!'
                      : 'Complete your profile to let recruiters know more about you!'}
                  </p>
                  {!isProfileComplete && (
                    <Button
                      variant="outline"
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap border-[#635BFF] px-4 py-[14px] text-sm text-[#635BFF] transition-colors hover:bg-[#635BFF] hover:text-white xl:mt-6"
                      onClick={handleOpenEditProfile}
                    >
                      Complete profile
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid w-full grid-rows-[auto_1fr] gap-5 sm:w-full xl:w-[740px]">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2">
              <Card className="w-full shadow-sm sm:min-h-[229px]">
                <CardContent className="p-8">
                  <h3 className="mb-4 text-xl font-medium">Basic details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Mail size={18} className="text-[#3D3D3D]" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone size={18} className="text-[#3D3D3D]" />
                      <span>{user.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 break-all text-sm">
                      <GraduationCap size={18} className="text-[#3D3D3D]" />
                      <span>{user.admissionNumber}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="w-full shadow-sm">
                <CardContent className="p-8">
                  <h3 className="mb-4 text-xl font-medium">Your resume</h3>
                  <div className="mx-auto rounded-lg border border-[#635BFF] shadow-md">
                    {user.resume ? (
                      <FileViewer fileUrl={blobUrl(user.resume)} className={''} />
                    ) : (
                      <p className="text-center">No resume uploaded</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="w-full shadow-sm">
              <CardContent className="p-6 md:p-8">
                <h3 className="mb-4 text-xl font-medium">Submitted links</h3>
                <div className="grid w-full grid-cols-2 justify-between gap-4 max-md:grid-cols-1">
                  {user?.socialLinks?.map((socialLink) => (
                    <div
                      key={socialLink.id}
                      className="flex w-full items-center justify-between gap-3"
                    >
                      <Link
                        href={socialLink.link}
                        className="text-md flex items-center gap-2 truncate text-nowrap text-[#407BFF] max-md:text-sm"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {socialIconMapping[socialLink.name]}
                        <span className="truncate">{socialLink.link}</span>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <EditProfilePage isOpen={isEditProfileOpen} onClose={() => setIsEditProfileOpen(false)} />
    </div>
  );
}
