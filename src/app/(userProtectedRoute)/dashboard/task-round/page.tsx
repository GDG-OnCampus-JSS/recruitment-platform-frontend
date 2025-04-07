'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { ApiRoutes } from '@/api/routes';
import FormInput from '@/components/common/form-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useAuthStore } from '@/context/authContext';
import { mockUser } from '@/lib/options';
import { User } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { WebDevelopmentTask } from './web-dev-task';
import { DesignTask } from './design-task';
import { AndroidTask } from './android-task';
import { MachineLearningTask } from './ml-task';
import { ProgrammingTask } from './programming-task';
import { statusCode } from '@/constants/apiStatus';
import { useToast } from '@/hooks/use-toast';

interface Props {
  onSubmit: (data: { link: string }) => void;
  form: any;
}

const taskSchema = z.object({
  link: z.string().url('Invalid URL format'),
});

function Task() {
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useAuthStore();
  const displayUser = user || mockUser;
  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: { link: '' },
  });

  const domain = displayUser?.domain?.toLowerCase() || '';
  const yearString = displayUser?.year || '';
  const year = yearString.includes('1st') ? 1 : yearString.includes('2nd') ? 2 : 1;

  const onSubmit = async (data: { link: string }) => {
    console.log('Submitted URL:', data.link);
    const socialLinkData = {
      platform: 'project',
      url: data.link,
    };

    //! replace this with the actual api call to submit the task
    const { status, data: responseData } = await ApiRoutes.createSocialLink(
      displayUser.id,
      socialLinkData,
    );
    if (status === statusCode.Ok200) {
      toast({
        variant: 'success',
        title: 'Task submitted successfully',
        description: 'Your task has been submitted successfully.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Something went wrong',
        description: responseData.message,
      });
    }
  };

  const renderTaskContent = () => {
    switch (domain) {
      case 'web development':
        return <WebDevelopmentTask onSubmit={onSubmit} form={form} year={year} />;
      case 'design':
        return <DesignTask onSubmit={onSubmit} form={form} year={year} />;
      case 'machine learning':
        return <MachineLearningTask onSubmit={onSubmit} form={form} year={year} />;
      case 'android':
        return <AndroidTask onSubmit={onSubmit} form={form} year={year} />;
      case 'programming':
        return <ProgrammingTask />;
      default:
        return <UnsupportedDomain domain={domain} />;
    }
  };

  return (
    <div className="my-20 min-h-screen">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            className="text[#2F3B00] rounded-3xl border px-4 py-2 text-[16px] font-normal leading-5"
            onClick={() => router.back()}
          >
            <ArrowLeft /> Back
          </Button>
          <h1 className="text-xl font-medium">Tasks</h1>
        </div>
        {/* {name} */}
        {/* {domain} */}

        {renderTaskContent()}
      </div>
    </div>
  );
}

const UnsupportedDomain = ({ domain }: any) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Domain Task Not Available</h2>
      <p className="mb-8 max-w-md text-lg text-gray-600">
        We don't have specific tasks for the "{domain}" domain yet.
      </p>
      <div className="rounded-lg bg-blue-50 p-6 text-left">
        <h3 className="mb-3 text-xl font-medium text-blue-800">Looking for tasks?</h3>
        <p className="text-blue-600">
          Please check with your coordinator for tasks relevant to your domain.
        </p>
      </div>
    </div>
  );
};

export default Task;
