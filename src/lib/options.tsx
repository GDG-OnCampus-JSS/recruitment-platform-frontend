import { Home, LayoutGrid, Globe, Medal, Link } from 'lucide-react';
import Image from 'next/image';
import { JSX } from 'react';
import { DropdownOption, NavItem, SocialPlatform } from './types';

export const options: DropdownOption[] = [
  {
    label: 'Profile',
    value: 'profile',
  },
  {
    label: 'Logout',
    value: 'logout',
  },
];

export const navItems: NavItem[] = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { href: 'https://www.gdscjss.in/', label: 'Website', icon: Globe },
  { href: '/results', label: 'Results', icon: Medal },
];

export const socials = [
  {
    id: 1,
    name: 'Instagram',
    icon: 'mingcute:instagram-fill',
    url: 'https://www.instagram.com/gdgoncampus.jss',
  },
  {
    id: 2,
    name: 'LinkedIn',
    icon: 'mdi:linkedin',
    url: 'https://www.linkedin.com/company/dsc-jssaten/',
  },
  { id: 3, name: 'Twitter', icon: 'mdi:twitter', url: 'https://x.com/GDSCJSSATEN' },
  {
    id: 4,
    name: 'Website',
    icon: 'mdi:web',
    url: 'https://www.gdscjss.in/',
  },
];

export const steps = [
  {
    step: 1,
    title: 'Task Round',
    description: 'Show your technical prowess up with your solution.',
    icon: 'ClipboardList',
    buttonText: 'View more',
    buttonVariant: 'outline' as const,
    iconColor: '#4285F4',
    buttonBgColor: 'bg-[#4285F4]',
    gradientBg: 'bg-blue-gradient',
    action: '/dashboard/taskRound',
  },
  {
    step: 2,
    title: 'Aptitude Quiz',
    description: 'A quick 30-min quiz to test your technical aptitude.',
    icon: 'Brain',
    buttonText: 'Start Quiz',
    buttonVariant: 'default' as const,
    iconColor: '#FBBC04',
    buttonBgColor: 'bg-[#FBBC04]',
    gradientBg: 'bg-yellow-gradient',
    action: '/dashboard/aptitudeQuiz',
  },
  {
    step: 3,
    title: 'Personal Interview',
    description: 'The final step: a conversation to seal your place.',
    icon: 'Users',
    buttonText: 'Schedule now',
    buttonVariant: 'destructive' as const,
    iconColor: '#EA4335',
    buttonBgColor: 'bg-[#EA4335]',
    gradientBg: 'bg-red-gradient',
    action: '#',
  },
];

export const SOCIAL_PLATFORMS = [
  { name: 'Portfolio', icon: <Link className="size-5" /> },
  {
    name: 'LinkedIn',
    icon: <Image src="/icons/linkedin.svg" width={20} height={20} alt="Li" className="size-5" />,
  },
  {
    name: 'GitHub',
    icon: <Image src="/icons/github.svg" width={20} height={20} alt="Gi" className="size-5" />,
  },
  {
    name: 'Dribble',
    icon: <Image src="/icons/dribble.svg" width={20} height={20} alt="Dr" className="size-5" />,
  },
  {
    name: 'Behance',
    icon: <Image src="/icons/behance.svg" width={20} height={20} alt="Be" className="size-5" />,
  },
  {
    name: 'Codechef',
    icon: <Image src="/icons/codechef.svg" width={20} height={20} alt="CC" className="size-5" />,
  },
  { name: 'Other', icon: <Globe className="size-5" /> },
];

export const socialIconMapping: Record<string, JSX.Element> = {
  portfolio: <Image src="/icons/link.svg" width={20} height={20} alt="Li" className="size-5" />,
  linkedin: <Image src="/icons/linkedin.svg" width={20} height={20} alt="Li" className="size-5" />,
  github: <Image src="/icons/github.svg" width={20} height={20} alt="Gi" className="size-5" />,
  dribbble: <Image src="/icons/dribble.svg" width={20} height={20} alt="Dr" className="size-5" />,
  behance: <Image src="/icons/behance.svg" width={20} height={20} alt="Be" className="size-5" />,
  codechef: <Image src="/icons/codechef.svg" width={20} height={20} alt="CC" className="size-5" />,
};

export const mockUser = {
  id: 'dev-123',
  name: 'Developer User',
  email: 'developer@example.com',
  phone: '+91 9876543210',
  admissionNumber: '23cseds999',
  domain: 'Design',
  year: '1st year',
  photo: '/DP.jpeg',
  resume: null,
  socialLinks: [
    { platform: 'Dribbble', url: 'https://dribbble.com/profile', icon: 'dribbble' },
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/profile', icon: 'linkedin' },
    { platform: 'GitHub', url: 'https://github.com/profile', icon: 'github' },
  ],
  projectStatus: false,
  interviewStatus: false,
  reviewStatus: false,
};
export const reqFields = [
  'name',
  'email',
  'phone',
  'admissionNumber',
  'photo',
  'domain',
  'year',
  'resume',
];

export const mockAptitude = {
  aptitudes: [
    {
      id: 'aptitude1',
      aptitudeTitle: 'Graphic Design Basics',
      aptitudeShortDesc: 'Fundamentals of graphic design',
      aptitudeLongDesc: 'Covers principles of design, typography, and color theory.',
      aptitudeDomain: 'Design',
      aptitudeYear: 2024,
      aptitudeDuration: 60,
      isDeleted: false,
      aptitudeQuestions: [
        {
          id: 'q1',
          questionShortDesc: 'What is the primary purpose of contrast in design?',
          questionLongDesc:
            'Contrast is used to make elements stand out. How does it impact user experience?',
          aptitudeId: 'aptitude1',
          isDeleted: false,
          options: [
            { id: 'o1', optionText: 'To blend elements', isCorrect: false },
            { id: 'o2', optionText: 'To create visual hierarchy', isCorrect: true },
            { id: 'o3', optionText: 'To remove distractions', isCorrect: false },
            { id: 'o4', optionText: 'To add more text', isCorrect: false },
          ],
        },
        {
          id: 'q2',
          questionShortDesc: 'Which color model is used for print design?',
          questionLongDesc:
            'Digital and print designs use different color models. Which one is standard for print?',
          aptitudeId: 'aptitude1',
          isDeleted: false,
          options: [
            { id: 'o5', optionText: 'RGB', isCorrect: false },
            { id: 'o6', optionText: 'CMYK', isCorrect: true },
            { id: 'o7', optionText: 'HEX', isCorrect: false },
            { id: 'o8', optionText: 'HSB', isCorrect: false },
          ],
        },
        {
          id: 'q3',
          questionShortDesc: 'What is a wireframe in UI design?',
          questionLongDesc:
            'Wireframes are used in the early stages of UI design. What is their purpose?',
          aptitudeId: 'aptitude2',
          isDeleted: false,
          options: [
            { id: 'o9', optionText: 'A detailed final design', isCorrect: false },
            { id: 'o10', optionText: 'A basic layout representation', isCorrect: true },
            { id: 'o11', optionText: 'A color scheme for the UI', isCorrect: false },
            { id: 'o12', optionText: 'A set of interactive animations', isCorrect: false },
          ],
        },
        {
          id: 'q4',
          questionShortDesc: 'Which of these improves website accessibility?',
          questionLongDesc: 'Accessibility is crucial for web design. Which practice enhances it?',
          aptitudeId: 'aptitude2',
          isDeleted: false,
          options: [
            { id: 'o13', optionText: 'Using small text sizes', isCorrect: false },
            { id: 'o14', optionText: 'Providing alternative text for images', isCorrect: true },
            { id: 'o15', optionText: 'Using only high-contrast colors', isCorrect: false },
            { id: 'o16', optionText: 'Avoiding keyboard navigation', isCorrect: false },
          ],
        },
      ],
    },
  ],
};
