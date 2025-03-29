import { AllCandidates, columns } from './columns';
import { DataTable } from './data-table';

async function getData(): Promise<AllCandidates[]> {
  return [
    {
      id: '728ed52f',
      name: 'Avinash',
      year: '2nd Year',
      projectStatus: 'Submitted',
      quizResult: 19,
      interviewStatus: 'Cleared',
      shortlisted: true,
    },
    {
      id: '1a2b3c4d',
      name: 'Rahul',
      year: '1st Year',
      projectStatus: 'Not Submitted',
      quizResult: 17,
      interviewStatus: 'Not Attempted',
      shortlisted: false,
    },
    {
      id: '2b3c4d5e',
      name: 'Priya',
      year: '3rd Year',
      projectStatus: 'Submitted',
      quizResult: 12,
      interviewStatus: 'Cleared',
      shortlisted: true,
    },
    {
      id: '3c4d5e6f',
      name: 'Sakshi',
      year: '2nd Year',
      projectStatus: 'Not Submitted',
      quizResult: 14,
      interviewStatus: 'Not Cleared',
      shortlisted: false,
    },
    {
      id: '4d5e6f7g',
      name: 'Aman',
      year: '1st Year',
      projectStatus: 'Submitted',
      quizResult: 20,
      interviewStatus: 'Cleared',
      shortlisted: true,
    },
    {
      id: '5e6f7g8h',
      name: 'Neha',
      year: '3rd Year',
      projectStatus: 'Submitted',
      quizResult: 15,
      interviewStatus: 'Cleared',
      shortlisted: true,
    },
    {
      id: '6f7g8h9i',
      name: 'Vikram',
      year: '2nd Year',
      projectStatus: 'Not Submitted',
      quizResult: 18,
      interviewStatus: 'Not Attempted',
      shortlisted: false,
    },
    {
      id: '7g8h9i0j',
      name: 'Ananya',
      year: '1st Year',
      projectStatus: 'Submitted',
      quizResult: 11,
      interviewStatus: 'Cleared',
      shortlisted: true,
    },
    {
      id: '8h9i0j1k',
      name: 'Karan',
      year: '2nd Year',
      projectStatus: 'Not Submitted',
      quizResult: 12,
      interviewStatus: 'Not Cleared',
      shortlisted: false,
    },
    {
      id: '9i0j1k2l',
      name: 'Megha',
      year: '3rd Year',
      projectStatus: 'Submitted',
      quizResult: 14,
      interviewStatus: 'Cleared',
      shortlisted: true,
    },
    {
      id: '0j1k2l3m',
      name: 'Rohit',
      year: '2nd Year',
      projectStatus: 'Not Submitted',
      quizResult: 19,
      interviewStatus: 'Cleared',
      shortlisted: false,
    },
    {
      id: '1k2l3m4n',
      name: 'Simran',
      year: '1st Year',
      projectStatus: 'Submitted',
      quizResult: 13,
      interviewStatus: 'Cleared',
      shortlisted: true,
    },
    {
      id: '2l3m4n5o',
      name: 'Aryan',
      year: '3rd Year',
      projectStatus: 'Not Submitted',
      quizResult: 15,
      interviewStatus: 'Not Cleared',
      shortlisted: false,
    },
    {
      id: '3m4n5o6p',
      name: 'Tanisha',
      year: '2nd Year',
      projectStatus: 'Submitted',
      quizResult: 20,
      interviewStatus: 'Cleared',
      shortlisted: true,
    },
    {
      id: '4n5o6p7q',
      name: 'Siddharth',
      year: '1st Year',
      projectStatus: 'Not Submitted',
      quizResult: 16,
      interviewStatus: 'Not Attempted',
      shortlisted: false,
    },
    {
      id: '5o6p7q8r',
      name: 'Pooja',
      year: '3rd Year',
      projectStatus: 'Submitted',
      quizResult: 12,
      interviewStatus: 'Cleared',
      shortlisted: true,
    },
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="mt-20 flex min-h-screen items-baseline justify-center bg-white">
      <DataTable columns={columns} data={data} className="max-w-6xl" />
    </div>
  );
}
