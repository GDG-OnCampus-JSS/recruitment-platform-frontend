import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { cn } from '@/lib/utils';

interface PrimaryButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  containerClassName?: string;
  type?: 'button' | 'submit';
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  href,
  onClick,
  className,
  containerClassName,
  type = 'button',
}) => {
  const content = (
    <>
      <span
        className={cn(
          'group relative z-10 flex items-center justify-between gap-3 overflow-hidden rounded-2xl bg-btn-primary px-2 py-2',
          'font-medium leading-tight text-white',
          'transition-all duration-300 ease-out',
          className,
        )}
      >
        <span className="flex h-8 w-0 items-center justify-center overflow-hidden rounded-full bg-white text-neutral-900 opacity-0 transition-all duration-300 group-hover:w-8 group-hover:opacity-100">
          <ChevronRight size={16} />
        </span>
        <span className="whitespace-nowrap px-2 transition-all duration-300">{children}</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-neutral-900 transition-all duration-300 group-hover:w-0 group-hover:opacity-0">
          <ChevronRight size={16} />
        </span>
      </span>
    </>
  );

  const wrapperClass = cn('relative inline-block cursor-pointer', containerClassName);

  if (href) {
    return (
      <Link href={href} className={wrapperClass}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={wrapperClass}>
      {content}
    </button>
  );
};

export default PrimaryButton;
