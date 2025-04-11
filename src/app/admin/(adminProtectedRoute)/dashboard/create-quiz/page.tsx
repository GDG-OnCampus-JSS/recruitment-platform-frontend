'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
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


const questionSchema = z.object({  
  questions: z
    .array(
      z.object({
        quizTitle: z.string().nonempty('Please enter a valid title'),  
        year: z.string().nonempty('Please enter current year').min(4, 'Year must be at least 4 characters'),
        questionText: z.string().nonempty('Question text cannot be empty'),
      }),
    )
    .min(1, 'At least one question is required'),
});

const Page = () => {
  const [activeTab, setActiveTab] = useState(0);
  const admin = useAdminStore((state) => state.admin);

  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    mode: 'onChange',
    defaultValues: {
      questions: Array.from({ length: 20 }, () => ({
        questionText: '',
        quizTitle: "",
        year: "2025"
      })),
    },
  });

  const onSubmit = async (data: z.infer<typeof questionSchema>) => {
    // const { status, data: responseData } = await postApi(apiEndPoints.question.createQuestion, {
    //   ...data,
    // });

    const transformedData = {
      ...data,
      questions: data.questions.map((q) => ({
        ...q,
        year: parseInt(q.year, 10), // Convert to number
      })),
    };
  
    const { status, data: responseData } = await postApi(
      apiEndPoints.admin.createQuiz,
      transformedData
    );
    console.log("trans", transformedData)
    handleToastApiResponse(status, responseData);
  };

  return (
    <div className="p-6 py-20">
      <div className="flex flex-col justify-between lg:flex-row">
        <h1 className="mb-4 text-2xl font-bold">Create Quiz</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col items-center justify-center gap-5 px-2 py-4 md:flex md:justify-normal lg:flex lg:flex-row lg:justify-normal">
            {/* Questions */}
            <div
              key={`active-question-${activeTab}`}
              className="flex max-w-full flex-col gap-8 rounded-md lg:w-[740px]"
            >
              <FormInput
              name={`questions.${activeTab}.quizTitle`}
              placeholder="Enter the Quiz title"
              className="w-80"
              isAsterisk
            />
            <FormInput
              name={`questions.${activeTab}.year`}
              placeholder="Enter the year"
              className="w-full lg:w-80"
              isAsterisk
            />
              <FormTextArea
                name={`questions.${activeTab}.questionText`}
                className="h-40"
                placeholder="Write the question here"
              />

              {/* <div className="mb-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
              
              </div> */}
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
          <Button
            type="submit"
            className="rounded-md bg-[#635BFF] px-5 py-3 text-base text-white"
            disabled={!form.formState.isValid}
          >
            Submit Quiz
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Page;
