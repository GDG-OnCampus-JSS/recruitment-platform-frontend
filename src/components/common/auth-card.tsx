import Link from 'next/link';
import { motion } from 'framer-motion';

interface AuthCardFooterProps {
  text: string;
  linkText: string;
  href: string;
}

interface AuthCardProps {
  children: React.ReactNode;
  footer?: AuthCardFooterProps;
}

export const AuthCard: React.FC<AuthCardProps> = ({ children, footer }) => (
  <motion.div
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="relative mt-0 grid h-screen w-screen place-content-center overflow-hidden rounded-[1rem] border-card bg-white bg-opacity-15 shadow-card backdrop-blur-sm duration-300 hover:rounded-[1.5rem] sm:mx-auto sm:mt-1 sm:block sm:h-auto sm:w-auto sm:bg-opacity-100 md:w-[500px]"
  >
    <div className="p-8 sm:p-12">{children}</div>

    {footer && (
      <div className="p-4 text-center text-sm text-black sm:mt-[33px] sm:bg-gray-extra-light">
        {footer.text}{' '}
        <Link
          href={footer.href}
          className="font-medium text-[#6366f1] underline hover:text-[#5558e7]"
        >
          {footer.linkText}
        </Link>
      </div>
    )}
  </motion.div>
);
