import brain from '@/components/dashboardlayout/brain';
import clip from '@/components/dashboardlayout/clip-board';
import meet from '@/components/dashboardlayout/meet';
import { StepCardProps } from '@/lib/types';

export const steps: StepCardProps[] = [
  {
    step: 1,
    title: 'Knowing You',
    description: 'An interactive quiz to test your abilities.',
    icon: brain,
    buttonText: 'Start Now',
    buttonBgColor: 'bg-[#FBBC04]',
    gradientBg: 'bg-yellow-gradient',
    action: '/dashboard/quiz',
    eventStartDate: new Date('2025-04-13T00:00:00'),
    eventEndDate: new Date('2025-04-14T00:00:00'),
  },
  {
    step: 2,
    title: 'Task Round',
    description: 'Solve and create! Impress us with your solution.',
    icon: clip,
    buttonText: 'View Tasks',
    buttonBgColor: 'bg-[#4285F4]',
    gradientBg: 'bg-blue-gradient',
    action: '/dashboard/task-round',
    eventStartDate: new Date('2025-04-14T00:00:00'),
    eventEndDate: new Date('2025-04-06T12:59:00'),
  },
  {
    step: 3,
    title: 'Personal Interview',
    description: 'The final step, a conversation to seal your place.',
    icon: meet,
    buttonText: 'View Timing',
    buttonBgColor: 'bg-[#EA4335]',
    gradientBg: 'bg-red-gradient',
    action: '#',
    eventStartDate: new Date('2025-04-17T00:00:00'),
    eventEndDate: new Date('2025-04-08T03:00:00'),
  },
  {
    step: 4,
    title: 'Coding Contest',
    description: 'Prove your coding prowess in timed algorithmic challenges.',
    icon: clip,
    buttonText: 'Start Now',
    buttonBgColor: 'bg-[#4285F4]',
    gradientBg: 'bg-blue-gradient',
    action: '/dashboard/task-round',
    eventStartDate: new Date('2025-04-15T00:00:00'),
    eventEndDate: new Date('2025-04-16T00:00:00'),
  },
];
