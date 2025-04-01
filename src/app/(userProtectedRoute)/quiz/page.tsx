'use client';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function Quiz() {
  const router = useRouter();
  return (

    <div className="bg-[#fff] p-5 lg:p-8 lg:h-full">
      <div className="flex justify-between items-center h-9 mt-7">
        <Button className="rounded-3xl border px-4 py-1 bg-white text-black">
          <Link href="/dashboard" className="flex items-center">
            <ChevronLeft className="mr-1" /> Back
          </Link>
        </Button>
        <span className="font-semibold text-lg lg:text-xl">Aptitude Quiz</span>
      </div>
      <div className="mx-auto my-8 max-w-[740px] rounded-xl border px-6 py-8 shadow-xl lg:h-[412px]">
        <div className="flex flex-col lg:flex-row justify-between text-[#432AD8] mb-4 text-xl">
          <div className="mb-2 lg:mb-0">
            <span>Selected Year:</span>
            <span className="border border-[#ccc] px-3 py-1">1st</span>
          </div>
          <div>
            <span>Selected Domain:</span>
            <span className="border border-[#ccc] px-3 py-1">Design</span>
          </div>
        </div>
        <div className="text-[#100c2c] max-w-[646px]">
          <h1 className="text-xl font-medium">Guidelines</h1>
          <ul className="mt-2 list-disc text-justify text-[16px] pl-6 grid gap-y-1 lg:h-[157px]">
            <li>This is a timed quiz. You will only get 30 mins to complete it.</li>
            <li className="text-[#EA4335]">
              You are not allowed to exit full screen mode, if you do, you will be disqualified.
            </li>
            <li>This quiz contains 20 questions, try your best to attempt them all.</li>
            <li>Click "Save & Next" to save your answer.</li>
            <li>All the very best to you. See you later.</li>
          </ul>
        </div>

        <Button
          variant="outline"
          type="button"
          className="mt-8 lg:mt-10 w-full max-h-11 cursor-pointer rounded-lg border-none bg-[#635BFF] px-8 py-2 font-light text-white"
          onClick={() => router.push(`/quiz/aptitude`)}
        >
          Let's Begin
        </Button>
      </div>
      
    </div>
  );
}
