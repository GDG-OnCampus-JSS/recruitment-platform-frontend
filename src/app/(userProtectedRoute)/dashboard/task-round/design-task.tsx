import Image from 'next/image';
import Link from 'next/link';
import FormInput from '@/components/common/form-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { designTasks } from '@/constants/task-round';

interface DesignTaskProps {
  year: 1 | 2;
  onSubmit: (data: { link: string }) => Promise<void>;
  form: any;
}

// UI/UX Design Task Component
export const DesignTask = ({ year, onSubmit, form }: DesignTaskProps) => {
  const yearTasks = designTasks.find((task) => task.year === year);

  if (!yearTasks) return <div>No tasks found for this year</div>;

  return (
    <div className="mt-10">
      <h2 className="pb-2 text-[28px] font-bold text-theme">Design Tasks - Year {year}</h2>

      {/* GFX Tasks Section */}
      <div className="mt-8 space-y-20">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-nowrap text-[28px] font-medium">GFX Tasks</h3>
            <div className="h-[1px] bg-gradient-line sm:w-[981px]"></div>
          </div>
          {yearTasks.gfx.map((task, index) => (
            <TaskSection key={`gfx-${index}`} task={task} />
          ))}
        </div>
        {/* UX Tasks Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-nowrap text-[28px] font-medium">UX Tasks</h3>
            <div className="h-[1px] bg-gradient-line sm:w-[981px]"></div>
          </div>
          {yearTasks.ux.map((task, index) => (
            <TaskSection key={`ux-${index}`} task={task} />
          ))}
        </div>
        {/* VFX Tasks Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-nowrap text-[28px] font-medium">VFX Tasks</h3>
            <div className="h-[1px] bg-gradient-line sm:w-[981px]"></div>
          </div>
          {yearTasks.vfx.map((task, index) => (
            <TaskSection key={`vfx-${index}`} task={task} />
          ))}
        </div>
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
            className="rounded-md bg-[#635BFF] px-10 py-5 text-base font-medium hover:bg-theme-interactive"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

// Reusable Task Section Component
const TaskSection = ({ task }: { task: any }) => (
  <div className="space-y-14">
    <div className="flex flex-col gap-4 md:flex-row">
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
        <Image
          src={task.imageUrl}
          alt={task.title || 'Task Image'}
          width={400}
          height={351}
          className="w-full rounded-lg shadow-md"
        />
      )}
    </div>

    <div className="flex flex-col gap-4 md:flex-row">
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
    </div>
  </div>
);
