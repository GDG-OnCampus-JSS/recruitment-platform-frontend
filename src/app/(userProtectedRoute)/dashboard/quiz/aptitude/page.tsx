'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Bookmark, Circle, TriangleAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { getApi, getByParamsApi, postApi } from '@/api/api';
import { apiEndPoints } from '@/api/apiEndpoints';
import FormTextArea from '@/components/common/form-textarea';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { statusCode } from '@/constants/apiStatus';
import { mockUser } from '@/lib/options';
import { mockAptitude } from '@/lib/options';
import { User } from '@/lib/types';
import useUserStore from '@/stores/userStore';

type Question = {
  id: string;
  questionText: string;
  isDeleted: boolean;
  year: number;
  quizTitle: string;
};

type Answer = {
  questionId: string;
  answer: string;
};

const AptitudeQuiz = () => {
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

  // const [timeLeft, setTimeLeft] = useState(30 * 60);
  // const [isTimerFinished, setIsTimerFinished] = useState(false);

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
    // console.log("id", displayUser.id)
    const { status, data } = await getApi(apiEndPoints.question.getRandomQuestions);
    // console.log("questions", data.questions)
    if (status == statusCode.Ok200) {
      console.log('executed');
      setDisplayedQuestions(data.questions);
    }
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
    // apiEndPoints.answer.createAnswer
    const { status, data } = await postApi(apiEndPoints.answer.createAnswer, {
      userId: displayUser.id,
      answers: answers,
    });

    if (status == statusCode.Created201) {
    //   console.log('data');
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
    // saveCurrentAnswer();

    if (currentQuestionIndex < displayedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setActiveTab(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    // saveCurrentAnswer();
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setActiveTab(currentQuestionIndex - 1);
    }
  };

  //timer
  // useEffect(() => {
  //   if (timeLeft === 0) {
  //     setIsTimerFinished(true);
  //     handleSubmitTest();
  //     return;
  //   }
  //   const timerInterval = setInterval(() => {
  //     setTimeLeft((prevTime) => prevTime - 1);
  //   }, 1000);
  //   return () => clearInterval(timerInterval);
  // }, [timeLeft]);

  // const formatTime = (timeInSeconds: number) => {
  //   const minutes = Math.floor(timeInSeconds / 60);
  //   const seconds = timeInSeconds % 60;
  //   return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  // };

  const openFinishTestDialog = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="mx-auto min-h-screen px-4 py-4 pt-10 xl:container lg:h-full xl:max-w-6xl">
      <h1 className="my-4 text-left text-[20px] font-bold xl:px-4">Aptitude Quiz</h1>
      <div className="my-3 flex max-w-[1120px] flex-col items-center justify-between lg:flex-row">
        {/* <span
          className={`px-1 py-3 text-xl font-normal xl:px-4 ${timeLeft <= 5 * 60 ? 'text-[#EA4335]' : 'text-[#0F9D58]'}`}
        >
          {formatTime(timeLeft)}
        </span> */}
        <span className="flex max-h-11 rounded-lg border border-[#B0B0B0] bg-white xl:mr-5">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-white px-4 py-2 text-black hover:text-white"
                onClick={openFinishTestDialog}
              >
                Finish Test
              </Button>
            </DialogTrigger>
            <DialogContent
              className="grid max-h-[310px] max-w-[425px] items-center rounded-sm align-middle"
              aria-describedby="dialog-description"
            >
              <div>
                <DialogTitle className="my-5 ml-[40%] text-red-500">
                  <TriangleAlert className="h-[70px] w-[70px]" />
                </DialogTitle>
                <div id="dialog-description">
                  Are you sure you want to finish the quiz before time?
                </div>
              </div>
              <div className="grid gap-4 py-4"></div>
              <div className="flex justify-between">
                <Button
                  onClick={handleSubmitTest}
                  className="bg-white text-red-500 hover:text-white"
                >
                  Yes, Finish
                </Button>
                <Button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-sm bg-[#635BFF] px-2 py-1 text-white"
                >
                  No, Continue
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </span>
      </div>

      <div className="grid gap-6 lg:flex">
        <div className="max-w-full lg:max-w-[640px]">
          <div className="max-h-[155px] rounded-md bg-white p-5 lg:h-[155px] lg:w-[740px]">
            <h3 className="mb-4 text-xl text-[#100C2C]">Question {currentQuestionIndex + 1}</h3>
            <p className="text-[16px] text-[#3D3D3D]">
              {currentQuestion?.questionText || 'Loading...'}
            </p>
          </div>

          <div className="mt-4 rounded-md bg-white p-5">
            <FormProvider {...form}>
              <Form {...form}>
                {currentQuestion && (
                  <FormTextArea
                    name={`answers.${currentQuestion.id}`}
                    placeholder="Type your answer here..."
                    className="min-h-[150px] w-full"
                    onInputChange={(value) => handleTextAnswerChange(currentQuestion.id, value)}
                    value={textAnswers[currentQuestion?.id] || ''}
                  />
                )}
              </Form>
            </FormProvider>
          </div>

          <div className="mr-3 mt-20 flex flex-col justify-between sm:mr-0 sm:flex-row">
            <Button
              onClick={prevQuestion}
              className="mb-3 h-[44px] w-full rounded-md bg-[#F1F1F1] text-[16px] font-medium text-black sm:w-[110px] xl:mb-0"
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            <div className="mb-5 flex h-[46px] w-full flex-col gap-3 rounded-md sm:mb-0 sm:max-w-[286px] sm:flex-row sm:gap-6 xl:h-[44px]">
              {currentQuestion?.id && (
                <Button
                  className={`flex h-full items-center gap-2 rounded-sm sm:w-[112px] ${reviewedQuestions.has(currentQuestion.id) ? 'bg-[#F3B153] px-2 text-white' : 'bg-white px-6 text-[#3D3D3D]'}`}
                  onClick={() => handleMarkForReview(currentQuestion.id)}
                >
                  <Bookmark
                    className={`h-4 w-4 ${reviewedQuestions.has(currentQuestion.id) ? 'text-white' : 'text-black'}`}
                  />
                  <span className="text-[16px] font-medium leading-4">
                    {reviewedQuestions.has(currentQuestion.id) ? 'Marked' : 'Mark'}
                  </span>
                </Button>
              )}
              <Button
                className="h-[44px] rounded-md bg-[#635BFF] py-3 text-[16px] font-medium leading-4 text-white sm:w-[150px]"
                onClick={nextQuestion}
                disabled={currentQuestionIndex === displayedQuestions.length - 1}
              >
                Save and Next
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-5 p-2 lg:ml-20 lg:w-[360px] xl:ml-14 xl:w-[400px]">
          <h1>Aptitude Test</h1>
          <p className="h-[17px] text-[14px] font-normal leading-4 text-[#6D6D6D]">Attempt all</p>
          <ul className="mb-[28px] flex h-[17px] w-[325px] list-inside list-none gap-5 xl:w-[360px]">
            <li className="flex h-[17px] w-[100px] items-center text-[#56BA85]">
              <Circle className="mr-2 h-2 w-2 rounded-full bg-[#56BA85]" />
              <span className="decoration-skip-ink-none text-[14px] leading-4 tracking-[0.02em] text-[#6D6D6D]">
                {' '}
                {totalAnswered} answered
              </span>
            </li>
            <li className="flex h-[17px] w-[94px] items-center text-[#F3B153]">
              <Circle className="mr-2 h-2 w-2 rounded-full bg-[#F3B153]" />
              <span className="decoration-skip-ink-none text-[14px] leading-4 tracking-[0.02em] text-[#6D6D6D]">
                {' '}
                {totalMarked} marked
              </span>
            </li>
            <li className="flex h-[17px] w-[120px] items-center text-black">
              <Circle className="mr-2 h-2 w-2" />
              <span className="text-[14px] leading-4 tracking-[0.02em] text-[#6D6D6D]">
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
                <div key={i} className="relative">
                  <Button
                    type="button"
                    onClick={() => {
                      setActiveTab(i);
                      setCurrentQuestionIndex(i);
                    }}
                    className={`size-12 border-[#D2D6D9] text-sm text-white hover:bg-black/5 ${isAnswered && isMarked ? 'rounded-full bg-[#56BA85]' : ''} ${isMarked && !isAnswered ? 'rounded-full bg-[#F3B153]' : ''} ${isAnswered && !isMarked ? 'rounded-full bg-[#56BA85]' : ''} ${!isAnswered && !isMarked ? 'rounded-md border bg-white text-black' : ''} ${activeTab === i ? 'border-[1.5px] border-[#3D3D3D]' : ''} `}
                  >
                    {isAnswered && isMarked && (
                      <div className="absolute bottom-0 right-0 rounded-full border bg-[#F3B153] p-1">
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
    </div>
  );
};

export default AptitudeQuiz;
