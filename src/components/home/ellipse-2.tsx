'use client';

import { motion } from 'framer-motion';

interface Props {
  className?: string;
}

export const EllipseIcon2 = ({ className }: Props) => {
  return (
    <motion.svg
      width="71"
      height="70"
      viewBox="0 0 71 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      whileHover={{
        rotate: -2,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 15,
        },
      }}
    >
      <motion.path
        d="M3.39657 10.4757C11.18 4.99561 20.6278 2.39461 30.1193 3.11883C39.6109 3.84306 48.5546 7.84738 55.4165 14.445C62.2784 21.0425 66.6308 29.8222 67.7272 39.2779C68.8235 48.7337 66.5955 58.2763 61.4252 66.2689"
        stroke="url(#paint0_linear_353_10390)"
        strokeWidth="6"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{
          pathLength: 1,
        }}
        transition={{
          pathLength: {
            type: 'spring',
            stiffness: 100,
            damping: 25,
            duration: 2,
          },
        }}
      />
      <defs>
        <linearGradient
          id="paint0_linear_353_10390"
          x1="27"
          y1="0"
          x2="64"
          y2="75.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9F64FD" />
          <stop offset="1" stopColor="#4E0EF1" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
};
