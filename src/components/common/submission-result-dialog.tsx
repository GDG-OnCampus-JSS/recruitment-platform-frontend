'use client';

import { CheckCircle, XCircle } from 'lucide-react';
import { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface TestResult {
  testIndex: number;
  passed: boolean;
  output?: string;
}

interface SubmissionResultData {
  allTestsPassed: boolean;
  passedTestCount: number;
  totalTests: number;
  testResults: TestResult[];
  timeElapsed: number;
}

interface SubmissionResultProps {
  isOpen: boolean;
  onClose: () => void;
  result: {
    success: boolean;
    message: string;
    data: SubmissionResultData;
  } | null;
}

export function SubmissionResultDialog({ isOpen, onClose, result }: SubmissionResultProps) {
  const { toast } = useToast();

  // console.log('Dialog Component Props:', { isOpen, result });

  useEffect(() => {
    // console.log('Dialog useEffect triggered:', { isOpen, result });

    if (result) {
      if (result.success) {
        if (result.data.allTestsPassed) {
          toast({
            title: 'Success!',
            description: 'All test cases passed.',
            variant: 'success',
          });
        } else {
          toast({
            title: 'Partial Success',
            description: `${result.data.passedTestCount}/${result.data.totalTests} test cases passed.`,
            variant: 'pending',
          });
        }
      } else {
        toast({
          title: 'Submission Failed',
          description: result.message || 'An error occurred during submission.',
          variant: 'destructive',
        });
      }
    }
  }, [result, toast]);

  // Handle case where data might be missing or in a different format
  const hasTestResults =
    result?.data && Array.isArray(result.data.testResults) && result.data.testResults.length > 0;
  const allTestsPassed = result?.data?.allTestsPassed || false;
  const passedTestCount = result?.data?.passedTestCount || 0;
  const totalTests = result?.data?.totalTests || 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {allTestsPassed ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>All Tests Passed</span>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-red-500" />
                <span>Some Tests Failed</span>
              </>
            )}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium">Test Cases Passed:</span>
            <span className={allTestsPassed ? 'text-green-500' : 'text-amber-500'}>
              {passedTestCount}/{totalTests}
            </span>
          </div>

          {hasTestResults ? (
            <div className="space-y-2">
              <h3 className="font-medium">Test Results:</h3>
              <div className="max-h-60 overflow-y-auto rounded-md border p-2">
                {result.data.testResults.map((test, index) => (
                  <div
                    key={index}
                    className={`mb-2 rounded p-2 ${test.passed ? 'bg-green-50' : 'bg-red-50'}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Test Case {test.testIndex + 1}</span>
                      <span className={test.passed ? 'text-green-500' : 'text-red-500'}>
                        {test.passed ? 'Passed' : 'Failed'}
                      </span>
                    </div>
                    {test.output && (
                      <div className="mt-1 text-sm">
                        <span className="font-medium">Output:</span>
                        <pre className="mt-1 whitespace-pre-wrap rounded bg-gray-100 p-2 text-xs">
                          {test.output}
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-md border p-4 text-center">
              <p className="text-gray-500">No test results available</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
