import { Home, LayoutGrid, Globe, Medal, Dribbble, Linkedin, Github, Palette } from 'lucide-react';
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
  { href: '/website', label: 'Website', icon: Globe },
  { href: '/results', label: 'Results', icon: Medal },
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
    description: 'The final step, a conversation to seal your place.',
    icon: 'Users',
    buttonText: 'Schedule now',
    buttonVariant: 'destructive' as const,
    iconColor: '#EA4335',
    buttonBgColor: 'bg-[#EA4335]',
    gradientBg: 'bg-red-gradient',
    action: '#',
  },
];

export const yearOptions = [
  { id: '1', value: '1st year', label: '1st Year' },
  { id: '2', value: '2nd year', label: '2nd Year' },
];

export const domainOptions = [
  { id: '1', value: 'Design', label: 'Design' },
  { id: '2', value: 'Web Development', label: 'Development' },
  { id: '3', value: 'AI', label: 'AI' },
  { id: '4', value: ' Android Development', label: 'Android Development' },
  { id: '5', value: 'Programming', label: 'Programming' },
];

export const SOCIAL_PLATFORMS = [
  { platform: 'Dribbble', icon: <Dribbble className="h-4 w-4" /> },
  { platform: 'Behance', icon: <Palette className="h-4 w-4" /> },
  { platform: 'LinkedIn', icon: <Linkedin className="h-4 w-4" /> },
  { platform: 'GitHub', icon: <Github className="h-4 w-4" /> },
];

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
};
export const reqFields = ['name', 'email', 'phone', 'admissionNumber','photo', 'domain', 'year', 'resume'];
