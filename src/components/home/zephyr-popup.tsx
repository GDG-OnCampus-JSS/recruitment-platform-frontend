'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, SparklesIcon, X } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect } from 'react';

const CHATBOT_URL = 'https://zephyr.gdgjss.in/';
const GDG_INTERACTS_URL = 'https://chat.whatsapp.com/JwOaPp7hezG8g2EUV1NHVc?mode=gi_t';

interface ZephyrPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ZephyrPopup({ open, onOpenChange }: ZephyrPopupProps) {
  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [open, close]);

  const handleOpenChatbot = () => {
    window.open(CHATBOT_URL, '_blank');
  };

  const handleOpenGdgInteracts = () => {
    window.open(GDG_INTERACTS_URL, '_blank');
  };

  // prevent scrolling when popup is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{
              duration: 0.5,
              ease: 'easeOut',
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={close}
                className="absolute right-4 top-4 z-10 p-2 text-slate-400 transition-colors hover:text-slate-600"
                aria-label="Close popup"
              >
                <X className="h-5 w-5" strokeWidth={2} />
              </motion.button>

              <div className="px-8 py-10 sm:px-10 sm:py-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.1,
                    duration: 0.6,
                    type: 'spring',
                    stiffness: 200,
                    damping: 15,
                  }}
                >
                  <Image
                    src="/zephyr-logo.svg"
                    alt="Zephyr Logo"
                    width={36}
                    height={36}
                    className="mx-auto mb-8 size-20"
                  />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                  className="mb-4 text-center text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
                >
                  Have any doubts?
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="mb-10 text-center text-base leading-relaxed text-slate-600"
                >
                  Chat with our personalized AI assistant{' '}
                  <span className="font-semibold">Zephyr</span> for instant answers tailored to your
                  needs.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                  className="flex flex-col gap-3"
                >
                  <motion.button
                    whileHover={{ scaleX: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleOpenChatbot}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-3.5 text-base font-semibold text-white shadow-inner shadow-indigo-300"
                  >
                    Talk to AI
                    <SparklesIcon fill="white" />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleOpenGdgInteracts}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-100 px-6 py-3.5 text-base font-medium text-slate-600 transition-colors duration-200"
                  >
                    GDG Interacts
                    <ExternalLink className="size-4" />
                  </motion.button>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.5 }}
                  className="mt-2 text-center text-xs text-slate-400"
                >
                  This will take you to a new page.
                </motion.p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
