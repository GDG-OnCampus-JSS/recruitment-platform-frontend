'use client';

import { LogInIcon, LogOutIcon, X } from 'lucide-react';
import { motion, AnimatePresence, delay } from 'motion/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { NavItem } from '@/lib/types';
import useUserStore from '@/stores/userStore';

interface MobileMenuProps {
  isOpen: boolean;
  navItems: NavItem[];
  pathname: string;
  onCloseMenu: () => void;
  onLogout: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  navItems,
  pathname,
  onCloseMenu,
  onLogout,
}) => {
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className={`fixed inset-0 z-50 h-screen bg-gradient-to-b from-white via-slate-50 to-white`}
          initial={{ y: '-100%' }}
          animate={{ y: 0, transition: { duration: 0.5 } }}
          exit={{ y: '-100%', transition: { duration: 0.5, delay: 0.5 } }}
        >
          {/* Decorative gradient blob */}
          <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-300/30 to-purple-300/20 blur-3xl" />

          <div className="relative mr-4 mt-4 flex items-center justify-end">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCloseMenu}
              className="rounded-lg border border-slate-200 bg-neutral-300/10 p-2 text-slate-900 backdrop-blur-sm transition-colors hover:bg-slate-200"
            >
              <X size={24} />
            </motion.button>
          </div>
          <div className="overflow-y-auto pb-32">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.1, duration: 0.5 },
              }}
              className="px-6 py-4"
            >
              <h2 className="text-2xl font-bold">Navigation</h2>
              <p className="mt-1 text-xs text-slate-500">Access your tools</p>
            </motion.div>

            <motion.nav
              className="space-y-3 px-4 py-4"
              variants={linkContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {navItems.map((item) => (
                <div className="overflow-hidden rounded-xl" key={item.href}>
                  <motion.li variants={linkVariants} className="list-none">
                    <motion.button
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => router.push(item.href)}
                      disabled={item.label === 'Results'}
                      className={`group flex w-full items-center rounded-xl px-5 py-4 transition-all duration-200 ${
                        pathname === item.href
                          ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-inner shadow-indigo-500/90'
                          : 'border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <item.icon
                        className={`mr-3 h-5 w-5 transition-transform group-hover:scale-110 ${
                          pathname === item.href ? 'text-white' : 'text-slate-500'
                        }`}
                      />
                      <span className="flex-1 text-left text-sm font-semibold">{item.label}</span>
                      {item.label === 'Results' && (
                        <span className="rounded-full bg-slate-200 px-2 py-1 text-xs text-slate-600">
                          Coming soon
                        </span>
                      )}
                    </motion.button>
                  </motion.li>
                </div>
              ))}
            </motion.nav>

            {/* Divider with gradient */}
            <div className="mx-4 my-6 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

            <motion.div
              initial={{ opacity: 0, translateY: 100 }}
              animate={{
                opacity: 1,
                translateY: 0,
                transition: { delay: 0.3, ease: 'easeInOut', duration: 1 },
              }}
              exit={{
                opacity: 0,
                translateY: 100,
                transition: { duration: 0.3, ease: 'easeInOut' },
              }}
              className="relative px-4 py-4"
            >
              {user ? (
                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={onLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 py-6 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition-all hover:from-red-700 hover:to-red-800"
                  >
                    <LogOutIcon size={18} />
                    Logout
                  </Button>
                </motion.div>
              ) : (
                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={() => router.push('/login')}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-600 py-6 text-sm font-semibold text-white shadow-inner shadow-blue-300/90 transition-all"
                  >
                    <LogInIcon size={18} />
                    Login
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;

const linkContainerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.11,
      staggerChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.06,
      staggerDirection: -1,
    },
  },
};

const linkVariants = {
  hidden: {
    opacity: 0,
    y: 100,
    transition: {
      duration: 1,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
  exit: {
    opacity: 0,
    y: 60,
    transition: {
      duration: 0.25,
      ease: 'easeIn',
    },
  },
};
