'use client';

import { X } from 'lucide-react';
import { motion, AnimatePresence, delay } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from '@/components/ui/button';
import { NavItem } from '@/lib/types';

interface MobileMenuProps {
  isOpen: boolean;
  navItems: NavItem[];
  pathname: string;
  onCloseMenu: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, navItems, pathname, onCloseMenu }) => {
  const router = useRouter();
  if (!isOpen) return null;
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className={`fixed inset-0 z-50 h-screen bg-white`}
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.5 }}
        >
          <div className="mr-4 mt-4 flex items-center justify-end">
            <Button onClick={onCloseMenu}>
              <X />
            </Button>
          </div>
          <div className="overflow-y-auto pb-20">
            <motion.nav
              className="space-y-2 px-3 py-4"
              variants={linkContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {navItems.map((item) => (
                <div className="overflow-hidden" key={item.href}>
                  <motion.li variants={linkVariants} className="list-none">
                    <Link href={item.href}>
                      <div
                        onClick={onCloseMenu}
                        className={`flex items-center rounded-lg px-4 py-5 transition-colors ${
                          pathname === item.href
                            ? 'bg-indigo-50 text-indigo-600'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <item.icon
                          className={`mr-3 h-5 w-5 ${
                            pathname === item.href ? 'text-indigo-600' : 'text-gray-400'
                          }`}
                        />
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                    </Link>
                  </motion.li>
                </div>
              ))}
            </motion.nav>
            <motion.div
              initial={{ opacity: 0, translateY: 100 }}
              animate={{
                opacity: 1,
                translateY: 0,
                transition: { delay: 1.2, ease: 'easeInOut', duration: 1 },
              }}
              className="absolute bottom-0 left-0 right-0 border-gray-100 bg-white p-4"
            >
              <Button
                variant="outline"
                onClick={() => router.push('/login')}
                className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-black bg-neutral-100 py-6 text-sm font-medium"
              >
                Login
              </Button>
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
      delay: 0.5,
      staggerChildren: 0.3,
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
};
