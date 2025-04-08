'use client';

import axios from 'axios';
import { Bookmark, TriangleAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import QuizList from './table';

interface Option {
  id: string;
  optionText: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  questionLongDesc: string;
  options: Option[];
}

const AptitudeQuestionsPage = () => {
  const router = useRouter();
  // const [searchParams, setSearchParams] = useState(
  //   () => new URLSearchParams(window.location.search),
  // );
  // const aptitudeId = searchParams.get('aptitudeId');
  // const questionId = searchParams.get('questionId');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const [responses, setResponses] = useState<{ [key: string]: string }>({});

  const [reviewedQuestions, setReviewedQuestions] = useState<Set<string>>(new Set());

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   // if (!aptitudeId) return;
  //   const fetchQuestions = async () => {
  //     // try {
  //     //   const response = await axios.get(`/api/questions/question-aptitude/${aptitudeId}`);
  //     //   setQuestions(response.data.data);
  //     // } catch (error) {
  //     //   setError('An error occurred while fetching the questions');
  //     // }
  //   };
  //   fetchQuestions();
  // }, [aptitudeId]);

  // useEffect(() => {
  //   // if (questions.length > 0 && questionId) {
  //   //   const currentQuestion = questions.find((q) => q.id === questionId);
  //   //   setCurrentQuestion(currentQuestion || null);
  //   //   setSelectedOption(responses[questionId as string] || null);
  //   // }
  // }, [questions, questionId, responses]);

  if (!currentQuestion) {
    router.push('/error');
  }

  // if (!currentQuestion) {
  //   const currQuestion = questions.find((q) => q.id === '1');
  //   setCurrentQuestion(currQuestion || null);
  //   setSelectedOption(responses[questionId as string] || null);
  // }

  //timer
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [isTimerFinished, setIsTimerFinished] = useState(false);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsTimerFinished(true);
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

  if (error) {
    return <div>{error}</div>;
  }

  const handleSubmit = async () => {
    // try {
    //   setIsModalOpen(false);
    //   await axios.post('/api/submit-responses', { aptitudeId, responses });
    //   // router.push('/quiz/aptitude/submitted');
    //   console.log('Responses submitted successfully!');
    // } catch (error) {
    //   console.log('An error occurred while submitting responses', error);
    // }
  };

  const openFinishTestDialog = () => {
    if (timeLeft > 0) {
      setIsModalOpen(true);
    } else {
      handleSubmit();
    }
  };

  const handleOptionChange = (questionId: string, optionId: string) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: optionId,
    }));
  };

  const handleMarkForReview = (questionId: string) => {
    setReviewedQuestions((prevReviewed) => {
      const updated = new Set(prevReviewed);
      if (updated.has(questionId)) {
        updated.delete(questionId);
      } else {
        updated.add(questionId);
      }
      return updated;
    });
  };

  // const handlePrevious = () => {
  //   const currentIndex = questions.findIndex((q) => q.id === currentQuestion?.id);
  //   if (currentIndex - 1 >= 0) {
  //     router.push(`/${aptitudeId}?questionId=${questions[currentIndex - 1].id}`);
  //   }
  // };

  // const handleNext = () => {
  //   const currentIndex = questions.findIndex((q) => q.id === currentQuestion?.id);
  //   if (currentIndex + 1 < questions.length) {
  //     router.push(`/${aptitudeId}?questionId=${questions[currentIndex + 1].id}`);
  //   }
  // };

  const answeredCount = questions.filter((question) => responses[question.id]).length;
  const unansweredCount = questions.filter((question) => !responses[question.id]).length;
  //total - answeredCount
  const markedCount = reviewedQuestions.size;

  return (
    <div className="h-screen w-screen bg-slate-50 px-4">
      <div className="h-screen max-w-[1120px] pt-10 lg:pl-20">
        <h1 className="decoration-skip-none my-4 text-left font-product-sans text-[20px] font-bold leading-[24.26px] underline-offset-4">
          Aptitude Quiz
        </h1>
        <div className="my-[10px] flex max-h-[44px] max-w-[1120px] items-center justify-between">
          <span
            className={`text-[20px]leading-[24.26px] px-1 py-3 font-product-sans font-normal ${timeLeft <= 5 * 60 ? 'text-[#EA4335]' : 'text-[#0F9D58]'}`}
          >
            {formatTime(timeLeft)}
          </span>
          <span className="flex max-h-[44px] max-w-[113px] rounded-lg border border-[#B0B0B0] bg-white">
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <button className="px-4 py-2" onClick={openFinishTestDialog}>
                  Finish Test
                </button>
              </DialogTrigger>
              <DialogContent className="grid max-h-[310px] max-w-[425px] items-center rounded-sm align-middle">
                <div>
                  <DialogTitle className="my-5 ml-[40%] text-red-500">
                    <TriangleAlert className="h-[70px] w-[70px]" />
                  </DialogTitle>
                  <div>Are you sure you want to finish the quiz before time?</div>
                </div>
                <div className="grid gap-4 py-4">
                  <div className="text-red-500">Remaining time: {formatTime(timeLeft)}</div>
                </div>
                <div className="flex justify-between">
                  <button onClick={handleSubmit}>Yes, Finish</button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-sm bg-[#635BFF] px-2 py-1 text-white"
                  >
                    No, Continue
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          </span>
        </div>

        <div className="grid gap-6 lg:flex">
          <div className="max-w-[740px]">
            <div className="max-h-[155px] max-w-[740px] rounded-md bg-white pl-5 pt-6 lg:h-[155px] lg:w-[740px]">
              <h3 className="text-4 mb-4 font-product-sans font-medium leading-[19.41px] text-[#100C2C]">
                Question 1
              </h3>
              <p className="text-4 font-product-sans font-normal leading-6 text-[3D3D3D]">
                {currentQuestion?.questionLongDesc || 'Loading'}
              </p>
            </div>
            <ul className="mt-[16px] grid max-w-[740px] grid-cols-2 gap-4 text-[#3D3D3D]">
              {currentQuestion?.options.map((option) => (
                <li
                  key={option.id}
                  className="max-w-90 flex h-12 items-center gap-2 rounded-md bg-white px-5 py-[14px]"
                >
                  <input
                    type="radio"
                    id={option.id}
                    className="h-4 w-4 border-2"
                    name={`question-${currentQuestion.id}`}
                    value={option.id}
                    checked={responses[currentQuestion.id] === option.id}
                    onChange={() => handleOptionChange(currentQuestion.id, option.id)}
                  />
                  <label htmlFor={option.id} className="text-[16px] font-normal leading-[19.41px]">
                    {option.optionText}
                  </label>
                </li>
              ))}
            </ul>
            <div className="top-[475px] mt-20 flex max-w-[740px] justify-between">
              <button
                // onClick={handlePrevious}
                className="h-[44px] w-[110px] rounded-sm bg-[#F1F1F1] text-[16px] font-medium leading-4 text-black"
                disabled={questions.findIndex((q) => q.id === currentQuestion?.id) === 0}
              >
                Previous
              </button>
              <div className="ml-2 flex max-h-[44px] max-w-[286px] gap-6">
                {currentQuestion?.id && (
                  <button
                    className={`flex w-[112px] items-center gap-2 rounded-sm border bg-white px-6 py-3 text-[#3D3D3D]`}
                    onClick={() => handleMarkForReview(currentQuestion.id)}
                  >
                    <Bookmark />
                    <span className="text-[16px] font-medium leading-4">Mark</span>
                  </button>
                )}

                <button
                  className="h-[44px] w-[150px] rounded-sm bg-[#635BFF] py-3 text-[16px] font-medium leading-4 text-white"
                  // onClick={handleNext}
                  disabled={
                    questions.findIndex((q) => q.id === currentQuestion?.id) ===
                    questions.length - 1
                  }
                >
                  Save and Next
                </button>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-center lg:ml-20">
            <QuizList
              answeredCount={answeredCount}
              unansweredCount={unansweredCount}
              markedCount={markedCount}
              questionsCount={questions.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AptitudeQuestionsPage;
