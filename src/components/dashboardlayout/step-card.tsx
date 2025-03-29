'use client';
import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { StepCardProps } from '@/lib/types';

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
  return (
    <Card
      className={`mx-auto w-full ${gradientBg} rounded-lg border border-solid border-[#DDE3FF]`}
    >
      <CardContent className="relative flex h-full flex-col p-4">
        <div className="absolute right-4 top-8 text-base font-medium text-[#0C0C0C]">
          {String(step).padStart(2, '0')}
        </div>

        {/* Gradient Line */}
        <div className="absolute left-0 top-10 h-[1px] w-full bg-gradient-to-r from-[#7578FF75] via-transparent to-transparent" />

        <div className="mt-12 flex flex-1 flex-col gap-4">
          <div className="flex h-12 w-12 items-center justify-start">
            <div style={{ color: iconColor }}>{React.createElement(icon)}</div>
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <h3 className="text-xl font-medium leading-6 text-[#3B3B3B]">{title}</h3>
            <p className="text-base leading-5 tracking-wide text-[#858585]">{description}</p>
          </div>

          <div className="flex justify-end">
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
