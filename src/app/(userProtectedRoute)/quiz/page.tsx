'use client';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import useUserStore from '@/stores/userStore';

export default function Quiz() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  return (
    <div className="bg-[#fff] p-5 lg:h-full lg:p-8">
      <div className="mt-7 flex h-9 items-center justify-between">
        <Button className="rounded-3xl border bg-white px-4 py-1 text-black">
          <Link href="/dashboard" className="flex items-center">
            <ChevronLeft className="mr-1" /> Back
          </Link>
        </Button>
        <span className="text-lg font-semibold lg:text-xl">Aptitude Quiz</span>
      </div>
      <div className="mx-auto my-8 max-w-[740px] rounded-xl border px-6 py-8 shadow-xl lg:h-[412px]">
        <div className="mb-4 flex flex-col justify-between text-xl leading-[1em] tracking-[0.02em] text-[#432AD8] lg:flex-row">
          <div className="mb-2 lg:mb-0">
            <span>Selected Year:</span>
            <span className="border border-[#ccc] px-3 py-1">{user?.year}</span>
          </div>
          <div>
            <span>Selected Domain:</span>
            <span className="border border-[#ccc] px-3 py-1">{user?.domain}</span>
          </div>
        </div>
        <div className="max-w-[646px] text-[#100c2c]">
          <h1 className="text-xl font-medium leading-[1em] tracking-[0.02em]">Guidelines</h1>
          <ul className="mt-2 grid list-disc gap-y-1 pl-6 text-justify text-[16px] lg:h-[157px]">
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
          className="mt-8 max-h-11 w-full cursor-pointer rounded-lg border-none bg-[#635BFF] px-8 py-2 font-light text-white lg:mt-10"
          onClick={() => router.push(`/quiz/aptitude`)}
        >
          Let's Begin
        </Button>
      </div>
    </div>
  );
}
