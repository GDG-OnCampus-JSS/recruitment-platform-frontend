'use client';
import { Button } from '@/components/ui/button';
import { CircleCheck, Router } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Submitted = () => {
  const router = useRouter();
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="grid h-[295px] max-w-[526px] justify-center align-middle">
        <div className="flex justify-center gap-12 rounded-md px-11 py-8 align-middle text-[#0F9D58]">
          <CircleCheck className="h-12 w-12 text-green-500" />{' '}
          <span className="leading-11 font-product-sans text-[37px]">Submitted</span>
        </div>
        <div className="grid h-[70px] w-[526px] gap-3">
          <div className="text-center text-[28px] font-medium leading-8">
            Thank you for taking the quiz.
          </div>
          <div className="text-center font-product-sans text-[20px] font-medium leading-6 text-[#9CA7FF]">
            Stay tuned for the results
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            variant="outline"
            type="button"
            className="h-12 w-44 cursor-pointer rounded-lg border-none bg-[#635BFF] px-4 py-[14px] text-[16px] font-light text-white"
            onClick={() => router.push(`/dashboard`)}
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Submitted;
