'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Rays } from './rays';
import { motion } from 'motion/react';

interface CardProps {
  title: string;
  description: string;
  logoImageSrc: string;
  decorImageSrc: string;
  className?: string;
  descriptionClass?: string;
}

export const Card = ({
  title,
  description,
  logoImageSrc,
  className,
  descriptionClass,
  decorImageSrc,
}: CardProps) => {
  return (
    <motion.div
      className={cn(
        'relative max-w-[22.5rem] overflow-hidden rounded-[1rem] border border-domain-card p-[1.5rem]',
        className,
      )}
      whileTap={{ scale: 0.95 }}
      whileHover={{
        borderRadius: ['5%', '10%', '5%'],
        transition: {
          duration: 0.5,
        },
      }}
    >
      <Rays className="pointer-events-none absolute" />
      <Image
        src={decorImageSrc}
        width={520.17}
        height={251.17}
        className="pointer-events-none absolute -bottom-[3rem] left-0 h-[200px]"
        alt="rays"
      />

      <Image src={logoImageSrc} height={60} width={60} alt={title} />
      <h2 className="mt-4 text-xl font-medium">{title}</h2>
      <p className={cn('mb-16 mt-2', descriptionClass)}>{description}</p>
    </motion.div>
  );
};
