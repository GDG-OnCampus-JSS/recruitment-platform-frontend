'use client';
import Link from 'next/link';
import { Button as ShadCnButton } from '../ui/button';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  href: string;
}

const MotionButton = motion(ShadCnButton);

const Button = ({ children, className, href }: ButtonProps) => {
  return (
    <MotionButton
      whileHover={{ borderRadius: '12px' }}
      whileTap={{ scale: 0.95 }}
      asChild
      className={cn(
        'mx-auto mt-8 h-11 w-48 border border-domain-card bg-btn-primary hover:bg-indigo-600',
        className,
      )}
    >
      <Link href={href}>{children}</Link>
    </MotionButton>
  );
};

export default Button;
