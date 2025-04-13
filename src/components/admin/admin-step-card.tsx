'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AdminStepCardProps, StepCardProps } from '@/lib/types';
import { cn } from '@/lib/utils';

const StepCard = ({
  step,
  title,
  description,
  icon,
  buttonText,
  buttonBgColor,
  gradientBg,
  action,
  disabled,
}: AdminStepCardProps) => {
  return (
    <Card className={cn('rounded-lg border border-main', gradientBg)}>
      <CardContent className="flex h-full flex-col p-0">
        <div className="mt-6 flex items-center">
          <div className="h-[1px] w-full bg-gradient-to-r from-indigo-200 via-transparent to-transparent" />
          <div className="mr-4 text-base font-medium text-neutral-900">0{step}</div>
        </div>

        <div className="flex h-full flex-col justify-between gap-4 p-4">
          <div className="flex h-12 w-12 items-center justify-start">
            <div>{React.createElement(icon)}</div>
          </div>

          <div>
            <h3 className="text-xl font-medium text-neutral-700">{title}</h3>
            <p className="mt-1 leading-5 tracking-wide text-neutral-500/90">{description}</p>
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-1 md:mt-2 lg:flex-row lg:items-center">
            <Button
              className={cn(
                'w-full rounded-md text-base font-medium text-white shadow-[inset_-4px_-5px_24.6px_0px_rgba(0,0,0,0.25)] transition hover:scale-x-105 hover:text-white lg:w-auto',
                `hover:bg-${buttonBgColor}`,
                buttonBgColor,
              )}
              onClick={() => (window.location.href = action)}
              disabled={disabled}
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StepCard;
