'use client';
import axios from 'axios';
import { Circle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

interface Option {
  id: string;
  optionText: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  questionShortDesc: string;
  options: Option[];
}

interface QuizListProps {
  answeredCount: number;
  unansweredCount: number;
  markedCount: number;
  questionsCount: number;
}

const QuizList: React.FC<QuizListProps> = ({
  answeredCount,
  unansweredCount,
  markedCount,
  questionsCount,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const aptitudeId = searchParams.get('aptitudeId');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [responses, setResponses] = useState<{ [key: string]: string }>({});
  const [reviewedQuestions, setReviewedQuestions] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!aptitudeId) return;

    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`/api/questions/question-aptitude/${aptitudeId}`);
        setQuestions(response.data.data);
      } catch (error) {
        console.error('Error fetching questions', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [aptitudeId]);

  const getQuestionStatus = (questionId: string) => {
    if (reviewedQuestions.has(questionId)) {
      return 'reviewed';
    }
    if (responses[questionId]) {
      return 'attempted';
    }
    return 'not-attempted';
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-[459px] max-w-[360px] rounded-sm bg-white">
      <div className="ml-5 mt-6 grid h-[44px] w-[157px] gap-2">
        <h3 className="h-[19px] text-[16px] font-normal leading-[19.41px]">Design-Aptitude Test</h3>
        <p className="h-[17px] text-[14px] font-normal leading-4 text-[#6D6D6D]">Attempt all</p>
      </div>

      <div className="my-[28px] ml-2 h-[321px] w-[335px]">
        <ul className="mb-[28px] flex h-[17px] w-[325px] list-inside list-none gap-5">
          <li className="flex h-[17px] w-[100px] items-center text-[#56BA85]">
            <Circle className="mr-2 h-2 w-2 rounded-full bg-[#56BA85]" />
            <span className="decoration-skip-ink-none text-[14px] leading-4 tracking-[0.02em] text-[#6D6D6D]">
              {' '}
              {answeredCount} answered
            </span>
          </li>
          <li className="flex h-[17px] w-[94px] items-center text-[#F3B153]">
            <Circle className="mr-2 h-2 w-2 rounded-full bg-[#F3B153]" />
            <span className="decoration-skip-ink-none text-[14px] leading-4 tracking-[0.02em] text-[#6D6D6D]">
              {' '}
              {markedCount} marked
            </span>
          </li>
          <li className="flex h-[17px] w-[120px] items-center text-black">
            <Circle className="mr-2 h-2 w-2" />
            <span className="text-[14px] leading-4 tracking-[0.02em] text-[#6D6D6D]">
              {' '}
              {unansweredCount} unanswered
            </span>
          </li>
        </ul>

        <div className="grid h-[276px] w-[321px] grid-cols-5 gap-6">
          {questions.map((question, index) => {
            const status = getQuestionStatus(question.id);
            return (
              <div
                key={question.id}
                className={`flex h-12 w-12 items-center justify-center border text-[14px] leading-4 tracking-[0.02em] text-[#100C2C] ${status === 'not-attempted' ? 'rounded-sm bg-gray-400' : ''} ${status === 'attempted' ? 'rounded-full bg-[#56BA85]' : ''} ${status === 'reviewed' ? 'rounded-full bg-[#F3B153]' : ''}`}
                onClick={() => router.push(`/quiz/${aptitudeId}?questionId=${question.id}`)}
              >
                {index + 1}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuizList;
