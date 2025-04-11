'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Bookmark, Circle, TriangleAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { getApi, postApi } from '@/api/api';
import { apiEndPoints } from '@/api/apiEndpoints';
import FormTextArea from '@/components/common/form-textarea';
import { Spinner } from '@/components/common/spinner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { statusCode } from '@/constants/apiStatus';
import { mockUser } from '@/lib/options';
import { User } from '@/lib/types';
import { cn } from '@/lib/utils';
import useUserStore from '@/stores/userStore';

type Answer = {
  questionId: string;
  answer: string;
};

const AptitudeQuiz = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const displayUser = (user || mockUser) as User;
  const [activeTab, setActiveTab] = useState(0);
  const [textAnswers, setTextAnswers] = useState<{ [key: string]: string }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewedQuestions, setReviewedQuestions] = useState<Set<string>>(new Set());
  const [displayedQuestions, setDisplayedQuestions] = useState<any[]>([]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentQuestion = displayedQuestions[currentQuestionIndex];

  const totalMarked = reviewedQuestions.size;
  const totalQuestions = displayedQuestions.length;
  const totalAnswered = Object.entries(textAnswers).filter(
    ([_, value]) => value.trim() !== '',
  ).length;

  const formSchema = z.object({
    answers: z.record(z.string().min(1, 'Answer cannot be empty')),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      answers: {},
    },
  });

  const [answers, setAnswers] = useState<Answer[]>([]);

  const fetchQuestions = async () => {
    setIsLoading(true);
    const { status, data } = await getApi(apiEndPoints.question.getRandomQuestions);
    if (status == statusCode.Ok200) {
      setDisplayedQuestions(data.questions);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleTextAnswerChange = (questionId: string, value: string) => {
    setTextAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));

    setAnswers((prevAnswers) => {
      const existing = prevAnswers.find((a) => a.questionId === questionId);

      if (existing) {
        return prevAnswers.map((a) => (a.questionId === questionId ? { ...a, answer: value } : a));
      } else {
        return [...prevAnswers, { questionId, answer: value }];
      }
    });
  };

  const handleSubmitTest = async () => {
    console.log('answers', answers);
    const { status, data } = await postApi(apiEndPoints.answer.createAnswer, {
      userId: displayUser.id,
      answers: answers,
    });

    if (status == statusCode.Created201) {
      setIsModalOpen(false);
      router.push('/dashboard/quiz/submitted');
    }
  };

  const handleMarkForReview = (questionId: string) => {
    setReviewedQuestions((prev) => {
      const updated = new Set(prev);
      updated.has(questionId) ? updated.delete(questionId) : updated.add(questionId);
      return new Set(updated);
    });
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < displayedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setActiveTab(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setActiveTab(currentQuestionIndex - 1);
    }
  };

  const openFinishTestDialog = () => {
    setIsModalOpen(true);
  };

  if (isLoading || displayedQuestions.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50">
        <Spinner className="text-theme" />
      </div>
    );
  }

  return (
    <div className="min-h-screen rounded-xl bg-neutral-50 pb-32 pt-20 lg:pb-0">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <h1 className="my-4 text-left text-xl font-bold">Aptitude Quiz</h1>
        <div className="my-3 flex justify-end">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="bg-white px-6 py-5 font-medium text-red-500"
                onClick={openFinishTestDialog}
              >
                Finish Test
              </Button>
            </DialogTrigger>

            <DialogContent
              aria-describedby="finish-test-description"
              className="max-w-md rounded-xl p-6 shadow-lg"
            >
              <div className="flex flex-col items-center gap-4 text-center">
                <TriangleAlert className="h-16 w-16 text-red-500" />

                <DialogTitle className="text-2xl font-semibold text-red-600">
                  Finish Quiz?
                </DialogTitle>

                <p id="finish-test-description" className="text-sm text-gray-600">
                  You are about to end the quiz. Make sure you've reviewed all your answers before
                  submitting. Once submitted, you will not be able to change your responses.
                </p>
              </div>

              <div className="mt-10 flex justify-between gap-4">
                <Button
                  onClick={handleSubmitTest}
                  className="border border-red-500 bg-red-50 px-5 py-5 font-semibold text-red-500 hover:bg-red-500 hover:text-white"
                >
                  Yes, Finish
                </Button>
                <Button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-theme px-5 py-5 font-semibold text-white hover:bg-theme-interactive"
                >
                  No, Continue
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col-reverse gap-5 lg:flex-row">
          <div>
            <div className="rounded-xl bg-white p-10">
              <h3 className="mb-4 text-lg font-medium text-[#100C2C]">
                Question {currentQuestionIndex + 1}
              </h3>
              <p className="text-[16px] text-[#3D3D3D]">
                {currentQuestion?.questionText || 'Loading...'}
              </p>
            </div>

            <div className="mt-4">
              <FormProvider {...form}>
                <Form {...form}>
                  {currentQuestion && (
                    <FormTextArea
                      name={`answers.${currentQuestion.id}`}
                      placeholder="Type your answer here..."
                      className={cn(
                        'min-h-[150px] w-full resize-none rounded-xl border bg-white px-6 py-4 text-[15px] text-[#1E1E1E] shadow-sm transition-all placeholder:text-[#B0B0B0]',
                        'focus:border-theme focus:outline-none focus:ring focus:ring-indigo-200',
                        textAnswers[currentQuestion?.id] ? 'bg-blue-50/20' : 'border-[#E5E7EB]',
                      )}
                      onInputChange={(value) => handleTextAnswerChange(currentQuestion.id, value)}
                      value={textAnswers[currentQuestion?.id] || ''}
                    />
                  )}
                </Form>
              </FormProvider>
            </div>
          </div>
          <div className="rounded-xl bg-white p-10">
            <h1 className="font-medium">Aptitude Quiz</h1>
            <p className="mt-1 text-sm font-normal text-[#6D6D6D]">Attempt all questions.</p>
            <ul className="my-7 flex list-none flex-wrap gap-5 whitespace-nowrap sm:flex-nowrap">
              <li className="flex items-center text-[#56BA85]">
                <Circle className="mr-2 h-2 w-2 rounded-full bg-[#56BA85]" />
                <span className="decoration-skip-ink-none text-sm text-[#6D6D6D]">
                  {totalAnswered} answered
                </span>
              </li>
              <li className="flex items-center text-[#F3B153]">
                <Circle className="mr-2 h-2 w-2 rounded-full bg-[#F3B153]" />
                <span className="decoration-skip-ink-none text-sm text-[#6D6D6D]">
                  {' '}
                  {totalMarked} marked
                </span>
              </li>
              <li className="flex items-center text-black">
                <Circle className="mr-2 h-2 w-2" />
                <span className="text-sm text-[#6D6D6D]">
                  {' '}
                  {totalQuestions - totalAnswered} unanswered
                </span>
              </li>
            </ul>
            <div className="grid grid-cols-3 gap-5 sm:grid-cols-5">
              {Array.from({ length: totalQuestions }, (_, i) => {
                const isAnswered = textAnswers[displayedQuestions[i]?.id];
                const isMarked = reviewedQuestions.has(displayedQuestions[i]?.id);
                return (
                  <div key={i} className="">
                    <Button
                      type="button"
                      onClick={() => {
                        setActiveTab(i);
                        setCurrentQuestionIndex(i);
                      }}
                      className={`relative size-12 border-[#D2D6D9] text-sm text-white hover:bg-black/5 ${isAnswered && isMarked ? 'rounded-full bg-[#56BA85] hover:bg-green-600' : ''} ${isMarked && !isAnswered ? 'rounded-full bg-[#F3B153] hover:bg-yellow-500' : ''} ${isAnswered && !isMarked ? 'rounded-full bg-[#56BA85] hover:bg-green-600' : ''} ${!isAnswered && !isMarked ? 'rounded-md border bg-white text-black' : ''} ${activeTab === i ? 'border-[1.5px] border-[#3D3D3D]' : ''} `}
                    >
                      {isAnswered && isMarked && (
                        <div className="absolute left-7 top-7 rounded-full border bg-[#F3B153] p-1">
                          <Bookmark className="h-4 w-4 text-white" />
                        </div>
                      )}
                      {i + 1}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* buttons */}
        <div className="mt-20 flex flex-col-reverse justify-between gap-10 sm:flex-row md:gap-0">
          <Button
            onClick={prevQuestion}
            variant="outline"
            className="py-6 text-black lg:w-32"
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          <div className="flex flex-col gap-3 rounded-md sm:flex-row">
            {currentQuestion?.id && (
              <Button
                variant="outline"
                className={`flex w-full items-center gap-2 py-6 lg:w-32 ${reviewedQuestions.has(currentQuestion.id) ? 'bg-[#F3B153] px-2 text-white hover:bg-yellow-500 hover:text-white' : 'bg-white px-6 text-[#3D3D3D]'}`}
                onClick={() => handleMarkForReview(currentQuestion.id)}
              >
                <Bookmark
                  className={`h-4 w-4 ${reviewedQuestions.has(currentQuestion.id) ? 'text-white' : 'text-black'}`}
                />
                <span className="font-medium">
                  {reviewedQuestions.has(currentQuestion.id) ? 'Marked' : 'Mark'}
                </span>
              </Button>
            )}
            <Button
              className="bg-theme py-6 font-medium text-white hover:bg-theme-interactive"
              onClick={nextQuestion}
              disabled={currentQuestionIndex === displayedQuestions.length - 1}
            >
              Save and Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AptitudeQuiz;
