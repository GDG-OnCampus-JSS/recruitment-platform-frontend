'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Props {
  title: string;
  description: string;
  duration: string;
  accentColor: string;
  iconSrc: string;
  className?: string;
}

const JourneyStep = ({ title, description, duration, accentColor, iconSrc, className }: Props) => {
  return (
    <div
      className={cn(
        'flex w-full flex-col items-start justify-between md:flex-row md:items-center md:gap-y-0',
        className,
      )}
    >
      <p className="md:text-normal flex-1 text-sm text-muted-foreground md:text-inherit">
        {duration}
      </p>

      <div className="flex flex-1 items-center gap-x-3">
        <div className={cn(`grid size-12 place-content-center rounded bg-${accentColor}-20`)}>
          <Image src={iconSrc} width={24} height={24} alt={title} />
        </div>
        <div className="">
          <h2 className={cn(`text-lg font-medium text-${accentColor}`)}>{title}</h2>
          <p className="text-sm text-accent-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};

export { JourneyStep };
