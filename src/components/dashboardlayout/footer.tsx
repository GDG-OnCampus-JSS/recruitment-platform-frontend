import Image from 'next/image';

export const Footer = () => {
  const SocialIcons = () => (
    <div className="flex gap-6">
      <a href="#" className="text-[#454545]">
        <Image src="/icons/linkedin.svg" alt="Linkedin" width={24} height={24} />
      </a>
      <a href="#" className="text-[#454545]">
        <Image src="/icons/insta.svg" alt="Insta" width={24} height={24} />
      </a>
      <a href="#" className="text-[#454545]">
        <Image src="/icons/yt.svg" alt="Youtube" width={24} height={24} />
      </a>
      <a href="#" className="text-[#454545]">
        <Image src="/icons/github.svg" alt="Github" width={24} height={24} />
      </a>
      <a href="#" className="text-[#454545]">
        <Image src="/icons/x.svg" alt="X" width={24} height={24} />
      </a>
    </div>
  );

  return (
    <footer className="fixed bottom-0 h-[212px] w-full border-t-4 border-t-[#DDE3FF] bg-[#F5F7FF]">
      <div className="flex items-start justify-start gap-4 px-20 pt-[42px]">
        <Image src="/logo.svg" alt="Logo" width={36} height={24} className="mt-[6px]" />
        <div>
          <p className="mb:1 h-[24px] font-[#434343] text-sm font-medium sm:mb-2 sm:text-xl">
            Google Developer Groups OnCampus
          </p>
          <p className="font-[#585858] text-sm font-normal md:text-base">
            JSS Academy of Technical Education{' '}
          </p>
        </div>
      </div>
      <div className="flex h-[78px] flex-col-reverse items-start px-20 text-[#454545] sm:flex-row sm:items-center sm:justify-between sm:pb-[15.8px]">
        <p className="text-base font-normal text-[#454545]">© 2025 GDG JSATEN</p>
        <div className="mb-1 flex h-[24px] w-[294px] items-center gap-[30px] sm:justify-end">
          <SocialIcons />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
