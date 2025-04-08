'use client';
import { Bookmark, Circle, TriangleAlert } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { getApi, getByParamsApi, postApi } from '@/api/api';
import { apiEndPoints } from '@/api/apiEndpoints';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { statusCode } from '@/constants/apiStatus';
import { mockUser } from '@/lib/options';
import { mockAptitude } from '@/lib/options';
import { User } from '@/lib/types';
import useUserStore from '@/stores/userStore';

type optionType = {
  id: string;
  optionText: string;
  isCorrect: boolean;
};

const AptitudeQuiz = () => {
  const user = useUserStore((state) => state.user);
  const displayUser = (user || mockUser) as User;
  const [activeTab, setActiveTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [reviewedQuestions, setReviewedQuestions] = useState<Set<string>>(new Set());

  const aptitudeDomain = 'ML';
  const aptitudeYear = '1';
  const params = { aptitudeYear, aptitudeDomain };

  const [allAptitudes, setAllAptitudes] = useState<any[]>([]);
  const [aptitudeQuestions, setAptitudeQuestions] = useState<any[]>([]);
  const [error, setError] = useState<string>('');

  // const [allQuestions, setAllQuestions] = useState(mockAptitude.aptitudes[0].aptitudeQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});

  const currentQuestion = aptitudeQuestions[currentQuestionIndex];

  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [isTimerFinished, setIsTimerFinished] = useState(false);

  const totalMarked = reviewedQuestions.size;
  const totalQuestions = aptitudeQuestions.length;
  const totalAnswered = aptitudeQuestions.filter((question) => selectedOptions[question.id]).length;

  const fetchAptitudeId = async () => {
    try {
      console.log(apiEndPoints.userAptitude.getAptitudes);
      const { status, data } = await getApi(
        `http://localhost:5000/users/aptitude?aptitudeYear=1&aptitudeDomain=ML`,
      );
      // await getByParamsApi(apiEndPoints.userAptitude.getAptitudes, params);
      //const { status, data } = await ApiRoutes.getAllAptitudes(params);
      if (status === 200 && data) {
        setAllAptitudes(data.aptitude || []);
        setAptitudeQuestions(
          data.aptitudes.flatMap((aptitude: any) => aptitude.aptitudeQuestions) || [],
        );
      } else {
        setAllAptitudes(mockAptitude.aptitudes);
        setAptitudeQuestions(
          mockAptitude.aptitudes.flatMap((aptitude: any) => aptitude.aptitudeQuestions),
        );
      }
    } catch (error: any) {
      console.error('Error fetching aptitudes:', error);
      setError('Failed to fetch aptitudes');
      setAllAptitudes(mockAptitude.aptitudes);
      setAptitudeQuestions(
        mockAptitude.aptitudes.flatMap((aptitude: any) => aptitude.aptitudeQuestions),
      );
    }
  };

  const handleOptionSelect = (questionId: string, optionId: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleMarkForReview = (questionId: string) => {
    setReviewedQuestions((prev) => {
      const updated = new Set(prev);
      updated.has(questionId) ? updated.delete(questionId) : updated.add(questionId);
      return new Set(updated);
    });
  };

  const calculateScore = (questions: any[]) => {
    let score = 0;
    questions.forEach((question) => {
      const selectedOptionId = selectedOptions[question.id];
      const correctOption = question.options.find((option: any) => option.isCorrect);
      if (selectedOptionId && correctOption && selectedOptionId === correctOption.id) {
        score += 1;
      }
    });
    return score;
  };

  const handleSubmitTest = async () => {
    setIsModalOpen(false);
    const score = calculateScore(aptitudeQuestions);
    console.log(displayUser.id);
    console.log(score);
    const { status, data } = await postApi(
      apiEndPoints.userAptitudeDetails.createUserAptitudeDetails,
      {
        userId: displayUser.id,
        aptitudeScore: score,
      },
    );

    if (status === statusCode.Ok200) {
      console.log('Score sent successfully!');
      window.open(`/quiz/aptitude/submitted`, '_self');
    } else {
      console.error('Failed to send score');
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < aptitudeQuestions.length - 1) {
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

  useEffect(() => {
    fetchAptitudeId();
  }, []);

  //timer
  useEffect(() => {
    if (timeLeft === 0) {
      setIsTimerFinished(true);
      handleSubmitTest();
      return;
    }
    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(timerInterval);
  }, [timeLeft]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  const openFinishTestDialog = () => {
    if (timeLeft > 0) {
      setIsModalOpen(true);
    } else {
      handleSubmitTest();
    }
  };

  return (
    <div className="w-screen py-4 pt-10 lg:h-full">
      <h1 className="my-4 text-left text-[20px] font-bold">Aptitude Quiz</h1>
      <div className="my-3 flex max-w-[1120px] flex-col items-center justify-between lg:flex-row">
        <span
          className={`px-1 py-3 text-xl font-normal ${timeLeft <= 5 * 60 ? 'text-[#EA4335]' : 'text-[#0F9D58]'}`}
        >
          {formatTime(timeLeft)}
        </span>
        <span className="flex max-h-11 rounded-lg border border-[#B0B0B0] bg-white">
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
              <div className="grid gap-4 py-4">
                <div className="text-red-500">Remaining time: {formatTime(timeLeft)}</div>
              </div>
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
        <div className="max-w-full lg:max-w-[740px]">
          <div className="max-h-[155px] rounded-md bg-white p-5 lg:h-[155px] lg:w-[740px]">
            <h3 className="mb-4 text-xl text-[#100C2C]">Question {currentQuestionIndex + 1}</h3>
            <p className="text-[16px] text-[#3D3D3D]">
              {currentQuestion?.questionShortDesc || 'Loading'}
            </p>
          </div>

          <ul className="mt-4 grid grid-cols-1 gap-4 text-[#3D3D3D] md:grid-cols-2 lg:grid-cols-2">
            {currentQuestion?.options.map((option: optionType) => (
              <li
                key={option.id}
                className="flex h-12 items-center gap-2 rounded-md bg-white px-5 py-[14px]"
              >
                <input
                  type="radio"
                  id={option.id}
                  className="h-4 w-4 border-2"
                  name={`question-${currentQuestion.id}`}
                  value={option.id}
                  checked={selectedOptions[currentQuestion.id] === option.id}
                  onChange={() => handleOptionSelect(currentQuestion.id, option.id)}
                />
                <label htmlFor={option.id} className="text-[16px]">
                  {option.optionText}
                </label>
              </li>
            ))}
          </ul>

          <div className="mt-20 flex flex-col justify-between md:flex-row lg:flex-row">
            <Button
              onClick={prevQuestion}
              className="mb-2 h-[44px] w-[110px] rounded-sm bg-[#F1F1F1] text-[16px] font-medium text-black"
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            <div className="flex max-h-[44px] max-w-[286px] gap-6">
              {currentQuestion?.id && (
                <Button
                  className={`flex w-[112px] items-center gap-2 rounded-sm border py-3 ${reviewedQuestions.has(currentQuestion.id) ? 'bg-[#F3B153] px-2 text-white' : 'bg-white px-6 text-[#3D3D3D]'}`}
                  onClick={() => handleMarkForReview(currentQuestion.id)}
                >
                  <Bookmark
                    className={`${reviewedQuestions.has(currentQuestion.id) ? 'text-white' : 'text-black'}`}
                  />
                  <span className="text-[16px] font-medium leading-4">
                    {reviewedQuestions.has(currentQuestion.id) ? 'Marked' : 'Mark'}
                  </span>
                </Button>
              )}
              <Button
                className="h-[44px] w-[150px] rounded-sm bg-[#635BFF] py-3 text-[16px] font-medium leading-4 text-white"
                onClick={nextQuestion}
                disabled={currentQuestionIndex === aptitudeQuestions.length - 1}
              >
                Save and Next
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-5 p-2 lg:ml-20 lg:w-[360px]">
          <h1>Aptitude Test</h1>
          <p className="h-[17px] text-[14px] font-normal leading-4 text-[#6D6D6D]">Attempt all</p>
          <ul className="mb-[28px] flex h-[17px] w-[325px] list-inside list-none gap-5">
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
              const isAnswered = selectedOptions[aptitudeQuestions[i]?.id];
              const isMarked = reviewedQuestions.has(aptitudeQuestions[i]?.id);
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
