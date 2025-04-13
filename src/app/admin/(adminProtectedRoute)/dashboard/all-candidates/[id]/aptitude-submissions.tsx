import { X } from 'lucide-react';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { AptitudeSubmission } from '@/lib/types';

const AptitudeSubmissions = ({
  aptitudeSubmissions,
  isOpen = false,
  closeDialog,
}: {
  aptitudeSubmissions: AptitudeSubmission[];
  isOpen: boolean;
  closeDialog: () => void;
}) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeDialog();
        }
      }}
    >
      <DialogContent className="max-h-[85vh] sm:max-w-[700px]" hideCloseIcon={true}>
        <DialogTitle className="sr-only">Aptitude Questions & Answers</DialogTitle>
        <Button
          onClick={closeDialog}
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
        <DialogHeader className="text-xl font-semibold">
          <div className="mr-10 flex items-center justify-between">
            <span>Aptitude Questions & Answers</span>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-primary/10">
                {aptitudeSubmissions.length} Submissions
              </Badge>
            </div>
          </div>
        </DialogHeader>
        <ScrollArea className="h-full max-h-[60vh] pr-4">
          <div className="space-y-6 pb-4">
            {aptitudeSubmissions.map((submission, index) => (
              <Card
                key={submission.id}
                className="border border-border transition-all hover:shadow-md"
              >
                <CardContent className="p-4 pt-4">
                  <div className="mb-2 flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-sm font-medium">
                        {index + 1}
                      </span>
                      <div className="text-lg font-medium">Question</div>
                    </div>
                  </div>

                  <div className="mb-2 text-muted-foreground">
                    {submission.question?.questionText ||
                      `Question ID: ${submission.questionId.slice(0, 8)}...`}
                  </div>

                  <Separator className="my-3" />

                  <div>
                    <div className="mb-1 text-sm font-medium text-muted-foreground">Answer:</div>
                    <div className="rounded-md bg-muted p-3 text-sm">{submission.answer}</div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {aptitudeSubmissions.length === 0 && (
              <div className="flex h-32 items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <p className="text-lg font-medium">No submissions yet</p>
                  <p className="text-sm text-muted-foreground">
                    The candidate hasn't submitted any answers.
                  </p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AptitudeSubmissions;
