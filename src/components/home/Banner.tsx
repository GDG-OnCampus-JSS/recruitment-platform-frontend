'use client';
import { cn } from '@/lib/utils';
import { Click } from './click';
import { EllipseIcon } from './ellipse-1';
import { EllipseIcon2 } from './ellipse-2';
import { Star } from './star';
import { WavyLine } from './wavy-line';
import { motion } from 'motion/react';
import GradientText from './gradientText';
import Button from './Button';

interface BannerProps {
  className?: string;
}

export const Banner = ({ className }: BannerProps) => {
  return (
    <div className={cn('relative', className)}>
      <motion.h1
        className="text-shadow-display text-center text-[56px] font-bold leading-[6rem] sm:text-[72px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1 } }}
      >
        Recruitments <br /> 2025
      </motion.h1>
      <Star className="absolute -top-5 right-7 sm:-top-6 sm:right-3" />
      <EllipseIcon2 className="absolute -right-5 -top-2 -rotate-6 sm:-right-8 sm:rotate-0" />
      <WavyLine className="absolute bottom-[5.5rem]" />
      <EllipseIcon className="absolute bottom-0 left-[5.3rem] sm:-bottom-2 sm:left-[7rem]" />
      <Click className="absolute bottom-2 right-[5rem] sm:-bottom-1 sm:right-[7rem]" />
    </div>
  );
};

export const Logo = () => {
  return (
    <motion.div
      className="z-10 mx-auto rounded-3xl border border-main bg-white px-5 py-1"
      initial={{ opacity: 0, translateY: '-50px' }}
      animate={{
        opacity: 1,
        translateY: '0',
        transition: { ease: 'easeOut', duration: 0.8, delay: 1 },
      }}
    >
      <GradientText>Google Developer Groups</GradientText>
    </motion.div>
  );
};

export const CTA = () => {
  return (
    <>
      <motion.p
        className="z-10 mt-10 text-center text-xl text-secondary-foreground"
        initial={{ opacity: 0, translateY: '50px' }}
        animate={{
          opacity: 1,
          translateY: 0,
          transition: { ease: 'easeOut', duration: 0.8, delay: 1 },
        }}
      >
        Your Journey to GDG begins here!
      </motion.p>
      <motion.div
        className="flex items-center justify-center"
        initial={{ opacity: 0, translateY: '50px' }}
        animate={{
          opacity: 1,
          translateY: 0,
          transition: { ease: 'easeOut', duration: 0.8, delay: 1.2 },
        }}
      >
        <Button href="/register" className="z-10">
          Register
        </Button>
      </motion.div>
    </>
  );
};
