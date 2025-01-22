'use client';

import { motion } from 'framer-motion';

interface Props {
  className?: string;
}

export const EllipseIcon = ({ className }: Props) => {
  return (
    <motion.svg
      width="45"
      height="45"
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      whileHover={{
        scale: 1.1,
        rotate: 10,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 15,
        },
      }}
    >
      <motion.path
        d="M43.0204 38.3336C38.0673 41.821 32.055 43.4762 26.015 43.0153C19.9749 42.5544 14.2834 40.0062 9.91675 35.8078C5.55009 31.6093 2.78038 26.0223 2.08271 20.0049C1.38504 13.9876 2.80289 7.91507 6.09306 2.82885"
        stroke="url(#paint0_linear_353_10389)"
        strokeWidth="3.81818"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{
          pathLength: 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 30,
        }}
      />
      <defs>
        <linearGradient
          id="paint0_linear_353_10389"
          x1="28"
          y1="45"
          x2="4.45454"
          y2="-3.04546"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#DB4437" />
          <stop offset="1" stopColor="#F4B400" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
};
