'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Rays } from './rays';

interface CardProps {
  title: string;
  description: string;
  logoComponent: React.ReactNode;
  decorComponent: React.ReactNode;
  className?: string;
  descriptionClass?: string;
}

export const Card = ({
  title,
  description,
  logoComponent,
  className,
  descriptionClass,
  decorComponent,
}: CardProps) => {
  return (
    <motion.div
      className={cn(
        'relative max-w-[22.5rem] cursor-pointer overflow-hidden rounded-[1rem] border p-[1.5rem]',
        className,
      )}
      whileTap={{ scale: 0.95 }}
      whileHover={{
        borderRadius: ['5%', '10%', '5%'],
        transition: {
          duration: 0.5,
        },
      }}
      initial={{ opacity: 0.2 }}
      whileInView={{
        translateY: '-10px',
        opacity: 1,
        transition: { ease: 'linear', duration: 0.5 },
      }}
      viewport={{ once: true, margin: '-5%', amount: 0.5 }}
    >
      <Rays className="pointer-events-none absolute" />
      <div className="pointer-events-none absolute -bottom-[3rem] left-0 w-[520.17px]">
        {decorComponent}
      </div>

      <div className="h-[60px] w-[60px]">{logoComponent}</div>
      <h2 className="mt-4 text-xl font-medium leading-[1.43em] tracking-[0.02em]">{title}</h2>
      <p className={cn('mb-16 mt-2 leading-[1.4em]', descriptionClass)}>{description}</p>
    </motion.div>
  );
};
