'use client';

import { CheckCircle, XCircle } from 'lucide-react';
import { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface RunResultData {
  output: string;
  error: string | null;
  executionTime: string;
  memory: number;
  status: {
    id: number;
    description: string;
  };
  passed: boolean;
  expected: string;
}

interface RunResultProps {
  isOpen: boolean;
  onClose: () => void;
  result: RunResultData | null;
}

export function RunResultDialog({ isOpen, onClose, result }: RunResultProps) {
  const { toast } = useToast();

  // console.log('Run Dialog Component Props:', { isOpen, result });

  useEffect(() => {
    // console.log('Run Dialog useEffect triggered:', { isOpen, result });

    if (result) {
      const isSuccess = result.passed || result.status?.description === 'Accepted';
      if (isSuccess) {
        toast({
          title: 'Success!',
          description: 'Code executed successfully.',
          variant: 'success',
        });
      } else {
        toast({
          title: 'Execution Failed',
          description: result.error || 'An error occurred during execution.',
          variant: 'destructive',
        });
      }
    }
  }, [result, toast]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {result?.passed || result?.status?.description === 'Accepted' ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Code Executed Successfully</span>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-red-500" />
                <span>Execution Failed</span>
              </>
            )}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium">Status:</span>
            <span
              className={
                result?.passed || result?.status?.description === 'Accepted'
                  ? 'text-green-500'
                  : 'text-red-500'
              }
            >
              {result?.status?.description || 'Unknown'}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Execution Time:</span>
            <span>{result?.executionTime || '0'} seconds</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Memory Used:</span>
            <span>{result?.memory || 0} KB</span>
          </div>

          {result?.error && (
            <div className="space-y-2">
              <h3 className="font-medium">Error:</h3>
              <div className="max-h-60 overflow-y-auto rounded-md border bg-red-50 p-2">
                <pre className="whitespace-pre-wrap text-sm text-red-600">{result.error}</pre>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <h3 className="font-medium">Output:</h3>
            <div className="max-h-60 overflow-y-auto rounded-md border bg-gray-50 p-2">
              <pre className="whitespace-pre-wrap text-sm">{result?.output || 'No output'}</pre>
            </div>
          </div>

          {result?.expected && (
            <div className="space-y-2">
              <h3 className="font-medium">Expected Output:</h3>
              <div className="max-h-60 overflow-y-auto rounded-md border bg-gray-50 p-2">
                <pre className="whitespace-pre-wrap text-sm">{result.expected}</pre>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
