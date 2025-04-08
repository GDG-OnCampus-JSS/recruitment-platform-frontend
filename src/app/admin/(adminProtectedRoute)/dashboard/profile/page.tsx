'use client';
import {
  Mail,
  Phone,
  GraduationCap,
  UserPen,
  ArrowLeft,
  Clipboard,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  Sparkles,
} from 'lucide-react';
import Image from 'next/image';
import { ReactElement, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SOCIAL_PLATFORMS, mockUser } from '@/lib/options';
import { User } from '@/lib/types';
import useAdminStore from '@/stores/adminStore';

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
          className="text-base font-normal text-[#407BFF] hover:underline"
        >
          {userLink.url}
        </a>
      ) : (
        <span className="text-[#888888]">{platform.platform} - Not submitted</span>
      )}
    </div>
  );
};

const generateMockUsers = (count: number): User[] => {
  const mockUsers: User[] = [];
  for (let i = 1; i <= count; i++) {
    mockUsers.push({
      id: i.toString(),
      name: `Mock User ${i}`,
      email: `mockuser${i}@example.com`,
      phone: `123456789${i}`,
      admissionNumber: `ADM00${i}`,
      year: `Year ${i}`,
      domain: `Domain ${i}`,
      photo: `/DP.jpeg`,
      socialLinks: [
        { id: 'github', name: 'GitHub', link: `https://github.com/mockuser${i}` },
        { id: 'linkedin', name: 'LinkedIn', link: `https://linkedin.com/in/mockuser${i}` },
        { id: 'project', name: 'Project', link: `https://mockproject${i}.com` },
      ],
      resume: i % 2 === 0 ? `/resume${i}.pdf` : null,
      interviewStatus: i % 2 === 0,
      reviewStatus: i % 3 === 0,
    });
  }
  return mockUsers;
};

export default function ProfilePage() {
  const admin = useAdminStore((state) => state.admin);
  const displayUser = (admin || mockUser) as User;
  const [shortlistedUsers, setShortlistedUsers] = useState<User[]>([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchShortlistedUsers = async () => {
      try {
        const mockUsers = generateMockUsers(20);
        setShortlistedUsers(mockUsers);
        // const response = await ApiRoutes.checkUserShortlistStatus({ page: 1, limit: 10 });
        // if (response.status === 200) {
        //   setShortlistedUsers(response.data.data);
        // }
      } catch (error) {
        console.error('Error fetching shortlisted users:', error);
      }
    };

    fetchShortlistedUsers();
  }, []);

  useEffect(() => {
    if (shortlistedUsers.length > 0) {
      setUserData(shortlistedUsers[currentUserIndex]);
      // for development

      // const fetchUser = async () => {
      //   const userId = shortlistedUsers[currentUserIndex].id;
      //   const response = await ApiRoutes.getUserById(userId);
      //   if (response.status === 200) {
      //     setUserData(response.data);
      //   } else {
      //     setUserData(mockUser);
      //   }
      // };

      // fetchUser();
    }
  }, [currentUserIndex, shortlistedUsers]);

  const findUserLink = (platform: string) => {
    return userData?.socialLinks?.find((link) => link.id === platform);
  };

  const handlePrevious = () => {
    if (currentUserIndex > 0) {
      setCurrentUserIndex(currentUserIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentUserIndex < shortlistedUsers.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1);
    }
  };

  type UserStatusField = 'interviewStatus' | 'reviewStatus';
  const updateUserStatus = async (field: UserStatusField, value: boolean) => {
    const currentUser = shortlistedUsers[currentUserIndex];
    try {
      // await ApiRoutes.updateUser(currentUser.id, { [field]: value });

      const updatedUsers = [...shortlistedUsers];
      updatedUsers[currentUserIndex][field] = value;
      setShortlistedUsers(updatedUsers);
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    }
  };

  const handleClearedInterview = async () => {
    await updateUserStatus('interviewStatus', true);
  };

  const handleMarkedForReview = async () => {
    await updateUserStatus('reviewStatus', true);
  };

  // if (loading) {
  //   return (
  //     <div className="flex min-h-screen items-center justify-center">
  //       <p className="text-lg">Loading...</p>
  //     </div>
  //   );
  // }
  if (!userData) {
    return <div className="mt-24 min-h-[60vh]">No user data found.</div>;
  }

  const taskSubmissionLink = userData?.socialLinks?.find((link) => link.id === 'project');

  return (
    <div className="min-h-screen space-y-6 p-2 pt-12 lg:min-h-[calc(100vh-212px)]">
      <div className="w-full">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between px-6 pt-4">
          <h1 className="text-[28px] font-normal text-[#4F4F4F]">Shortlisted User</h1>
          <h1 className="text-xl font-medium"> Total: {shortlistedUsers.length}</h1>
        </div>
      </div>

      <div className="mx-auto max-w-[1120px] px-4 pt-4 sm:px-6">
        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-1 lg:grid-cols-[300px_1fr]">
          <Card className="w-full bg-blue-gradient p-2 sm:w-full lg:w-[300px]">
            <CardContent className="relative p-4">
              <button className="absolute right-4 top-4 rounded-lg border p-1">
                <UserPen size={20} />
              </button>

              <div className="flex flex-col items-start space-y-3">
                <div className="rounded-full border-4 border-dashed border-[#635BFF]">
                  <div className="h-[130px] w-[130px] overflow-hidden rounded-full border-2 border-[#635BFF]">
                    <Image
                      src={userData.photo || '/DP.jpeg'}
                      alt="Profile"
                      width={130}
                      height={130}
                      className="object-cover"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-medium">{userData.name}</h2>
                      <p className="text-base text-[#635BFF]">Aspiring {userData.domain}</p>
                    </div>
                    {userData.reviewStatus && (
                      <span className="ml-2 inline-flex items-center justify-center gap-2 rounded-md bg-[#0F9D58] px-2 py-2 text-sm font-medium text-[#FFFFFF]">
                        <Sparkles className="h-4 w-4" /> Shortlisted
                      </span>
                    )}
                  </div>
                </div>

                <div className="w-full pt-2">
                  <div className="flex justify-center">
                    <div className="w-[70%] border-b border-[#0000001A]"></div>
                  </div>
                  <div className="flex items-center justify-between py-2"></div>

                  <p className="py-3 pb-5 text-xl font-medium text-[#000000]">Submitted project</p>
                  {taskSubmissionLink ? (
                    <p className="rounded-[8px] border border-[#635BFF] p-2">
                      <a
                        href={taskSubmissionLink.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#407BFF] hover:underline"
                      >
                        {taskSubmissionLink.link}
                      </a>
                    </p>
                  ) : (
                    <p className="rounded-[8px] border border-[#635BFF] p-2 text-gray-500">
                      No task submission link found.
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-5 sm:w-full xl:w-[700px]">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2">
              <Card className="h-fit">
                <CardContent className="p-8">
                  <h3 className="mb-4 text-xl font-medium">Basic details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Mail size={18} className="text-[#3D3D3D]" />
                      <span>{userData.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone size={18} className="text-[#3D3D3D]" />
                      <span>{userData.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 break-all text-sm">
                      <GraduationCap size={18} className="text-[#3D3D3D]" />
                      <span>{userData.admissionNumber}</span>
                    </div>
                    <div className="flex items-center gap-3 break-all text-sm">
                      <Clipboard size={18} className="text-[#3D3D3D]" />
                      <span>{userData.year}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="w-full shadow-sm">
                <CardContent className="p-8">
                  <h3 className="mb-4 text-xl font-medium">Resume</h3>
                  <div className="rounded-lg border border-[#635BFF] bg-gray-50 p-3">
                    {userData.resume ? (
                      <Image
                        src={userData.resume}
                        alt="Resume"
                        width={300}
                        height={100}
                        className="h-auto w-full"
                      />
                    ) : (
                      <p className="text-center text-gray-500">No resume uploaded</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="w-full shadow-sm sm:h-[197px]">
              <CardContent className="p-6 md:p-8">
                <h3 className="mb-4 text-xl font-medium">Submitted links</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2">
                  <div className="space-y-3">
                    {/* {SOCIAL_PLATFORMS.slice(0, 3).map((platform, index) => (
                      <SocialLink key={index} platform={platform} findUserLink={findUserLink} />
                    ))} */}
                  </div>
                  <div className="space-y-3">
                    {/* {SOCIAL_PLATFORMS.slice(3).map((platform, index) => (
                      <SocialLink key={index} platform={platform} findUserLink={findUserLink} />
                    ))} */}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="justify-between pl-16 pt-5 sm:flex sm:pl-0">
          <Button
            variant="outline"
            className="m-1 ml-2 w-[195px] bg-[#F2F2F2] p-3"
            onClick={handlePrevious}
            disabled={currentUserIndex === 0}
          >
            <ArrowLeft />
            Previous Candidate
          </Button>
          <div>
            <Button
              variant="outline"
              className="m-1 ml-2 w-[195px] p-3 text-sm text-[#5D5D5D]"
              onClick={handleClearedInterview}
            >
              {userData.interviewStatus ? <BookmarkCheck /> : <Bookmark />} Cleared Interview
            </Button>
            <Button
              variant="outline"
              className="m-1 ml-2 w-[195px] p-3 text-sm text-[#5D5D5D]"
              onClick={handleMarkedForReview}
            >
              {userData.reviewStatus ? <BookmarkCheck /> : <Bookmark />} Mark Shortlisted
            </Button>
            <Button
              variant="outline"
              className="m-1 ml-2 w-[195px] bg-[#F2F2F2] p-3 text-sm"
              onClick={handleNext}
              disabled={currentUserIndex === shortlistedUsers.length - 1}
            >
              <ArrowRight /> Next Candidate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
