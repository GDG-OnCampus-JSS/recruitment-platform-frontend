'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { postApi } from '@/api/api';
import { apiEndPoints } from '@/api/apiEndpoints';
import FormCheckbox from '@/components/common/form-checkbox';
import FormInput from '@/components/common/form-input';
import FormTextArea from '@/components/common/form-textarea';
import OptionsSelect from '@/components/common/options-select';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { academicYearOptions } from '@/constants/registration';
import { handleToastApiResponse } from '@/lib/helpers';
import useAdminStore from '@/stores/adminStore';
// import {Plus} from 'lucide-react'
const aptitudeSchema = z.object({
  aptitudeTitle: z.string().nonempty('Please enter a valid title'),
  aptitudeYear: z.string().nonempty('Please select an academic year'),
  aptitudeDuration: z.string().nonempty('Please enter a valid duration'),
  questions: z
    .array(
      z.object({
        questionShortDesc: z.string().nonempty('Question cannot be empty'),
        options: z
          .array(
            z.object({
              optionText: z.string().nonempty('Option cannot be empty'),
              isCorrect: z.boolean(),
            }),
          )
          .length(4, 'Each question must have exactly 4 options'),
      }),
    )
    .min(1, 'At least one question is required'),
});

const Page = () => {
  const [activeTab, setActiveTab] = useState(0);
  const admin = useAdminStore((state) => state.admin);

  const form = useForm<z.infer<typeof aptitudeSchema>>({
    resolver: zodResolver(aptitudeSchema),
    defaultValues: {
      aptitudeTitle: '',
      aptitudeYear: '1',
      aptitudeDuration: '',
      questions: Array.from({ length: 20 }, () => ({
        questionShortDesc: '',
        options: Array.from({ length: 4 }, () => ({ optionText: '', isCorrect: false })),
      })),
    },
  });

  const onSubmit = async (data: z.infer<typeof aptitudeSchema>) => {
    const { status, data: responseData } = await postApi(apiEndPoints.admin.createAptitude, {
      ...data,
      aptitudeYear: Number(data.aptitudeYear),
      aptitudeDuration: Number(data.aptitudeDuration),
      aptitudeDomain: admin?.domain,
    });

    handleToastApiResponse(status, responseData);
  };

  return (
    <div className="p-6 py-20">
    <div className="flex flex-col lg:flex-row justify-between">
      <h1 className="mb-4 text-2xl font-bold">Create Aptitude</h1>
      {/* <Button type="button" className="rounded-md bg-[#0F9D58] px-5 py-3 text-base text-white mb-2">
        Add Question <Plus />
      </Button> */}
    </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-5 lg:flex-row">
            <FormInput
              name="aptitudeTitle"
              placeholder="Enter the aptitude title"
              className="w-full lg:w-80"
              isAsterisk
            />
            <FormInput
              name="aptitudeDuration"
              placeholder="Enter duration"
              className="w-full"
              isAsterisk
            />
            <OptionsSelect
              name="aptitudeYear"
              placeholder="Year"
              isAsterisk
              className="flex-1"
              options={academicYearOptions}
            />
          </div>

          <div className="flex-col items-center justify-center gap-5 px-2 py-4 md:flex md:justify-normal lg:flex lg:flex-row lg:justify-normal">
            {/* Questions */}
            <div
              key={`active-question-${activeTab}`}
              className="flex max-w-full flex-col gap-8 rounded-md lg:w-[740px]"
            >
              <FormTextArea
                name={`questions.${activeTab}.questionShortDesc`}
                className="h-40"
                placeholder="Write the question here"
              />

              <div className="mb-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {Array.from({ length: 4 }, (_, optIndex) => (
                  <div
                    key={optIndex}
                    className="flex max-w-[360px] items-center gap-3 rounded-md border border-[#DDE3FF] bg-white"
                  >
                    <div className="pl-5">
                      <FormCheckbox
                        name={`questions.${activeTab}.options.${optIndex}.isCorrect`}
                        containerClassName="p-0 space-x-0 m-0 rounded-full"
                      />
                    </div>
                    <FormInput
                      name={`questions.${activeTab}.options.${optIndex}.optionText`}
                      placeholder={`Option ${optIndex + 1}`}
                      className="rounded-bl-none rounded-tl-none border-none"
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Questions Tabs */}
            <div className="flex w-full flex-col gap-5 p-2 lg:w-[360px]">
              <h1>Questions Added</h1>
              <div className="grid grid-cols-3 gap-5 sm:grid-cols-5">
                {Array.from({ length: 20 }, (_, i) => (
                  <Button
                    key={i}
                    type="button"
                    onClick={() => setActiveTab(i)}
                    className={`size-12 rounded-md border-[#D2D6D9] bg-white text-sm text-black hover:bg-black/5 ${activeTab === i ? 'border-[1.5px] border-[#3D3D3D]' : ''}`}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
            </div>
          </div>

        {/* Submit Button */}
        <Button type="submit" className="rounded-md bg-[#635BFF] px-5 py-3 text-base text-white" disabled={!form.formState.isValid}>
          Submit Quiz
        </Button>
      </form>
    </Form>
  </div>
  );
};

export default Page;
