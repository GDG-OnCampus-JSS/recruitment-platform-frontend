'use client';

import { motion } from 'framer-motion';

interface Props {
  className?: string;
}

export const Star = ({ className }: Props) => {
  return (
    <motion.svg
      width="69"
      height="69"
      viewBox="0 0 69 69"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      animate={{
        rotate: [0, 360],
        transition: {
          tyoe: 'easeInOut',
          rotate: {
            repeat: Infinity,
            duration: 5,
          },
        },
      }}
    >
      <g id="Vector" filter="url(#filter0_d_59_3215)">
        <motion.path
          d="M32.6082 42.3126C32.9968 42.4044 33.3211 42.2219 33.4491 41.8631C35.4754 36.5723 35.6597 36.6158 41.5646 36.865C41.9475 36.8909 42.2719 36.7076 42.3637 36.319C42.4507 35.9505 42.247 35.6221 41.8932 35.4731C36.4279 33.3623 36.2671 33.1298 36.8654 27.394C36.9113 27.0158 36.7079 26.6866 36.3193 26.5949C35.9508 26.5079 35.6216 26.7113 35.4888 27.0902C33.5189 32.4155 33.2372 32.3277 27.3831 32.0472C26.9952 32.0423 26.6709 32.2248 26.5839 32.5933C26.4872 33.0028 26.7004 33.291 27.1356 33.4583C32.4907 35.6731 32.7022 35.8742 32.087 41.4982C32.0313 41.9174 32.2397 42.2256 32.6082 42.3126Z"
          fill="#FBBC04"
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
              damping: 25,
              duration: 2,
            },
          }}
        />
      </g>
      <defs>
        <filter
          id="filter0_d_59_3215"
          x="0.653969"
          y="0.668129"
          width="67.6369"
          height="67.5749"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="12.9535" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.51 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_59_3215" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_59_3215"
            result="shape"
          />
        </filter>
      </defs>
    </motion.svg>
  );
};
