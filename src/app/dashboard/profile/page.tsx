'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuth } from '@/context/authContext';
import { ReactElement } from 'react';
import { useRouter } from 'next/navigation';
import {Dribbble,Linkedin,Github, Palette,Mail,Phone,GraduationCap,Pencil,} from 'lucide-react';
import { SOCIAL_PLATFORMS, reqFields } from '@/types/options';
import { mockUser } from '@/types/options';

const SocialLink = ({
  platform,
  findUserLink,
}: {
  platform: { platform: string; icon: ReactElement };
  findUserLink: (platform: string) => { url: string } | undefined;
}) => {
  const userLink = findUserLink(platform.platform);

  return (
    <div className="flex items-center gap-2 break-all text-sm">
      {platform.icon}
      {userLink ? (
        <a
          href={userLink.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#635BFF] hover:underline"
        >
          {userLink.url}
        </a>
      ) : (
        <span className="text-gray-500">{platform.platform} - Not submitted</span>
      )}
    </div>
  );
};

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const displayUser = user || mockUser;

  const calculateProfileCompletion = (user: typeof displayUser) => {
    const fields = reqFields;
    const completedFields = fields.filter((field) => !!user[field as keyof typeof user]);
    return Math.round((completedFields.length / fields.length) * 100);
  };

  const profileCompletion = calculateProfileCompletion(displayUser);
  const isProfileComplete = profileCompletion === 100;

  const findUserLink = (platform: string) => {
    return displayUser.socialLinks?.find(
      (link) => link.platform.toLowerCase() === platform.toLowerCase(),
    );
  };
  const handleCompleteProfile = () => {
    router.push('/dashboard/profile/editProfile');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen space-y-6 p-2 pb-52 pt-12 lg:min-h-[calc(100vh-212px)]">
      <div className="w-full bg-white">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between px-6 pt-4">
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="text=[#2F3B00] flex items-center gap-2 rounded-3xl border px-4 py-2 font-sans text-[16px] font-normal leading-5"
            >
              <span>←</span> Back
            </Button>
          </Link>
          <h1 className="absolute left-[80%] font-sans text-xl font-medium"> Profile</h1>
          <div className="w-[82px]" />
        </div>
      </div>

      <div className="mx-auto max-w-[1120px] px-4 pt-4 sm:px-6">
        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-1 lg:grid-cols-[300px_1fr]">
          {/* Left Column */}
          <Card className="w-full bg-blue-gradient p-2 shadow-sm sm:w-full lg:w-[300px]">
            <CardContent className="relative p-4">
              <Link href="/dashboard/profile/editProfile">
                <button className="absolute right-4 top-4 rounded-full border bg-white p-1 shadow-sm">
                  <Pencil size={16} />
                </button>
              </Link>
              <div className="flex flex-col items-start space-y-3">
                <div className="relative">
                  <img
                    src="/DP.jpeg"
                    alt="Profile"
                    className="h-[130px] w-[130px] rounded-full border-2 border-dashed border-indigo-600"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-medium">{displayUser.name}</h2>
                    <span className="text-xs text-[#635BFF]">•</span>
                    <span className="text-sm">{displayUser.year}</span>
                  </div>
                  <p className="text-sm text-[#635BFF]">Aspiring {displayUser.domain}</p>
                </div>

                <div className="w-full pt-2">
                  <div className="flex justify-center py-1">
                    <div className="w-[70%] border-b border-[#0000001A]"></div>
                  </div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium">{profileCompletion}%</span>
                  </div>
                  <div className="mb-2 h-1.5 w-full rounded-full bg-gray-100">
                    <div
                      className="h-[11px] rounded-full bg-[#635BFF]"
                      style={{ width: `${profileCompletion}%` }}
                    />
                  </div>
                  <p className="mb-3 p-2 font-sans text-[16px] font-normal leading-[19.41px] text-[#838383]">
                    {isProfileComplete
                      ? 'Your profile is complete!'
                      : 'Complete your profile to let recruiters know more about you!'}
                  </p>
                  {!isProfileComplete && (
                    <Button
                      variant="outline"
                      className="h-[44px] w-full border-[#635BFF] p-2 text-sm text-[#635BFF] transition-colors hover:bg-[#635BFF] hover:text-white"
                      onClick={handleCompleteProfile}
                    >
                      Complete profile
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Column */}
          <div className="grid w-full grid-rows-[auto_1fr] gap-5 sm:w-full lg:w-[740px]">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2">
              <Card className="h-[229px] w-full shadow-sm">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-xl font-medium">Basic details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 break-all text-sm">
                      <Mail size={18} className="text-[#3D3D3D]" />
                      <span>{displayUser.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone size={18} className="text-[#3D3D3D]" />
                      <span>{displayUser.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 break-all text-sm">
                      <GraduationCap size={18} className="text-[#3D3D3D]" />
                      <span>{displayUser.admissionNumber}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="w-full shadow-sm">
                <CardContent className="p-4">
                  <h3 className="mb-4 text-xl font-medium">Your resume</h3>
                  <div className="rounded-lg border border-[#635BFF] bg-gray-50 p-3">
                    <img src="/" alt="Resume Preview" className="h-auto w-full" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="h-[197px] w-full shadow-sm">
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-medium">Submitted links</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2">
                  <div className="space-y-3">
                    {SOCIAL_PLATFORMS.slice(0, 3).map((platform, index) => (
                      <SocialLink key={index} platform={platform} findUserLink={findUserLink} />
                    ))}
                  </div>
                  <div className="space-y-3">
                    {SOCIAL_PLATFORMS.slice(3).map((platform, index) => (
                      <SocialLink key={index} platform={platform} findUserLink={findUserLink} />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
