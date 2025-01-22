'use client';

import { motion } from 'framer-motion';

interface Props {
  className?: string;
}

export function WavyLine({ className }: Props) {
  return (
    <svg
      width="180"
      height="30"
      viewBox="0 0 200 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <motion.path
        d="M0 15 
           Q10 5, 20 15 
           T40 15 
           T60 15 
           T80 15 
           T100 15 
           T120 15
           T140 15
           T160 15
           T180 15"
        stroke="#FFB800"
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0, pathOffset: 0 }}
        animate={{
          pathLength: 1,
          transition: {
            delay: 1,
            duration: 2,
            ease: 'easeInOut',
          },
        }}
      />
    </svg>
  );
}
