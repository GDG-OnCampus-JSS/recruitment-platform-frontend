'use client';
import Footer from '@/components/dashboardlayout/footer';
import Header from '@/components/dashboardlayout/header';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Quiz() {
  const router = useRouter();
  return (
    <div>
      <Header />
      <div className="mt-14 bg-[#fff] p-[20px] h-screen lg:h-full">
        <div className="flex justify-between">
          <button className="rounded-3xl border px-2 py-1">
            <Link href="/dashboard" className="flex">
              <ChevronLeft /> Back
            </Link>
          </button>
          <span className="font-semibold">Aptitude Quiz</span>
        </div>
        <div className="mx-auto my-4 lg:mt-auto grid max-h-[440px] max-w-[650px] gap-[10px] rounded-xl border px-8 py-6 lg:py-4 shadow-xl">
          <div className="flex max-h-[22px] justify-between text-[#432AD8]">
            <div className="">
              <span className="max-w-[123px] text-[18px]">Selected Year:</span>
              {/* font-[product sans] */}
              <span className="border-[1px] border-[#ccc] px-3 py-1 text-[18px]">1st</span>
            </div>
            <div className="text-[18px]">
              <span className="">Selected Domain:</span>
              <span className="border border-[#ccc] px-3 py-1">Design</span>
            </div>
          </div>
          <div className="h-70 w-140">
            <h1 className="mb-4 mt-2 text-[26px] font-medium leading-[33.96px] text-[#1E1650]">
              Guidelines
            </h1>
            <ul className="grid list-disc gap-y-[16px] pl-8 text-justify text-[18px] font-normal leading-[24.26px] text-[#1E1650]">
              <li className="">This is a timed quiz. You will only get 30 mins to complete it.</li>
              <li className="text-[#EA4335]">
                You are not allowed to exit full screen mode, if you do, you will be disqualified.
              </li>
              <li className="">
                This quiz contains 20 questions, try your best to attempt them all.
              </li>
              <li className="">Click "Save & Next" to save your answer.</li>
              <li className="">All the very best to you. See you later.</li>
            </ul>
          </div>

          <div className='max-w-full flex justify-center'>
          <Button
            variant="outline"
            type="button"
            className="lg:w-100 lg:px-[224px] max-h-11 px-32 cursor-pointer rounded-lg border-none bg-[#635BFF] py-[11px] font-light text-white"
            onClick={() => router.push(`/quiz/aptitude`)}
          >
            Let's Begin
          </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
