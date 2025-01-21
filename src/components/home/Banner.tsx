import { cn } from '@/lib/utils';
import { Click } from './click';
import { EllipseIcon } from './ellipse-1';
import { EllipseIcon2 } from './ellipse-2';
import { Star } from './star';
import { WavyLine } from './wavy-line';
import CountUp from '../common/count-up';

interface BannerProps {
  className?: string;
}

export const Banner = ({ className }: BannerProps) => {
  return (
    <div className={cn('relative', className)}>
      <h1 className="text-shadow-display text-center text-[56px] font-bold leading-[6rem] sm:text-[72px]">
        Recruitments <br /> 2025
      </h1>
      <Star className="absolute -top-5 right-7 sm:-top-6 sm:right-3" />
      <EllipseIcon2 className="absolute -right-5 -top-2 -rotate-6 sm:-right-8 sm:rotate-0" />
      <WavyLine className="absolute bottom-[5.5rem]" />
      <EllipseIcon className="absolute bottom-0 left-[5.3rem] sm:-bottom-2 sm:left-[7rem]" />
      <Click className="absolute bottom-2 right-[5rem] sm:-bottom-1 sm:right-[7rem]" />
    </div>
  );
};
