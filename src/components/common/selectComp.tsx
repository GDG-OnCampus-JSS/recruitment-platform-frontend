import React, { useRef, useState } from 'react';
import { ChevronDown, LogOut, Settings } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useDismissOnClick } from '@/hooks/use-dismiss-onclick';

interface Props {
  imageSrc: string;
  onLogout?: () => void;
}

const Dropdown = ({ imageSrc, onLogout }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const profileModalRef = useRef<HTMLDivElement | null>(null);
  useDismissOnClick(profileModalRef, () => setIsOpen(false));

  return (
    <div className="relative" ref={profileModalRef}>
      <button
        title="Profile"
        className="flex items-center gap-2 rounded-full border px-2 py-[6px] duration-500 hover:bg-neutral-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image src={imageSrc} alt="" height={26} width={26} className="size-6 rounded-full" />
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={16} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: 'spring', stiffness: 100, damping: 10 }}
            className="absolute right-0 mt-1 w-[14rem] space-y-2 rounded-md border bg-white px-2 py-2 shadow-md"
          >
            <Link
              href="/dashboard/profile"
              onClick={() => setIsOpen(false)}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-1 transition hover:bg-neutral-100"
            >
              <Settings className="text-neutral-400" />
              <div>
                <h2 className="text-sm font-medium">Profile</h2>
                <p className="font-sans text-xs text-neutral-400">Edit your profile here</p>
              </div>
            </Link>
            <span className="block h-[0.1px] w-full bg-neutral-200"></span>
            <button
              className="group flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-1 text-start text-red-500 transition hover:bg-red-100"
              type="button"
              onClick={onLogout}
            >
              <LogOut />
              <div>
                <h2 className="text-sm font-medium">Log Out</h2>
                <p className="font-sans text-xs text-neutral-400 transition-colors group-hover:text-red-400">
                  Log out and login again
                </p>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
