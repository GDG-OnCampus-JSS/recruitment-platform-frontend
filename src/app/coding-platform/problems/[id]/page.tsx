'use client';

import { BookCheckIcon, BookIcon, Code2Icon, LogsIcon, PlayIcon, UploadCloud } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
// Internal Imports
import { postApi } from '@/api/api';
import CodeEditor from '@/components/common/code-editor';
import { SlideModal } from '@/components/common/slide-modal';
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
import { problems, Problems } from '@/constants/coding-problems';
import { languagesData } from '@/constants/languageData';
import { cn } from '@/lib/utils';

const EditorPage = () => {
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Media query for responsiveness
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  // URL Params
  const { id } = useParams() as { id: string };
  const problemId = Number(id);
  const problem: Problems | undefined = problems.find((p) => p.id === problemId);

  // Code & Language States
  const [code, setCode] = useState<string>('Select a language to start coding');
  const [languageSelected, setLanguageSelected] = useState<string | undefined>();
  const [selectedValue, setSelectedValue] = useState<string | undefined>();
  const [output, setOutput] = useState<string>('');

  // Determine the selected language object
  const selectedLanguage = languageSelected
    ? languagesData.find((lang) => lang.id === parseInt(languageSelected))
    : undefined;

  // Handle language select change
  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    setLanguageSelected(value);
  };

  // Set boilerplate code when language changes
  useEffect(() => {
    if (selectedLanguage) {
      setCode(selectedLanguage.boilerPlateCode || 'Select a language to start coding');
    }
  }, [selectedLanguage]);

  // Editor change handler
  const handleOnEditorChange = (value: string) => {
    setCode(value);
  };

  // Submit code function
  const submitCode = async () => {
    if (selectedLanguage) {
      const { status, data } = await postApi(
        'http://13.233.100.121:2358/submissions/?base64_encoded=false&wait=true',
        {
          source_code: code,
          language_id: selectedLanguage.id,
        },
      );
      if (status === statusCode.Created201) {
        setOutput(data.stdout || data.compile_output || data.message || 'No output');
      }
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
              {problems.map((p) => (
                <Link
                  href={`${p.id}`}
                  key={p.id}
                  className={cn(
                    'group flex flex-col gap-2 rounded-lg border bg-neutral-50 px-4 py-3 transition-colors hover:bg-gray-200',
                    problemId === p.id && 'bg-gray-700 text-white hover:bg-gray-800',
                  )}
                >
                  <h2>
                    {p.id}. {p.title}
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
          <Button variant="outline" className="w-full px-8">
            <PlayIcon /> Run
          </Button>
          <Button
            className="w-full bg-success px-8 transition hover:bg-green-600"
            onClick={submitCode}
          >
            <UploadCloud /> Submit
          </Button>
        </div>

        <Button onClick={submitCode} variant="outline" className="px-8">
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
                  <h1 className="mb-2 text-xl font-medium">
                    {problem.id}. {problem.title}
                  </h1>
                  <div className="my-2 flex flex-wrap gap-2">
                    {problem.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg bg-gray-200 px-3 py-1 font-sans text-xs capitalize"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="mb-4 text-gray-600">{problem.content}</p>
                  <div className="mt-10">
                    {problem.example.map((ex) => (
                      <div key={ex.id} className="my-4">
                        <h2 className="font-medium">Example: {ex.id}</h2>
                        <div className="my-1 rounded-lg border bg-white p-4">
                          <p>
                            <span className="font-medium">Input:</span> {ex.input}
                          </p>
                          <p>
                            <span className="font-medium">Output:</span> {ex.output}
                          </p>
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
    </>
  );
};

export default EditorPage;
