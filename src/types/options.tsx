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

export const yearOptions = [
  { value: '1st year', label: '1st Year' },
  { value: '2nd year', label: '2nd Year' },
];

export const domainOptions = [
  { value: 'Design', label: 'Design' },
  { value: 'Web Development', label: 'Development' },
  { value: 'AI', label: 'AI' },
  { value: ' Android Development', label: 'Android Development' },
  { value: 'Programming', label: 'Programming' },
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
  socialLinks: [
    { platform: 'Dribbble', url: 'https://dribbble.com/profile', icon: 'dribbble' },
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/profile', icon: 'linkedin' },
    { platform: 'GitHub', url: 'https://github.com/profile', icon: 'github' },
  ],
};
export const reqFields = ['name', 'email', 'phone', 'admissionNumber', 'domain', 'year', 'resume'];
