import { Linkedin, Instagram, Github, Youtube, X } from 'lucide-react';
import Image from 'next/image';

export const Footer = () => {
  const SocialIcons = () => (
    <div className="flex gap-6">
      <a href="#" className="text-[#454545] transition-colors hover:text-gray-900">
        <Linkedin size={24} />
      </a>

      <a href="#" className="text-[#454545] transition-colors hover:text-gray-900">
        <Instagram size={24} />
      </a>

      <a href="#" className="text-[#454545] transition-colors hover:text-gray-900">
        <Youtube size={24} />
      </a>

      <a href="#" className="text-[#454545] transition-colors hover:text-gray-900">
        <Github size={24} />
      </a>

      <a href="#" className="text-[#454545] transition-colors hover:text-gray-900">
        <X size={24} />
      </a>
    </div>
  );

  return (
    <footer className="w-full min-w-[360px] border-t-4 border-t-[#DDE3FF] bg-[#F5F7FF] sm:h-[212px]">
      <div className="flex items-start justify-start gap-4 px-8 pt-[42px] sm:px-20">
        <Image src="/logo.svg" alt="Logo" width={36} height={24} className="mt-[6px]" />
        <div>
          <p className="h-[24px] w-full font-[#434343] text-sm font-medium opacity-70 sm:mb-2 sm:text-xl">
            Google Developer Groups OnCampus
          </p>
          <p className="pb-1 text-sm font-normal text-[#585858] sm:pb-0 md:text-base">
            JSS Academy of Technical Education{' '}
          </p>
        </div>
      </div>
      <div className="flex h-auto min-h-[78px] flex-col-reverse items-center px-4 text-right text-[#454545] opacity-70 sm:h-[78px] sm:flex-row sm:items-center sm:justify-between sm:px-20 sm:pb-[15.8px]">
        <p className="flex items-center text-sm font-normal text-[#454545] sm:text-base">
          <span className="mr-1 mt-2 text-2xl sm:text-3xl">© </span>
          <span>2025 GDG JSSATEN</span>
        </p>
        <div className="mb-3 flex h-[24px] w-full justify-center gap-[30px] sm:mb-0 sm:w-[294px] sm:justify-start lg:justify-end">
          <SocialIcons />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
