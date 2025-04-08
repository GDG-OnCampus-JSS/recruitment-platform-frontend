'use client';
import { motion } from 'motion/react';
import Link from 'next/link';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Button as ShadCnButton } from '../ui/button';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  href: string;
}

const MotionButton = motion(ShadCnButton);

const Button = ({ children, className, href }: ButtonProps) => {
  return (
    <MotionButton
      whileHover={{ borderRadius: '12px', scaleX: 1.05 }}
      whileTap={{ scale: 0.95 }}
      asChild
      className={cn(
        'mx-auto mt-8 h-11 w-48 border border-domain-card bg-btn-primary leading-[1em] tracking-[0.02em] hover:bg-indigo-600',
        className,
      )}
    >
      <Link href={href}>{children}</Link>
    </MotionButton>
  );
};

export default Button;
