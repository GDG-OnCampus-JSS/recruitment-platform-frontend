'use client';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import useUserStore from '@/stores/userStore';

export default function Quiz() {
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  if (user?.aptitudeStatus) {
    router.push('/dashboard/quiz/submitted');
  }

  return (
    <div className="mt-20 min-h-screen">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            className="text[#2F3B00] rounded-3xl border px-4 py-2 text-[16px] font-normal leading-5"
            onClick={() => router.back()}
          >
            <ChevronLeft /> Back
          </Button>
          <h1 className="text-xl font-medium">Aptitude Quiz</h1>
        </div>

        <Card className="mx-auto mt-12 max-w-xl p-2 sm:p-10">
          <CardHeader>
            <CardTitle className="text-2xl">Guidelines</CardTitle>
            <CardDescription>Important Instructions</CardDescription>
          </CardHeader>
          <CardContent className="text-[#100c2c]">
            <ul className="list-disc space-y-1 pl-4">
              <li>
                The quiz is available for one day - make sure to complete it within that period.
              </li>
              <li>This quiz contains 10 questions - attempt them all.</li>
              <li className="text-[#EA4335]">
                Copy-pasting or using AI for answers is strictly prohibited; users will be
                disqualified if caught.
              </li>
              <li>Click "Save & Next" to save your answer and proceed to the next question.</li>
              <li>All the very best to you. See you later!</li>
            </ul>
          </CardContent>

          <CardFooter>
            <Button
              variant="outline"
              type="button"
              className="w-full rounded-lg border-none bg-theme px-8 py-6 font-light text-white hover:bg-theme-interactive hover:text-white lg:mt-10"
              onClick={() => router.push(`/dashboard/quiz/aptitude`)}
            >
              Let's Begin
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
