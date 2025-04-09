import Link from 'next/link';

export const ProgrammingTask = () => {
  return (
    <div className="mt-10 space-y-8 text-center">
      <h2 className="pb-2 text-[28px] font-bold text-theme">Programming Club Contest</h2>
      <div className="space-y-6">
        <div className="mx-auto max-w-2xl">
          <p className="text-[16px] font-normal leading-[25.6px] text-[#353535]">
            Programming club members are required to participate in our ongoing coding contest
            instead of submitting regular tasks. Showcase your problem-solving skills and compete
            with peers for top rankings!
          </p>

          <div className="mt-8">
            <Link
              href="/dashboard"
              className="inline-block rounded-md bg-[#635BFF] px-8 py-4 text-base font-medium text-white transition hover:bg-[#564FE1]"
            >
              Back to dashboard
            </Link>
          </div>

          <p className="mt-4 text-sm text-[#6B7280]">
            Contest link will be active during event hours
          </p>
        </div>
      </div>
    </div>
  );
};
