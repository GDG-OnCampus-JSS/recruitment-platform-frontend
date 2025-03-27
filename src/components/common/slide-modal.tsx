'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import type * as React from 'react';

export interface SlideModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
  position?: 'right' | 'left';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  showCloseButton?: boolean;
  closeOnOutsideClick?: boolean;
  closeOnEsc?: boolean;
}

export function SlideModal({
  isOpen,
  onClose,
  children,
  title,
  description,
  position = 'right',
  size = 'md',
  className,
  showCloseButton = true,
  closeOnOutsideClick = true,
  closeOnEsc = true,
}: SlideModalProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, closeOnEsc]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const getWidth = () => {
    switch (size) {
      case 'sm':
        return 'max-w-sm';
      case 'md':
        return 'max-w-md';
      case 'lg':
        return 'max-w-lg';
      case 'xl':
        return 'max-w-xl';
      case 'full':
        return 'max-w-full';
      default:
        return 'max-w-md';
    }
  };

  const slideVariants = {
    hidden: {
      x: position === 'right' ? '100%' : '-100%',
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 30,
        stiffness: 300,
      },
    },
    exit: {
      x: position === 'right' ? '100%' : '-100%',
      opacity: 0,
      transition: {
        type: 'spring',
        damping: 30,
        stiffness: 300,
      },
    },
  };

  if (!isMounted) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            aria-hidden="true"
            onClick={closeOnOutsideClick ? onClose : undefined}
          />

          {/* Modal */}
          <div
            className={cn(
              'fixed inset-y-0 flex h-full flex-col',
              position === 'right' ? 'right-0' : 'left-0',
            )}
          >
            <motion.div
              className={cn(
                'flex h-full flex-col overflow-hidden border-l bg-background shadow-lg',
                getWidth(),
                className,
              )}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={slideVariants}
              aria-modal="true"
              role="dialog"
              aria-labelledby={title ? 'slide-modal-title' : undefined}
              aria-describedby={description ? 'slide-modal-description' : undefined}
              onClick={(e) => e.stopPropagation()}
            >
              {(title || showCloseButton) && (
                <div className="flex gap-4 items-center justify-between border-b px-6 py-4">
                  <div>
                    {title && (
                      <h2 id="slide-modal-title" className="text-lg font-medium">
                        {title}
                      </h2>
                    )}
                    {description && (
                      <p id="slide-modal-description" className="text-sm text-muted-foreground">
                        {description}
                      </p>
                    )}
                  </div>
                  {showCloseButton && (
                    <button
                      onClick={onClose}
                      className="inline-flex h-8 w-12 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      aria-label="Close modal"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              )}

              <div className="flex-1 overflow-auto p-6">{children}</div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
