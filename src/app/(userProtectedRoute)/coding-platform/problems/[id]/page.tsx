'use client';

import {
  BookCheckIcon,
  BookIcon,
  Code2Icon,
  LogsIcon,
  PlayIcon,
  Router,
  UploadCloud,
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useMediaQuery } from 'react-responsive';
// Internal Imports
import { postApi } from '@/api/api';
import { apiEndPoints } from '@/api/apiEndpoints';
import CodeEditor from '@/components/common/code-editor';
import { RunResultDialog } from '@/components/common/run-result-dialog';
import { SlideModal } from '@/components/common/slide-modal';
import { SubmissionResultDialog } from '@/components/common/submission-result-dialog';
import { Button } from '@/components/ui/button';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
// Constants and Utils
import { statusCode } from '@/constants/apiStatus';
import {
  firstYearProblems,
  secondYearProblems,
  ProblemsInterface,
} from '@/constants/coding-problems';
import { languagesData } from '@/constants/languageData';
import { toast } from '@/hooks/use-toast';
import { handleToastApiResponse } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import useUsersStore from '@/stores/userStore';

const EditorPage = () => {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResultDialogOpen, setIsResultDialogOpen] = useState(false);
  const [isRunResultDialogOpen, setIsRunResultDialogOpen] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<any>(null);
  const [runResult, setRunResult] = useState<any>(null);
  const [userYear, setUserYear] = useState<number | undefined | null>();
  const [problems, setProblems] = useState<ProblemsInterface[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  // Code & Language States
  const [code, setCode] = useState<string>('Select a language to start coding');
  const [languageSelected, setLanguageSelected] = useState<string | undefined>();
  const [selectedValue, setSelectedValue] = useState<string | undefined>();
  const [output, setOutput] = useState<string>('');

  // Determine the selected language object
  const selectedLanguage = languageSelected
    ? languagesData.find((lang) => lang.id === parseInt(languageSelected))
    : undefined;

  // Media query for responsiveness
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  // URL Params
  const problemId = Number(id);
  const problem: ProblemsInterface | undefined =
    Number(userYear) === 1
      ? firstYearProblems.find((p) => p.id === problemId)
      : secondYearProblems.find((p) => p.id === problemId);

  // Handle language select change
  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    setLanguageSelected(value);
  };

  // Editor change handler
  const handleOnEditorChange = (value: string) => {
    setCode(value);
  };

  // Submit code function
  const submitCode = async () => {
    if (selectedLanguage?.id && userYear) {
      try {
        setIsSubmitting(true);
        const { status, data } = await postApi(apiEndPoints.codingPlatform.submitCode, {
          questionId: id,
          code: code,
          languageId: selectedLanguage.id,
          year: userYear,
        });

        if (status === statusCode.Created201 || status === statusCode.Ok200) {
          // Format the data to match the expected structure
          const formattedResult = {
            success: true,
            message: 'Submission successful',
            data: {
              allTestsPassed: data.data.allTestsPassed || false,
              passedTestCount: data.data.passedTestCount || 0,
              totalTests: data.data.totalTests || 0,
              testResults: data.data.testResults || [],
              timeElapsed: data.data.timeElapsed || 0,
            },
          };

          setSubmissionResult(formattedResult);
          setIsResultDialogOpen(true);

          // Simplified output showing only tests passed
          const resultSummary = `Tests Passed: ${formattedResult.data.passedTestCount}/${formattedResult.data.totalTests}`;
          setOutput(resultSummary);
        } else {
          handleToastApiResponse(status, data);
        }
      } catch (error) {
        console.error('Error submitting code:', error);
        toast({
          title: 'Error',
          description: 'An error occurred while submitting your code.',
          variant: 'destructive',
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      toast({
        title: 'Please select a language and year',
        description: 'Please select a language and year to submit the code',
        variant: 'destructive',
      });
    }
  };

  const runCode = async () => {
    if (selectedLanguage?.id && userYear) {
      try {
        setIsRunning(true);
        const { status, data } = await postApi(apiEndPoints.codingPlatform.runCode, {
          questionId: id,
          code: code,
          languageId: selectedLanguage.id,
          year: userYear,
        });

        if (status === statusCode.Created201 || status === statusCode.Ok200) {
          setRunResult(data.data);
          setIsRunResultDialogOpen(true);

          // Simplified output for run results
          const runOutput = `Status: ${data.data.status.description}`;
          setOutput(runOutput);
        } else {
          handleToastApiResponse(status, data);
        }
      } catch (error) {
        console.error('Error running code:', error);
        toast({
          title: 'Error',
          description: 'An error occurred while running your code.',
          variant: 'destructive',
        });
      } finally {
        setIsRunning(false);
      }
    } else {
      toast({
        title: 'Please select a language and year',
        description: 'Please select a language and year to run the code',
        variant: 'destructive',
      });
    }
  };

  // Set boilerplate code when language changes
  useEffect(() => {
    if (selectedLanguage) {
      setCode(selectedLanguage.boilerPlateCode || 'Select a language to start coding');
    }
  }, [selectedLanguage]);

  useEffect(() => {
    const year = useUsersStore.getState().user?.year;
    setUserYear(Number(year));
    if (Number(year) === 1) {
      setProblems(firstYearProblems);
    } else if (Number(year) === 2) {
      setProblems(secondYearProblems);
    }
    if (!year) {
      toast({
        title: 'Year Not Selected',
        description: 'Please select your year in edit profile page to continue',
        variant: 'destructive',
      });
      router.push('/dashboard/profile');
    }
  }, [router]);

  useEffect(() => {
    if (parseInt(id) > 10) {
      toast({
        title: 'Invalid Problem ID',
        description: 'Please select a valid problem',
        variant: 'destructive',
      });
      router.push('/coding-platform/problems/1');
    }
  }, [id, router]);

  const handleFinish = () => {
    const currentProblemIndex = problems.findIndex((p) => p.id === problemId);
    if (currentProblemIndex < problems.length - 1) {
      // Navigate to the next problem
      router.push(`/coding-platform/problems/${problems[currentProblemIndex + 1].id}`);
    } else {
      // Show completion message
      toast({
        title: 'Congratulations!',
        description: 'You have completed all the problems in this section.',
        variant: 'success',
      });
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="flex flex-col justify-between gap-2 p-4 md:flex-row md:items-center md:gap-0">
        <div>
          <Button variant="outline" onClick={() => setIsModalOpen(true)} className="w-full">
            <LogsIcon />
            Problem list
          </Button>
          <SlideModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Problem List"
            description="Problems are numbered by difficulty, allowing you to progress from simple to complex."
            position="left"
            size="md"
          >
            <div className="flex flex-col gap-4">
              {problems.map((p, index) => (
                <Link
                  href={`${p.id}`}
                  key={p.id}
                  className={cn(
                    'group flex flex-col gap-2 rounded-lg border bg-neutral-50 px-4 py-3 transition-colors hover:bg-gray-200',
                    problemId === p.id && 'bg-gray-700 text-white hover:bg-gray-800',
                  )}
                >
                  <h2>
                    {index + 1}. {p.title}
                  </h2>
                  <div className="flex gap-1">
                    {p.tags &&
                      p.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="h-5 w-fit rounded-md bg-gray-200 px-2 font-sans text-xs text-gray-600 transition-colors group-hover:bg-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                </Link>
              ))}
            </div>
          </SlideModal>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="w-full px-8" onClick={runCode} disabled={isRunning}>
            {isRunning ? (
              <div className="flex items-center">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                <span className="ml-2">Running...</span>
              </div>
            ) : (
              <>
                <PlayIcon /> Run
              </>
            )}
          </Button>
          <Button
            className="w-full bg-success px-8 transition hover:bg-green-600"
            onClick={submitCode}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                <span className="ml-2">Submitting...</span>
              </div>
            ) : (
              <>
                <UploadCloud /> Submit
              </>
            )}
          </Button>
        </div>

        <Button onClick={handleFinish} variant="outline" className="px-8">
          Finish
        </Button>
      </div>

      {/* Main Section */}
      <div className="mb-10 h-[85vh] w-full md:mb-0">
        <ResizablePanelGroup
          direction={isMobile ? 'vertical' : 'horizontal'}
          className="h-screen px-2 sm:px-4"
        >
          {/* Description Panel */}
          <ResizablePanel
            defaultSize={isMobile ? 50 : 38}
            className="rounded-lg border bg-neutral-100 pb-2"
          >
            <h1 className="flex items-center gap-2 border-b bg-gray-200 px-4 py-[10px] font-medium text-black">
              <BookIcon size={16} />
              Description
            </h1>
            <div className="h-full overflow-y-auto p-4 pb-24 sm:p-6">
              {problem ? (
                <>
                  <div className="my-4 flex flex-wrap items-center gap-2">
                    <h1 className="text-xl font-medium">
                      {userYear === 1 ? problem.id : problem.id - 5}. {problem.title}
                    </h1>
                    {problem.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg bg-gray-200 px-3 py-1 font-sans text-xs capitalize"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {/* <p className="mb-4 text-[18px] text-gray-600">{problem.content}</p> */}

                  <div className="font-sans tracking-tight text-gray-600">
                    <ReactMarkdown>{problem.content}</ReactMarkdown>
                  </div>

                  {problem.inputConstraints && (
                    <div className="mt-5">
                      <h2 className="font-medium">Input Constraints :</h2>
                      <div className="text-md font-sans tracking-tight text-gray-600">
                        <ReactMarkdown>{problem.inputConstraints}</ReactMarkdown>
                      </div>
                    </div>
                  )}
                  {problem.outputConstraints && (
                    <div className="mt-5">
                      <h2 className="font-medium">Output Constraints :</h2>
                      <div className="text-md font-sans tracking-tight text-gray-600">
                        <ReactMarkdown>{problem.outputConstraints}</ReactMarkdown>
                      </div>
                    </div>
                  )}
                  <div className="mt-5">
                    {problem.example.map((ex) => (
                      <div key={ex.id} className="my-4">
                        <h2 className="font-medium">Example: {ex.id}</h2>
                        <div className="my-1 rounded-lg border bg-white p-4">
                          <span className="font-medium">Input:</span>
                          <div className="font-sans tracking-tight text-gray-600">
                            <ReactMarkdown>{ex.input}</ReactMarkdown>
                          </div>

                          <span className="font-medium">Output:</span>
                          <div className="font-sans tracking-tight text-gray-600">
                            <ReactMarkdown>{ex.output}</ReactMarkdown>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div>Loading problem</div>
              )}
            </div>
          </ResizablePanel>

          <ResizableHandle
            className={isMobile ? 'my-1 h-1 bg-transparent' : 'w-1 bg-transparent'}
          />

          {/* Code Panel */}
          <ResizablePanel defaultSize={isMobile ? 50 : 62}>
            <ResizablePanelGroup direction="vertical" className="h-full">
              <ResizablePanel defaultSize={65} className="overflow-hidden rounded-lg border pb-2">
                <div className="flex justify-between border-b bg-gray-200 px-4 py-1 text-black">
                  <h1 className="flex items-center gap-2 font-medium">
                    <Code2Icon size={16} />
                    Code
                  </h1>
                  <Select value={selectedValue} onValueChange={handleValueChange}>
                    <SelectTrigger className="w-fit border-neutral-400">
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {languagesData.map((language) => (
                          <SelectItem key={language.id} value={String(language.id)}>
                            {language.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full">
                  <CodeEditor
                    handleOnEditorChange={handleOnEditorChange}
                    code={code}
                    language={selectedLanguage?.monacoLanguage}
                  />
                </div>
              </ResizablePanel>

              <ResizableHandle className="h-1 bg-transparent" />

              {/* Test Result Panel */}
              <ResizablePanel defaultSize={35} className="mt-1 rounded-lg border bg-neutral-100">
                <h1 className="flex items-center gap-2 border-b bg-gray-200 px-4 py-[10px] font-medium text-black">
                  <BookCheckIcon size={16} />
                  Test Result
                </h1>
                <div className="flex h-full items-center justify-center p-6">
                  <span className="font-semibold">{output}</span>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Submission Result Dialog */}
      <SubmissionResultDialog
        isOpen={isResultDialogOpen}
        onClose={() => setIsResultDialogOpen(false)}
        result={submissionResult}
      />

      {/* Run Result Dialog */}
      <RunResultDialog
        isOpen={isRunResultDialogOpen}
        onClose={() => setIsRunResultDialogOpen(false)}
        result={runResult}
      />
    </>
  );
};

export default EditorPage;
