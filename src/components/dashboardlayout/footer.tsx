import { Github, Linkedin, Instagram, Youtube,Twitter ,X} from "lucide-react";

export const Footer = () => {
  const SocialIcons = () => (
  <div className="flex gap-6">
  <a href="#" className="text-[#454545] hover:text-gray-900 transition-colors">
    <Github className="w-6 h-6" />
  </a>
  <a href="#" className="text-[#454545] hover:text-gray-900 transition-colors">
    <Linkedin className="w-6 h-6" />
  </a>
  <a href="#" className="text-[#454545] hover:text-gray-900 transition-colors">
    <Instagram className="w-6 h-6" />
  </a>
  <a href="#" className="text-[#454545] hover:text-gray-900 transition-colors">
    <Youtube className="w-6 h-6" />
  </a>
  <a href="#" className="text-[#454545] hover:text-gray-900 transition-colors">
    <X className="w-6 h-6" />
  </a>
</div>
);

  return (
    <footer className="w-full h-[212px] bg-white border-t mt-auto fixed bottom-0 left-0 py-4">
      <div className="max-w-7xl mx-auto px-4 py-8 ">
        <div className="flex flex-col items-start justify-start gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <img
              src="/logo.jpeg"
              alt="Logo"
              className="rounded w-9 h-9"
            />
            <span className="font-medium font-sans text-xl text-[#434343] ">
              Google Developer Groups OnCampus
            </span>
          </div>
          <div className="flex flex-col gap-4 pl-12">
          <p className="text-[16px] leading-[19.41px] font-sans font-normal text-[#585858] ">
            JSS Academy of Technical Education
          </p>
          
          </div>
          <div className="sm:hidden ml-10 mt-6">
              <SocialIcons />
            </div>

          <p className="text-sm text-[#454545] opacity-70 mt-4 md:hidden">
              © 2025 GDG JSATEN
            </p>
          </div>
          </div>
          
          <div className="flex flex-col  justify-between">
          <div className="flex gap-[30px] justify-end ">
          <SocialIcons />
          </div>
          
          <p className="hidden  md:block opacity-70 text-[16px] leading-[19.41px] font-sans font-normal text-[#454545]">
            © 2025 GDG JSATEN
          </p>
        </div>
        </div>

    </footer>
  );
};

export default Footer;