import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import FormInput from '@/components/common/form-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { androidTasks } from '@/constants/task-round';

interface AndroidTaskProps {
  year: 1 | 2;
  onSubmit: (data: { link: string }) => void;
  form: any;
}

export const AndroidTask = ({ year, onSubmit, form }: AndroidTaskProps) => {
  const yearTasks = androidTasks.find((task) => task.year === year)?.tasks;

  if (!yearTasks) return <div>No tasks found for this year</div>;

  return (
    <div className="mt-10 space-y-8">
      <h2 className="pb-2 text-[28px] font-bold text-theme">Android Tasks - Year {year}</h2>

      {yearTasks.map((task, index) => (
        <React.Fragment key={task.type}>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-nowrap text-[28px] font-medium">{task.title}</h3>
              <div className="h-[1px] bg-gradient-line sm:w-[981px]"></div>
            </div>

            <div className="space-y-4">
              <div className="gap-4">
                <div className="text-[16px] font-normal leading-[25.6px] text-[#353535]">
                  <div className="space-y-2">
                    {task.description.map((paragraph: string, pIndex: number) => {
                      const isHeading = !paragraph.includes('.') && paragraph.length < 50;

                      return isHeading ? (
                        <div key={pIndex} className="font-semibold text-[#100C2C]">
                          {paragraph}
                        </div>
                      ) : (
                        <div key={pIndex} className="ml-4">
                          • {paragraph}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {task.imageUrl && (
                  <Image
                    src={task.imageUrl}
                    alt={task.title}
                    width={400}
                    height={351}
                    className="mt-4 w-full rounded-lg shadow-md"
                  />
                )}
              </div>
            </div>

            {/* Judgement Criteria and Brownie Points */}
            <div className="flex flex-col gap-4 md:flex-row">
              <Card className="w-full border-main">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[20px] font-medium text-[#6B83FF]">
                    Judgement Criteria
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-4 text-sm text-[#353535]">
                    {task.criteria.map((criterion, cIndex) => (
                      <li key={cIndex}>{criterion}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="w-full border-main">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[20px] font-medium text-[#6B83FF]">
                    Brownie Points
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-4 text-sm text-[#353535]">
                    {task.browniePoints.map((point, bpIndex) => (
                      <li key={bpIndex}>{point}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {index < yearTasks.length - 1 && (
            <div className="flex items-center justify-center xl:py-5">
              <div className="h-[1px] w-full rotate-180 bg-gradient-line"></div>
              <div className="px-8 text-[28px] font-medium text-[#100C2C] xl:h-9">OR</div>
              <div className="h-[1px] w-full bg-gradient-line"></div>
            </div>
          )}
        </React.Fragment>
      ))}

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
              placeholder="Add link to your submission..."
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
