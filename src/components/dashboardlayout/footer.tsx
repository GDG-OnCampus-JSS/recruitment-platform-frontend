import { Github, Linkedin, Instagram, Youtube, Twitter, X } from 'lucide-react';

export const Footer = () => {
  const SocialIcons = () => (
    <div className="flex gap-6">
      <a href="#" className="text-[#454545] transition-colors hover:text-gray-900">
        <Github className="h-6 w-6" />
      </a>
      <a href="#" className="text-[#454545] transition-colors hover:text-gray-900">
        <Linkedin className="h-6 w-6" />
      </a>
      <a href="#" className="text-[#454545] transition-colors hover:text-gray-900">
        <Instagram className="h-6 w-6" />
      </a>
      <a href="#" className="text-[#454545] transition-colors hover:text-gray-900">
        <Youtube className="h-6 w-6" />
      </a>
      <a href="#" className="text-[#454545] transition-colors hover:text-gray-900">
        <X className="h-6 w-6" />
      </a>
    </div>
  );

  return (
    <footer className="fixed bottom-0 left-0 mt-auto h-[212px] w-full border-t bg-white py-4">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col items-start justify-start gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <img src="/logo.jpeg" alt="Logo" className="h-9 w-9 rounded" />
              <span className="font-sans text-xl font-medium text-[#434343]">
                Google Developer Groups OnCampus
              </span>
            </div>
            <div className="flex flex-col gap-4 pl-12">
              <p className="font-sans text-[16px] font-normal leading-[19.41px] text-[#585858]">
                JSS Academy of Technical Education
              </p>
            </div>
            <div className="ml-10 mt-6 sm:hidden">
              <SocialIcons />
            </div>

            <p className="mt-4 text-sm text-[#454545] opacity-70 md:hidden">© 2025 GDG JSATEN</p>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div className="flex justify-end gap-[30px]">
            <SocialIcons />
          </div>

          <p className="hidden font-sans text-[16px] font-normal leading-[19.41px] text-[#454545] opacity-70 md:block">
            © 2025 GDG JSATEN
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
