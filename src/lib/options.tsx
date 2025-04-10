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
  { name: 'Any Other', icon: <Globe className="size-5" /> },
];

export const socialIconMapping: Record<string, JSX.Element> = {
  portfolio: <Image src="/icons/link.svg" width={20} height={20} alt="Li" className="size-5" />,
  linkedin: <Image src="/icons/linkedin.svg" width={20} height={20} alt="Li" className="size-5" />,
  github: <Image src="/icons/github.svg" width={20} height={20} alt="Gi" className="size-5" />,
  dribbble: <Image src="/icons/dribble.svg" width={20} height={20} alt="Dr" className="size-5" />,
  behance: <Image src="/icons/behance.svg" width={20} height={20} alt="Be" className="size-5" />,
  codechef: <Image src="/icons/codechef.svg" width={20} height={20} alt="CC" className="size-5" />,
  other: <Image src="/icons/link.svg" width={20} height={20} alt="Li" className="size-5" />,
  anyother: <Image src="/icons/link.svg" width={20} height={20} alt="Li" className="size-5" />,
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
          correctAnswer: 'ans1',
        },
        {
          id: 'q2',
          questionShortDesc: 'Which color model is used for print design?',
          questionLongDesc:
            'Digital and print designs use different color models. Which one is standard for print?',
          aptitudeId: 'aptitude1',
          isDeleted: false,
          correctAnswer: 'ans2',
        },
        {
          id: 'q3',
          questionShortDesc: 'What is a wireframe in UI design?',
          questionLongDesc:
            'Wireframes are used in the early stages of UI design. What is their purpose?',
          aptitudeId: 'aptitude1',
          isDeleted: false,
          correctAnswer: 'ans4',
        },
        {
          id: 'q4',
          questionShortDesc: 'Which practices improve website accessibility?',
          questionLongDesc:
            'Accessibility is crucial for web design. Describe practices that enhance it.',
          aptitudeId: 'aptitude1',
          isDeleted: false,
          correctAnswer: 'ans4',
        },
        {
          id: 'q5',
          questionShortDesc: 'ques5.',
          questionLongDesc:
            'White space (or negative space) is an important design principle. What is its purpose?',
          aptitudeId: 'aptitude1',
          isDeleted: false,
          correctAnswer: 'ans5',
        },
        {
          id: 'q6',
          questionShortDesc: 'ques6',
          questionLongDesc:
            'The rule of thirds is a fundamental principle in visual composition. Explain how it works.',
          aptitudeId: 'aptitude1',
          isDeleted: false,
          correctAnswer: 'ans6',
        },
        {
          id: 'q7',
          questionShortDesc: 'ques7',
          questionLongDesc:
            'Typography includes different font classifications. What distinguishes serif from sans-serif fonts?',
          aptitudeId: 'aptitude1',
          isDeleted: false,
          correctAnswer: 'ans7',
        },
        {
          id: 'q8',
          questionShortDesc: 'ques8',
          questionLongDesc: 'Mood boards are used in the design process. What is their function?',
          aptitudeId: 'aptitude1',
          isDeleted: false,
          correctAnswer: '8ans8',
        },
        {
          id: 'q9',
          questionShortDesc: 'ques9.',
          questionLongDesc:
            'Visual hierarchy organizes elements in a design. How does it work and why is it important?',
          aptitudeId: 'aptitude1',
          isDeleted: false,
          correctAnswer: 'ans9',
        },
        {
          id: 'q10',
          questionShortDesc: 'ques10',
          questionLongDesc:
            'Responsive design is essential for modern websites. Explain what it means and why it matters.',
          aptitudeId: 'aptitude1',
          isDeleted: false,
          correctAnswer: 'ans10',
        },
        {
          id: 'q11',
          questionShortDesc: 'ques11',
          questionLongDesc:
            'Gestalt principles explain how humans perceive visual elements. What are these principles and how do they apply to design?',
          aptitudeId: 'aptitude1',
          isDeleted: false,
          correctAnswer: 'ans11',
        },
        {
          id: 'q12',
          questionShortDesc: 'ques12',
          questionLongDesc:
            'Design systems have become increasingly important in product design. What are they and why are they valuable?',
          aptitudeId: 'aptitude1',
          isDeleted: false,
          correctAnswer: 'ans12',
        },
        {
          id: 'q13',
          questionShortDesc: 'qques13',
          questionLongDesc:
            'Affordance is a key concept in user interface design. What does it mean and why is it important?',
          aptitudeId: 'aptitude1',
          isDeleted: false,
          correctAnswer: 'ans13',
        },
        {
          id: 'q14',
          questionShortDesc: 'ques14',
          questionLongDesc:
            'UX and UI are related but distinct aspects of design. Explain the difference between them.',
          aptitudeId: 'aptitude1',
          isDeleted: false,
          correctAnswer: 'ans14',
        },
        {
          id: 'q15',
          questionShortDesc: 'ques15',
          questionLongDesc:
            'Colors can evoke emotions and associations. How does color psychology influence design decisions?',
          aptitudeId: 'aptitude1',
          isDeleted: false,
          correctAnswer: 'ans15',
        },
        {
          id: 'q16',
          questionShortDesc: 'ques16',
          questionLongDesc:
            'User personas are common in UX design. What are they and how do they help the design process?',
          aptitudeId: 'aptitude1',
          isDeleted: false,
          correctAnswer: 'ans16',
        },
        {
          id: 'q17',
          questionShortDesc: 'ques17',
          questionLongDesc:
            'Information architecture structures content in digital products. What does it involve and why is it important?',
          aptitudeId: 'aptitude1',
          isDeleted: false,
          correctAnswer: 'ans17',
        },
        {
          id: 'q18',
          questionShortDesc: 'ques18',
          questionLongDesc:
            'Design tokens are becoming common in modern design systems. Explain what they are and their benefits.',
          aptitudeId: 'aptitude1',
          isDeleted: false,
          correctAnswer: 'ans18',
        },
        {
          id: 'q19',
          questionShortDesc: 'ques19.',
          questionLongDesc:
            'Minimalism is a popular approach in modern design. What are its key principles and benefits?',
          aptitudeId: 'aptitude1',
          isDeleted: false,
          correctAnswer: 'ans19',
        },
        {
          id: 'q20',
          questionShortDesc: 'ques20',
          questionLongDesc:
            'Inclusive design aims to create products usable by as many people as possible. How does accessibility fit into this approach?',
          aptitudeId: 'aptitude1',
          isDeleted: false,
          correctAnswer: 'ans20',
        },
      ],
    },
  ],
};
