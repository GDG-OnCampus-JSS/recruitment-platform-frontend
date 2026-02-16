import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';
import { socials } from '@/lib/options';

export const Footer = () => {
  return (
    <footer className="border-t-4 border-t-[#DDE3FF] bg-[#F5F7FF] py-10">
      <div className="mx-auto max-w-6xl px-8">
        <div className="mb-10 flex items-start justify-center gap-4 sm:justify-start">
          <Image src="/logo.svg" alt="Logo" width={36} height={36} className="mt-[6px]" />
          <div>
            <p className="font-medium text-gray-700 sm:text-xl">Google Developer Groups OnCampus</p>
            <p className="pb-1 text-sm font-normal text-[#585858] sm:pb-0 md:text-base">
              JSS Academy of Technical Education{' '}
            </p>
          </div>
        </div>
        <div className="flex flex-col-reverse items-center text-gray-500 sm:flex-row sm:justify-between">
          <p className="flex items-center text-sm font-normal sm:text-base">
            <span className="mr-1 mt-2 text-2xl sm:text-3xl">&copy; </span>
            <span>2026 GDG JSSATEN</span>
          </p>
          <div className="flex justify-center gap-3 sm:justify-start lg:justify-end">
            {socials.map((social) => (
              <Link
                href={social.url}
                key={social.id}
                target="_blank"
                className="transition-colors hover:text-neutral-700"
              >
                <Icon icon={social.icon} className="size-8" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
