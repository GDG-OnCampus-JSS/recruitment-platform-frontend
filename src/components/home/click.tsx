'use client';

import { motion } from 'framer-motion';

interface Props {
  className?: string;
}

export const Click = ({ className }: Props) => {
  return (
    <motion.svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      whileHover={{
        scale: 1.2,
        rotate: 15,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 25,
        },
      }}
    >
      <motion.g id="Frame 1244837946">
        <motion.path
          id="Vector"
          d="M13.0002 3.10312L11.0002 5.00312M4.1002 7.00313L1.2002 6.20312M5.0002 11.0031L3.1002 13.0031M6.2002 1.20312L7.0002 4.10312M8.0372 8.69312C7.99842 8.60178 7.98782 8.50093 8.00675 8.40351C8.02569 8.3061 8.07329 8.21656 8.14346 8.14639C8.21364 8.07622 8.30317 8.02862 8.40059 8.00968C8.498 7.99075 8.59885 8.00135 8.6902 8.04012L19.6902 12.5401C19.7881 12.5803 19.8707 12.6505 19.9262 12.7406C19.9817 12.8307 20.0071 12.9361 19.9989 13.0416C19.9907 13.1471 19.9492 13.2472 19.8804 13.3277C19.8117 13.4081 19.7191 13.4646 19.6162 13.4891L15.2672 14.5301C15.0877 14.573 14.9235 14.6647 14.7929 14.7952C14.6623 14.9256 14.5703 15.0897 14.5272 15.2691L13.4872 19.6191C13.463 19.7224 13.4065 19.8153 13.326 19.8844C13.2454 19.9535 13.145 19.9952 13.0392 20.0034C12.9335 20.0116 12.8278 19.986 12.7376 19.9302C12.6473 19.8745 12.5771 19.7914 12.5372 19.6931L8.0372 8.69312Z"
          stroke="url(#paint0_linear_59_3213)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{
            strokeDasharray: 1500,
            strokeDashoffset: 1500,
          }}
          animate={{
            strokeDashoffset: 0,
          }}
          transition={{
            strokeDashoffset: {
              type: 'spring',
              stiffness: 120,
              damping: 20,
              duration: 4,
            },
          }}
        />
      </motion.g>
      <defs>
        <linearGradient
          id="paint0_linear_59_3213"
          x1="13.9985"
          y1="8"
          x2="13.9985"
          y2="20.0044"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#43B6B8" />
          <stop offset="1" stopColor="#0F9D58" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
};
