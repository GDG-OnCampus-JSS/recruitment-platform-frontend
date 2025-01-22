'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ClipboardList, Brain, Users } from 'lucide-react';
import { StepCardProps } from '@/types/types';

const StepCard = ({
  step,
  title,
  description,
  icon,
  buttonText,
  buttonVariant,
  iconColor,
  buttonBgColor,
  gradientBg,
  action,
}: StepCardProps) => {
  const Icon = { ClipboardList, Brain, Users }[icon];

  if (!Icon) {
    return <div>Icon not found</div>;
  }

  return (
    <Card
      className={`mx-auto w-full max-w-sm ${gradientBg} rounded-lg border border-solid border-[#DDE3FF]`}
    >
      <CardContent className="relative flex h-full flex-col p-4">
        <div className="absolute right-4 top-4 text-sm font-medium text-[#0C0C0C]">
          {String(step).padStart(2, '0')}
        </div>

        {/* Gradient Line */}
        <div className="absolute left-0 top-4 h-[1px] w-full bg-gradient-to-r from-[#7578FF75] via-transparent to-transparent" />

        <div className="mt-12 flex flex-col gap-4">
          <div className="flex h-12 w-12 items-center justify-start">
            <Icon className="h-full w-full" strokeWidth={0} fill={iconColor} />
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-medium leading-6 text-[#3B3B3B]">{title}</h3>
            <p className="text-sm leading-5 tracking-wide text-[#858585]">{description}</p>
          </div>

          <div className="mt-4 flex justify-end">
            <Button
              variant={buttonVariant}
              className={`${buttonBgColor} rounded-md px-4 py-2 text-base font-medium text-white shadow-[inset_-4px_-5px_24.6px_0px_rgba(0,0,0,0.25)]`}
              onClick={() => (window.location.href = action)}
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
