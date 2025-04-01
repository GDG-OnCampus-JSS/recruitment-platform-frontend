'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { StepCardProps } from '@/lib/types';
import { cn } from '@/lib/utils';
import EventCountdown from '../common/event-countdown';

const StepCard = ({
  step,
  title,
  description,
  icon,
  buttonText,
  buttonBgColor,
  gradientBg,
  action,
  eventStartDate,
  eventEndDate,
}: StepCardProps) => {
  const eventStart = eventStartDate;
  const eventEnd = eventEndDate;

  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isEventDisabled = currentTime < eventStart || currentTime > eventEnd;

  return (
    <Card className={cn('rounded-lg border border-main', gradientBg)}>
      <CardContent className="flex h-full flex-col p-0">
        <div className="mt-6 flex items-center">
          <div className="h-[1px] w-full bg-gradient-to-r from-indigo-200 via-transparent to-transparent" />
          <div className="mr-4 text-base font-medium text-neutral-900">0{step}</div>
        </div>

        <div className="flex flex-col gap-4 p-4">
          <div className="flex h-12 w-12 items-center justify-start">
            <div>{React.createElement(icon)}</div>
          </div>

          <div>
            <h3 className="text-xl font-medium text-neutral-700">{title}</h3>
            <p className="mt-1 leading-5 tracking-wide text-neutral-500/90">{description}</p>
          </div>

          <div className="mt-8 flex flex-col items-start gap-1 sm:mt-2 sm:flex-row sm:items-center sm:justify-between">
            <EventCountdown eventStart={eventStart} eventEnd={eventEnd} />
            <Button
              className={cn(
                'w-full rounded-md text-base font-medium text-white shadow-[inset_-4px_-5px_24.6px_0px_rgba(0,0,0,0.25)] transition hover:scale-x-105 hover:text-white sm:w-auto',
                `hover:bg-${buttonBgColor}`,
                buttonBgColor,
              )}
              onClick={() => (window.location.href = action)}
              disabled={isEventDisabled}
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
