import { Android } from '../../public/home';
import { AndroidBlob } from '../../public/home';
import { Design } from '../../public/home';
import { DesignBlob } from '../../public/home';
import { MachineLearning } from '../../public/home';
import { MachineLearningBlob } from '../../public/home';
import { Programming } from '../../public/home';
import { ProgrammingBlob } from '../../public/home';
import { WebBlob } from '../../public/home';
import { WebDev } from '../../public/home';

export const cardData = [
  {
    title: 'Design',
    description:
      "We're a vibrant community for anyone who cares for design. We share stories, uncover insights, surface opportunities in Design.",
    className: 'bg-design-card text-domain-design',
    descriptionClass: 'text-domain-design-foreground',
    logoComponent: Design,
    decorComponent: DesignBlob,
  },
  {
    title: 'Web Development',
    description:
      'Build the web, shape the future. Join our community to explore the endless possibilities of web development.',
    className: 'bg-web-card text-domain-web',
    descriptionClass: 'text-domain-web-foreground',
    logoComponent: WebDev,
    decorComponent: WebBlob,
  },
  {
    title: 'Programming',
    description:
      'Code your ideas into reality. Discover tools, share knowledge, and grow your programming skills.',
    className: 'bg-programming-card text-domain-programming',
    descriptionClass: 'text-domain-programming-foreground',
    logoComponent: Programming,
    decorComponent: ProgrammingBlob,
  },
  {
    title: 'Android Development',
    description:
      'Create apps that impact lives. Dive into Android development with support from a thriving community.',
    className: 'bg-android-card text-domain-android',
    descriptionClass: 'text-domain-android-foreground',
    logoComponent: Android,
    decorComponent: AndroidBlob,
  },
  {
    title: 'Machine Learning',
    description:
      'Unlock the power of data. Explore machine learning, build models, and innovate with artificial intelligence.',
    className: 'bg-ml-card text-domain-ml',
    descriptionClass: 'text-domain-ml-foreground',
    logoComponent: MachineLearning,
    decorComponent: MachineLearningBlob,
  },
];

export const journeySteps = [
  {
    id: 1,
    title: 'Registration',
    description: 'Start your jounery by registering.',
    duration: "12 April '25",
    accentColor: 'register',
    iconSrc: '/icons/register.svg',
  },
  {
    id: 2,
    title: 'Knowing You',
    description: 'Unleash your intellect with brilliance.',
    duration: "13 April '25",
    accentColor: 'task',
    iconSrc: '/icons/task.svg',
  },
  {
    id: 3,
    title: 'Task Round',
    description: 'Submit an allotted project. ',
    duration: "14 April '25 - 16 April '25 (12:00 PM)",
    accentColor: 'aptitude',
    iconSrc: '/icons/aptitude.svg',
  },
  {
    id: 4,
    title: 'Coding Contest',
    description: 'Submit an allotted project. ',
    duration: "15 April '25",
    accentColor: 'aptitude',
    iconSrc: '/icons/aptitude.svg',
  },
  {
    id: 5,
    title: 'Interview Round',
    description: 'Present your best self in the interview.',
    duration: "17 April '25",
    accentColor: 'interview',
    iconSrc: '/icons/interview.svg',
  },
  {
    id: 6,
    title: 'Final Results',
    description: 'Celebrate Your Achievement',
    duration: "19 April '25",
    accentColor: 'result',
    iconSrc: '/icons/result.svg',
  },
];

export const stepColors = [
  { background: 'register-20', tick: 'register', border: 'register' },
  { background: 'task-20', tick: 'task', border: 'task' },
  { background: 'aptitude-20', tick: 'aptitude', border: 'aptitude' },
  { background: 'interview-20', tick: 'interview', border: 'interview' },
  { background: 'result-20', tick: 'result', border: 'result' },
];
