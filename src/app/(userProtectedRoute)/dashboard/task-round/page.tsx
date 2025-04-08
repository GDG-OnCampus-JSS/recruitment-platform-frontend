'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
// import { ApiRoutes } from '@/api/routes';
import FormInput from '@/components/common/form-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import useUserStore from '@/stores/userStore';

const taskSchema = z.object({
  link: z.string().url('Invalid URL format'),
});

function Task() {
  const { user } = useUserStore();
  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: { link: '' },
  });

  const onSubmit = async (data: { link: string }) => {
    // console.log('Submitted URL:', data.link);
    // const socialLinkData = {
    //   platform: 'project',
    //   url: data.link,
    // };

    // const response = await ApiRoutes.createSocialLink(displayUser.id, socialLinkData);
    // if (response.status === 200) {
    //   await ApiRoutes.updateUser(displayUser.id, {
    //     projectStatus: true,
    //   });
    //   alert('Task link submitted successfully!');
    //   form.reset();
    // } else {
    //   alert('Failed to submit task link');
    // }
    console.log('Submitted URL:', data.link);
  };

  return (
    <div className="min-h-screen space-y-6 pt-12 sm:w-auto lg:p-[90px]">
      <div className="min-w-[320px]">
        <div className="mx-auto flex w-full items-center justify-between px-6 py-4 xl:py-0">
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="text[#2F3B00] flex items-center gap-2 rounded-3xl border px-4 py-2 text-[16px] font-normal leading-5 xl:h-9"
            >
              <ArrowLeft /> Back
            </Button>
          </Link>
          <h1 className="text-xl font-medium">Tasks</h1>
        </div>
      </div>
      <div className="mx-auto space-y-8 px-6 py-4">
        <h2 className="pb-2 text-[28px] font-bold leading-[33.96px] text-[#635BFF] xl:h-[34px]">
          Do any one of the following
        </h2>

        <div className="space-y-6">
          <h3 className="text-[28px] font-medium leading-[33.96px]">Frontend (Clone)</h3>

          <div className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:gap-0">
              <div className="pr-4 text-[16px] font-normal leading-[25.6px] text-[#353535] md:h-[125px]">
                <p>This task will assess your abilities of developing UI.</p>
                <p>
                  You need to navigate to{' '}
                  <Link
                    href="https://slack.com/intl/en-in"
                    className="text-[#6B83FF] underline"
                    target="_blank"
                  >
                    https://slack.com/intl/en-in
                  </Link>{' '}
                  and clone the UI of this page using HTML, CSS and JS.
                </p>
                <p>
                  Your main focus for the task would be on frontend, and it's fine if you don't use
                  any backend or mock the backend data using JSON.
                </p>
              </div>

              <Image
                src="/"
                alt="Slack "
                width={550}
                height={351}
                className="w-full rounded-lg shadow-md"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <Card className="w-full xl:h-[132px]">
              <CardHeader className="xl:py-3">
                <CardTitle className="text-[20px] font-medium leading-[24.6px] text-[#6B83FF]">
                  Judgement Criteria
                </CardTitle>
              </CardHeader>
              <CardContent className="">
                <ul className="list-disc pl-4 text-sm text-[#353535]">
                  <li>Similarities on your developed page with the existing one</li>
                  <li>Responsiveness of the layout</li>
                  <li>Usage of JavaScript (if familiar) for interactivity</li>
                  <li>Code Quality</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="w-full xl:h-[132px]">
              <CardHeader className="xl:py-3">
                <CardTitle className="text-[20px] font-medium leading-[24.6px] text-[#6B83FF]">
                  Brownie Points
                </CardTitle>
              </CardHeader>
              <CardContent className="xl:h-[51px] xl:w-[518px]">
                <ul className="list-disc pl-4 text-sm text-[#353535]">
                  <li>Hosted demo would give some extra points</li>
                  <li>Use of Vue.JS or React.JS</li>
                  <li>You can use UI libraries like Bootstrap, Materialize etc</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex items-center justify-center xl:py-5">
          <div className="h-[1px] w-full rotate-180 bg-gradient-line"></div>

          <div className="px-8 text-[28px] font-medium text-[#100C2C] xl:h-9">OR</div>
          <div className="h-[1px] w-full bg-gradient-line"></div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-[28px] font-medium leading-[33.96px]">Backend</h3>
            <div className="h-[1px] bg-gradient-line sm:w-[981px]"></div>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="w-full xl:w-[550px]">
                <ol className="list-decimal pl-4 text-[16px] font-normal leading-[25.6px] text-[#353535] md:h-[150px] xl:h-[150px] xl:w-[500px]">
                  <li>You have to implement a simple CRUD operation</li>
                  <li>
                    If you are implementing the authentication (Login & signup APIs) will be marked
                    as additional
                  </li>
                  <li>Use database to save the details</li>
                  <li>You can test your APIs in the postman</li>
                  <li>Choose a reliable framework for the task</li>
                </ol>

                <p className="pt-2 text-[16px] font-normal italic leading-[19.6px] text-[#454545]">
                  You can use a JSON file if you don't want to use a database!
                </p>
              </div>

              <div className="mb-6 w-full text-[16px] font-normal leading-[25.6px] md:h-[125px] xl:w-[550px]">
                <h3 className="mb-3 text-[#6B83FF]">
                  Some key points to keep in mind while writing code
                </h3>
                <ul className="list-disc space-y-2 pl-4 text-[#353535]">
                  <li>Try to write clean code and have proper comments</li>
                  <li>
                    Split the Code into folders (like controllers, routers, etc) to keep the code
                    modular
                  </li>
                  <li>Use appropriate variable names don't use general names</li>
                </ul>
              </div>
            </div>

            <div className="rounded bg-gray-50 p-4 text-[16px] font-normal leading-[25.6px] xl:h-[50px] xl:px-0">
              <h3 className="mb-2 text-[#6B83FF]">Where to Submit?</h3>
              <p className="text-[#353535]">
                Create a GitHub Repository and push the code to that repository and submit the link
                of the repository.
              </p>
            </div>

            <div className="flex flex-col gap-4 md:flex-row xl:pt-5">
              <Card className="w-full xl:h-[132px]">
                <CardHeader className="xl:py-3">
                  <CardTitle className="text-[20px] font-medium leading-[24.6px] text-[#6B83FF]">
                    Judgement Criteria
                  </CardTitle>
                </CardHeader>
                <CardContent className="xl:h-[51px] xl:w-[518px]">
                  <ul className="list-disc pl-4 text-sm text-[#353535]">
                    <li>Similarities on your developed page with the existing one.</li>
                    <li>Responsiveness of the layout.</li>
                    <li>Usage of JavaScript (if familiar) for interactivity.</li>
                    <li>Code Quality</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="w-full xl:h-[132px]">
                <CardHeader className="xl:py-3">
                  <CardTitle className="text-[20px] font-medium leading-[24.6px] text-[#6B83FF]">
                    Brownie Points
                  </CardTitle>
                </CardHeader>
                <CardContent className="xl:h-[51px] xl:w-[518px]">
                  <ul className="list-disc pl-4 text-sm text-[#353535]">
                    <li>Hosted demo would give some extra points.</li>
                    <li>Use of VueJS or ReactJS.</li>
                    <li>You can use UI libraries like Bootstrap, Materialize etc.</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col items-center justify-center py-6 sm:flex-row xl:pb-20 xl:pt-10">
              <div className="h-[1px] rotate-180 bg-gradient-line sm:w-[447px]"></div>
              <div className="text-center text-lg font-medium tracking-[0.56px] text-[#100C2C] sm:text-2xl xl:h-[34px] xl:w-[328px]">
                Ready to Submit?
              </div>
              <div className="h-[1px] bg-gradient-line sm:w-[447px]"></div>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mx-auto flex w-full max-w-md flex-col items-center space-y-4 px-4 sm:px-0"
              >
                <div className="h-12 w-full px-0 xl:w-[550px]">
                  <FormInput
                    {...form.register('link')}
                    name="link"
                    type="url"
                    placeholder="Add link here..."
                    className="w-full"
                  />
                </div>
                <div className="pt-5">
                  <Button
                    type="submit"
                    className="w-full rounded-md bg-[#635BFF] px-3 py-2 text-base font-medium text-[#ffffff] sm:w-auto xl:h-[44px] xl:w-[170px]"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Task;
