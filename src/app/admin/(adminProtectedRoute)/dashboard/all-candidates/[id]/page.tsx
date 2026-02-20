'use client';
import {
  ArrowLeft,
  GraduationCap,
  LinkIcon,
  Mail,
  Phone,
  Star,
  UserCheck,
  ArrowUpRight,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { getByIdApi, putApi } from '@/api/api';
import { apiEndPoints } from '@/api/apiEndpoints';
import SocialLinksDisplay from '@/app/(userProtectedRoute)/dashboard/profile/social-links';
import GeneratedAvatar from '@/components/common/generated-avatar';
import { Spinner } from '@/components/common/spinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import FileViewer from '@/components/ui/resumeViewer';
import { statusCode } from '@/constants/apiStatus';
import { userAvatarVariant } from '@/constants/registration';
import { blobUrl, handleToastApiResponse } from '@/lib/helpers';
import { User } from '@/lib/types';
import AptitudeSubmissions from './aptitude-submissions';

export default function CandidateProfile() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const closeDialog = () => {
    setIsOpen(false);
  };

  const openDialog = () => {
    setIsOpen(true);
  };

  const [toggleShortListStatusLoading, setToggleShortListStatusLoading] = useState(false);
  const [toggleInterviewStatusLoading, setToggleInterviewStatusLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    if (!id) return;
    const { status, data: responseData } = await getByIdApi(apiEndPoints.admin.getUserById, id);
    const user = responseData['Fetched user'] as User;
    setUser(user);

    if (status !== statusCode.Ok200) {
      handleToastApiResponse(status, responseData);
    }
  }, [id]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const toggleShortlistStatus = async () => {
    setToggleShortListStatusLoading(true);
    const payload = {
      userId: user?.id,
      shortlisted: user?.shortlistStatus ? 'false' : 'true',
    };

    const { status, data: responseData } = await putApi(
      apiEndPoints.admin.updateUserShortlistStatus,
      payload,
    );

    if (status === statusCode.Ok200 && user) {
      setUser({ ...user, shortlistStatus: !user.shortlistStatus });
      // handleToastApiResponse(status, responseData);
    }
    setToggleShortListStatusLoading(false);
  };

  const toggleInterviewStatus = async () => {
    setToggleInterviewStatusLoading(true);
    const payload = {
      userId: user?.id,
      interviewed: user?.interviewStatus ? 'false' : 'true',
    };

    const { status, data: responseData } = await putApi(
      apiEndPoints.admin.updateUserInterviewStatus,
      payload,
    );

    if (status === statusCode.Ok200 && user) {
      setUser({ ...user, interviewStatus: !user.interviewStatus });
      // handleToastApiResponse(status, responseData);
    }
    setToggleInterviewStatusLoading(false);
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
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto mt-4 flex items-center justify-between">
          <Button
            variant="outline"
            className="group flex gap-1 rounded-2xl border border-main px-4 py-6 font-normal tracking-wide"
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
                <div className="">
                  <div className="w-fit rounded-full border-2 border-dashed border-[#635BFF]">
                    <div className="size-32 overflow-hidden rounded-full border-2 border-[#635BFF]">
                      {/* <Image
                        src={user?.photo ? blobUrl(user?.photo) : '/avatar.svg'}
                        alt="Profile"
                        width={130}
                        height={130}
                        className="h-full w-full"
                      /> */}
                      <GeneratedAvatar
                        seed={user.id}
                        variant={userAvatarVariant}
                        className="h-full w-full"
                      />
                    </div>
                  </div>
                  <div className="my-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-medium tracking-tight">{user?.name}</h2>
                      <div className="flex items-center gap-2">
                        <div className="flex size-3 items-center justify-center rounded-full bg-indigo-100">
                          <span className="rounded-full text-lg text-[#635BFF]">•</span>
                        </div>
                        <span className="text-max text-nowrap">
                          {user?.year
                            ? user?.year == '1'
                              ? '1st Year'
                              : '2nd Year'
                            : 'Update year'}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm capitalize text-[#635BFF]">
                      {user?.domain ? 'Aspiring ' + user?.domain : 'Update domain'}
                    </p>
                  </div>
                  <div>
                    {user.shortlistStatus ? (
                      <p className="mt-4 w-full rounded-lg border-2 border-theme bg-theme px-4 py-2 text-center text-sm font-medium text-theme text-white">
                        Shortlisted 🥳
                      </p>
                    ) : (
                      <p className="text-danger mt-4 w-full rounded-lg border-2 border-red-500 bg-red-50 px-4 py-2 text-center text-sm font-medium">
                        Not shortlisted
                      </p>
                    )}
                    <div className="mt-4 font-sans">
                      <div className="flex gap-2">
                        {/* Aptitude Quiz Status */}
                        {/* <AptitudeSubmissions aptitudeSubmissions={user.answer || []} /> */}
                        <div
                          className="flex-1 cursor-pointer rounded-lg border border-main bg-white p-3 shadow-sm hover:opacity-80"
                          onClick={() => user.aptitudeStatus && openDialog()}
                        >
                          <div className="flex items-center gap-2">
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-medium text-gray-700">Aptitude Quiz</p>
                              <p
                                className={`truncate text-xs ${user.aptitudeStatus ? 'text-theme' : 'text-gray-500'}`}
                              >
                                {user.aptitudeStatus ? 'Completed' : 'Pending'}
                              </p>
                            </div>
                            <div
                              className={`h-5 w-5 flex-none rounded-full ${
                                user.aptitudeStatus
                                  ? 'bg-blue-50 text-theme'
                                  : 'bg-gray-50 text-gray-400'
                              } flex items-center justify-center text-xs`}
                            >
                              {user.aptitudeStatus ? '✓' : '!'}
                            </div>
                          </div>
                        </div>

                        {/* Interview Status */}
                        <div className="flex-1 rounded-lg border border-main bg-white p-3 shadow-sm">
                          <div className="flex items-center gap-2">
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-medium text-gray-700">Interview</p>
                              <p
                                className={`truncate text-xs ${user.interviewStatus ? 'text-purple-600' : 'text-gray-500'}`}
                              >
                                {user.interviewStatus ? 'Ready' : 'Not ready'}
                              </p>
                            </div>
                            <div
                              className={`h-5 w-5 flex-none rounded-full ${
                                user.interviewStatus
                                  ? 'bg-purple-50 text-purple-600'
                                  : 'bg-gray-50 text-gray-400'
                              } flex items-center justify-center text-xs`}
                            >
                              {user.interviewStatus ? '✓' : '!'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-8">
                      <p className="mb-1 text-lg font-medium">Submitted Project</p>
                      <div className="rounded-lg border-main bg-indigo-100 text-sm">
                        {user.projectStatus ? (
                          <Link
                            href={user.taskLink!}
                            className="flex items-center gap-2 p-3 text-theme underline underline-offset-4"
                            target="_blank"
                          >
                            <LinkIcon size={14} />
                            {user.taskLink}
                          </Link>
                        ) : (
                          <p className="p-3">Project link not submitted yet.</p>
                        )}
                      </div>
                    </div>
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
                    <span>{user?.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone size={18} className="text-[#3D3D3D]" />
                    <span>{user?.phone ? user?.phone : 'Update phone number'}</span>
                  </div>
                  <div className="flex items-center gap-3 break-all text-sm">
                    <GraduationCap size={18} className="text-[#3D3D3D]" />
                    <span>
                      {user?.admissionNumber ? user?.admissionNumber : 'Update admission number'}
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
                  {user?.resume ? (
                    <div className="flex flex-col">
                      <FileViewer fileUrl={blobUrl(user.resume)} className={''} />
                      <Link
                        href={blobUrl(user.resume)}
                        target="_blank"
                        className="mt-4 flex flex-1 cursor-pointer items-center rounded-lg rounded-t-none bg-black/5 px-4 py-2 text-center text-sm font-medium tracking-widest text-black hover:bg-success hover:text-white hover:shadow-green-200"
                      >
                        View <ArrowUpRight className="ml-2 size-4" />
                      </Link>
                    </div>
                  ) : (
                    <p className="rounded-t-none py-8 text-center text-muted-foreground">
                      No resume uploaded
                    </p>
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
        {/* buttons */}
        <div className="mt-4 flex items-center justify-end gap-3">
          <Button
            disabled={toggleInterviewStatusLoading}
            variant={user.interviewStatus ? 'destructive' : 'default'}
            size="sm"
            className={`relative p-5 transition-all duration-200 ease-in-out ${
              user.interviewStatus
                ? 'hover:bg-red-600 hover:shadow-red-200'
                : 'hover:bg-theme-interactive hover:shadow-blue-200'
            } hover:shadow-lg`}
            onClick={toggleInterviewStatus}
          >
            <div className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              <span className="flex gap-2 text-sm font-medium">
                {user.interviewStatus ? 'Not Ready for HR' : 'Ready for HR'}
                {toggleInterviewStatusLoading && <Spinner className="h-4 w-4 text-white" />}
              </span>
            </div>
          </Button>
          <Button
            disabled={toggleShortListStatusLoading}
            variant={user.shortlistStatus ? 'destructive' : 'secondary'}
            size="sm"
            className={`relative p-5 transition-all duration-200 ease-in-out ${
              user.shortlistStatus
                ? 'hover:bg-red-600 hover:shadow-red-200'
                : 'hover:bg-success hover:text-white hover:shadow-green-200'
            } hover:shadow-lg`}
            onClick={toggleShortlistStatus}
          >
            <div className="flex items-center gap-2">
              <Star className={`h-4 w-4 ${user.shortlistStatus ? 'fill-current' : ''}`} />
              <span className="flex items-center gap-2 text-sm font-medium">
                {user.shortlistStatus ? 'Remove Shortlist' : 'Shortlist'}
                {toggleShortListStatusLoading && <Spinner className="h-4 w-4" />}
              </span>
            </div>
          </Button>
        </div>
      </div>

      {/* Aptitude Submissions Dialog - Properly positioned outside of nested components */}
      {user?.aptitudeStatus && (
        <AptitudeSubmissions
          isOpen={isOpen}
          closeDialog={closeDialog}
          aptitudeSubmissions={user.answer || []}
        />
      )}
    </div>
  );
}
