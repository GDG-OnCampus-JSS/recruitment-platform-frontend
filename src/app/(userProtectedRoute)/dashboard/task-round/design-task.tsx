import { ArrowRightCircle, ArrowUpRight, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import FormInput from '@/components/common/form-input';
import { Spinner } from '@/components/common/spinner';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { designTasks } from '@/constants/task-round';
import useUserStore from '@/stores/userStore';
interface DesignTaskProps {
  year: number;
  onSubmit: (data: { link: string }) => Promise<void>;
  form: UseFormReturn<{ link: string }>;
  deadline: Date;
}

export const DesignTask = ({ year, onSubmit, form, deadline }: DesignTaskProps) => {
  const { user } = useUserStore((state) => state);
  const router = useRouter();
  const yearTasks = designTasks.find((task) => task.year === year);
  const isDeadlinePassed = new Date() > deadline;

  if (!yearTasks)
    return (
      <div className="flex flex-col items-center justify-center space-y-6 py-12 text-center">
        <div className="animate-fade-in-up">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Tasks Unavailable</h2>
          <p className="mx-auto max-w-xl text-lg text-gray-600 md:text-xl">
            We're unable to load your tasks at the moment. This could be due to:
          </p>
        </div>

        <div className="animate-fade-in-up w-full max-w-md space-y-4 delay-100">
          <ul className="list-inside list-disc space-y-2 text-left text-gray-700">
            <li>Session expiration</li>
            <li>Domain assignment pending</li>
            <li>Technical difficulties</li>
          </ul>
        </div>

        <div className="animate-fade-in-up space-y-6 delay-200">
          <div className="rounded-lg bg-blue-50/80 p-6 text-center shadow-sm transition-all hover:bg-blue-50">
            <h3 className="mb-3 text-xl font-semibold text-blue-800">Immediate Solutions</h3>
            <div className="space-y-2">
              <Button
                variant="link"
                className="text-blue-600 hover:text-blue-700"
                onClick={() => router.push('/logout')}
              >
                <ArrowRightCircle className="mr-2 h-5 w-5" />
                Re-authenticate Your Session
              </Button>
              <p className="text-sm text-blue-600">or</p>
              <Link
                href="https://chat.whatsapp.com/KIzWKEujQqbHgOWKAtYhWj"
                className="inline-flex items-center text-blue-600 hover:text-blue-700"
              >
                <Mail className="mr-2 h-5 w-5" />
                Contact team for assistance
              </Link>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="mt-10">
      <h2 className="pb-2 text-[28px] font-bold text-theme">Design Tasks - Year {year}</h2>

      {/* GFX Tasks Section */}
      <div className="mt-8 space-y-20">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-nowrap text-[28px] font-medium">Graphics Design Tasks</h3>
              {user?.year === '1' && (
                <p className="text-sm italic text-neutral-500">Do any one of the following</p>
              )}
            </div>
            <div className="h-[1px] bg-gradient-line sm:w-[981px]"></div>
          </div>
          {yearTasks.gfx.map((task, index) => (
            <TaskSection key={`gfx-${index}`} task={task} />
          ))}
        </div>

        <div className="flex items-center justify-center py-4">
          <div className="h-[1px] w-full bg-gray-300" />
          <span className="px-4 text-sm font-medium text-gray-600">OR</span>
          <div className="h-[1px] w-full bg-gray-300" />
        </div>

        {/* UX Tasks Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-nowrap text-[28px] font-medium">UI / UX Tasks</h3>
              {user?.year === '1' && (
                <p className="text-sm italic text-neutral-500">Do any one of the following</p>
              )}
            </div>
            <div className="h-[1px] bg-gradient-line sm:w-[981px]"></div>
          </div>
          {yearTasks.ux.map((task, index) => (
            <TaskSection key={`ux-${index}`} task={task} />
          ))}
        </div>
        {/* VFX Tasks Section */}

        {/* <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-nowrap text-[28px] font-medium">VFX Tasks</h3>
            </div>
            <div className="h-[1px] bg-gradient-line sm:w-[981px]"></div>
          </div>
          {yearTasks.vfx.map((task, index) => (
            <TaskSection key={`vfx-${index}`} task={task} />
          ))}
        </div> */}
      </div>

      {/* Submission Section */}
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
          className="mx-auto flex w-full max-w-md flex-col items-center space-y-10 px-4 sm:px-0"
        >
          <div className="space-y-2 text-center">
            <h2 className="text-xl font-semibold">Submission Instructions</h2>
            <p className="text-gray-700">
              Please upload your task details in a single document. Make sure to include:
            </p>
            <ul className="list-inside list-disc text-left text-sm text-gray-600">
              <li>Figma file or design screenshots (if applicable)</li>
              <li>Any necessary explanations or justifications</li>
              <li>Final submission link (hosted file, PDF, etc.)</li>
            </ul>
          </div>
          <div className="w-full px-0 xl:w-[550px]">
            <FormInput
              {...form.register('link')}
              name="link"
              type="url"
              placeholder="Add link to your design submission..."
              className="w-full shadow-md"
            />
          </div>
          <Button
            type="submit"
            className="w-28 rounded-md bg-[#635BFF] px-10 py-5 text-base font-medium hover:bg-theme-interactive"
            disabled={form.formState.isSubmitting || isDeadlinePassed}
          >
            {form.formState.isSubmitting ? <Spinner className="text-white" /> : 'Submit'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

const TaskSection = ({ task }: { task: any }) => (
  <div className="space-y-14">
    <div className="flex flex-col gap-4">
      <div className="text-[16px] font-normal leading-[25.6px] text-[#353535]">
        <div className="space-y-2">
          {task.description?.map((paragraph: string, index: number) => {
            const isHeading = !paragraph.includes('.') && paragraph.length < 50;

            return isHeading ? (
              <div key={index} className="font-semibold text-[#100C2C]">
                {paragraph}
              </div>
            ) : (
              <div key={index} className="ml-4">
                • {paragraph}
              </div>
            );
          })}
        </div>

        {task.link && (
          <div className="mt-4 flex items-center gap-2">
            <span className="font-medium">Reference:</span>
            <Link
              href={task.link}
              className="break-words text-[#6B83FF] underline underline-offset-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              {new URL(task.link).hostname}
            </Link>
          </div>
        )}
      </div>

      {task.imageUrl && (
        <div className="mx-auto my-10 max-w-xl">
          <Image
            src={task.imageUrl}
            alt={task.title || 'Task Image'}
            width={400}
            height={351}
            className="block w-full rounded-lg shadow-md"
          />
          <Link
            href={task.imageUrl}
            target="_blank"
            className="mt-4 flex w-full items-center justify-center gap-1 rounded border border-main py-1 text-sm text-theme transition-colors hover:bg-neutral-50"
          >
            Open image in new tab
            <ArrowUpRight />
          </Link>
        </div>
      )}
    </div>

    {/* <div className="flex flex-col gap-4 md:flex-row">
      <Card className="w-full border-main">
        <CardHeader className="pb-2">
          <CardTitle className="text-[20px] font-medium text-[#6B83FF]">
            Judgement Criteria
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-4 text-sm text-[#353535]">
            {task.criteria?.map((criterion: string, index: number) => (
              <li key={index}>{criterion}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card className="w-full border-main">
        <CardHeader className="pb-2">
          <CardTitle className="text-[20px] font-medium leading-[24.6px] text-[#6B83FF]">
            Brownie Points
          </CardTitle>
        </CardHeader>
        <CardContent className="xl:h-[51px] xl:w-[518px]">
          <ul className="list-disc pl-4 text-sm text-[#353535]">
            {task.browniePoints?.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div> */}
  </div>
);
