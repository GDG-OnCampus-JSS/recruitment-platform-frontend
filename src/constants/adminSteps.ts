import brain from '@/components/dashboardlayout/brain';
import clip from '@/components/dashboardlayout/clip-board';
import meet from '@/components/dashboardlayout/meet';
import { StepCardProps } from '@/lib/types';

export const adminSteps: StepCardProps[] = [
  {
    step: 1,
    title: 'Task Round',
    description: '',
    icon: clip,
    buttonText: 'View List',
    buttonVariant: 'outline' as const,
    iconColor: '#4285F4',
    buttonBgColor: 'bg-[#4285F4]',
    gradientBg: 'bg-blue-gradient',
    action: '/',
    eventStartDate: new Date('2023-10-01T00:00:00Z'),
    eventEndDate: new Date('2023-10-31T23:59:59Z'),
  },
  {
    step: 2,
    title: 'Create Quiz',
    description: '',
    icon: brain,
    buttonText: 'View Quiz',
    buttonVariant: 'default' as const,
    iconColor: '#FBBC04',
    buttonBgColor: 'bg-[#FBBC04]',
    gradientBg: 'bg-yellow-gradient',
    action: 'dashboard/create-quiz',
    eventStartDate: new Date('2023-10-01T00:00:00Z'),
    eventEndDate: new Date('2023-10-31T23:59:59Z'),
  },
  {
    step: 3,
    title: 'All Candidates',
    description: '',
    icon: meet,
    buttonText: 'View List',
    buttonVariant: 'destructive' as const,
    iconColor: '#EA4335',
    buttonBgColor: 'bg-[#EA4335]',
    gradientBg: 'bg-red-gradient',
    action: 'dashboard/all-candidates',
    eventStartDate: new Date('2023-10-01T00:00:00Z'),
    eventEndDate: new Date('2023-10-31T23:59:59Z'),
  },
];
