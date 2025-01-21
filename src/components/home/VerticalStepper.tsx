'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepColor {
  background: string;
  tick: string;
  border: string;
}

interface VerticalStepperProps {
  totalSteps: number;
  currentStep: number;
  className?: string;
  stepColors: StepColor[];
}

export default function VerticalStepper({
  totalSteps,
  currentStep,
  className,
  stepColors,
}: VerticalStepperProps) {
  return (
    <div className={cn('flex flex-col items-center', className)}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isCompleted = currentStep > index + 1;
        const isCurrent = currentStep === index + 1;
        const color = stepColors[index];

        return (
          <div key={index} className="flex flex-col items-center">
            <div
              className={cn(
                'flex size-4 items-center justify-center rounded-full border-2 transition-colors duration-200',
                isCompleted && `border-${color.border} bg-${color.background} text-${color.tick}`,
                isCurrent && `border-${color.border} bg-${color.background}/20`,
                !isCompleted && !isCurrent && 'border-muted',
              )}
            >
              {isCompleted ? (
                <Check className="size-3" style={{ color: `var(--${color.tick})` }} />
              ) : (
                <span
                  className={cn(
                    'h-2 w-2 animate-pulse rounded-full',
                    isCurrent && `bg-${color.border}`,
                  )}
                />
              )}
            </div>
            {index !== totalSteps - 1 && (
              <div
                className={cn(
                  'h-[5.1rem] w-px bg-muted transition-colors duration-200 md:h-[3.98rem]',
                  isCompleted && `bg-${color.background}`,
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
