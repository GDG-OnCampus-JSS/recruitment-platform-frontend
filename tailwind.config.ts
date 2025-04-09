import type { Config } from 'tailwindcss';

const colors = ['register', 'task', 'aptitude', 'interview', 'result'];
const opacities = ['10', '20'];

// Generate all possible combinations for safelist
const safelist = [
  'bg-blue-gradient',
  'bg-yellow-gradient',
  'bg-red-gradient',
  ...colors.flatMap((color) => [
    `bg-${color}`,
    `text-${color}`,
    `border-${color}`,
    ...opacities.flatMap((opacity) => [
      `bg-${color}-${opacity}`,
      `text-${color}-${opacity}`,
      `border-${color}-${opacity}`,
    ]),
  ]),
];

export default {
  safelist,
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/constants/homePageConstants.ts',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'line-gradient':
          'linear-gradient(90deg, rgba(117, 120, 255, 0.46) 0%, rgba(122, 117, 136, 0) 84.43%, rgba(102, 102, 102, 0) 100%)',
        'blue-gradient':
          'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 79.81%, rgba(23, 194, 229, 0.20) 110.57%), radial-gradient(189.45% 125.93% at 95.28% 90.75%, #ECF5FF 0%, #FFF 40.25%)',
        'yellow-gradient':
          'linear-gradient(180deg, rgba(255, 255, 255, 0) 79.81%, rgba(229, 119, 23, 0.2) 110.57%), radial-gradient(189.45% 125.93% at 95.28% 90.75%, #FFFDEC 0%, #FFFFFF 40.25%)',
        'red-gradient':
          'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 79.81%, rgba(229, 23, 23, 0.20) 110.57%), radial-gradient(189.45% 125.93% at 95.28% 90.75%, #FFEFED 0%, #FFF 40.25%)',
        blue: 'linear-gradient(181deg, rgba(0, 0, 0, 0.00) 79.12%, rgba(65, 222, 246, 0.05) 99.35%), radial-gradient(119.93% 142.25% at 103.47% 102.91%, rgba(115, 109, 242, 0.12) 0%, rgba(255, 255, 255, 0.00) 100%)',
        'custom-card-gradient':
          'linear-gradient(181.5deg, rgba(0, 0, 0, 0) 79.12%, rgba(65, 222, 247, 0.052) 99.35%),radial-gradient(100.83% 100.34% at 103.47% 102.91%, rgba(115, 109, 242, 0.12) 0%, rgba(255, 255, 255, 0) 100%) ',
        'custom-gradient':
          ' linear-gradient(180deg, rgba(0, 0, 0, 0) 75%, rgba(65, 222, 247, 0.1) 100%) ,radial-gradient(80% 80% at 50% 50%, rgba(115, 109, 242, 0.2) 0%, rgba(255, 255, 255, 0) 100%)',
        'gradient-line':
          'linear-gradient(90deg, rgba(85, 85, 85, 0.00) 0%, rgba(99, 91, 255, 0.25) 59%)',

        'logo-grid': 'var(--bg-logo-grid)',
        'home-1': 'var(--bg-home-1)',
        'home-2': 'var(--bg-home-2)',
        'register-gradient': 'var(--bg-register-gradient)',
        'design-card': 'var(--design-card)',
        'web-card': 'var(--web-card)',
        'programming-card': 'var(--programming-card)',
        'android-card': 'var(--android-card)',
        'ml-card': 'var(--ml-card)',
        'gradient-1': 'var(--gradient-1)',
      },
      boxShadow: {
        'blue-button': '-4px -5px 24.6px 0px rgba(0, 0, 0, 0.25) inset',
        'yellow-button': '-4px -5px 24.6px 0px rgba(94, 94, 94, 0.14) inset',
        'red-button': '-4px -5px 24.6px 0px rgba(94, 94, 94, 0.25) inset',

        card: 'var(--shadow-card)',
      },
      colors: {
        'toast-warning': {
          DEFAULT: 'hsl(var(--toast-warning))',
          foreground: 'hsl(var(--toast-warning-foreground))',
          border: 'hsl(var(--toast-warning-border))',
          2: 'hsl(var(--toast-warning-2))',
        },
        'toast-error': {
          DEFAULT: 'hsl(var(--toast-error))',
          foreground: 'hsl(var(--toast-error-foreground))',
          border: 'hsl(var(--toast-error-border))',
          2: 'hsl(var(--toast-error-2))',
        },
        'toast-success': {
          DEFAULT: 'hsl(var(--toast-success))',
          foreground: 'hsl(var(--toast-success-foreground))',
          border: 'hsl(var(--toast-success-border))',
          2: 'hsl(var(--toast-success-2))',
        },
        'toast-info': {
          DEFAULT: 'hsl(var(--toast-info))',
          foreground: 'hsl(var(--toast-info-foreground))',
          border: 'hsl(var(--toast-info-border))',
          2: 'hsl(var(--toast-info-2))',
        },
        'toast-warning-serious': {
          DEFAULT: 'hsl(var(--toast-warning-serious))',
          foreground: 'hsl(var(--toast-warning-serious-foreground))',
          border: 'hsl(var(--toast-warning-serious-border))',
          2: 'hsl(var(--toast-warning-serious-2))',
        },
        'blue-button': '#4285f4',
        'yellow-button': '#fbbc04',
        'red-button': '#ea4335',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        gray: {
          'extra-light': 'hsl(var(--gray-extra-light))',
          light: 'hsl(var(--gray-light))',
          medium: 'hsl(var(--gray-medium))',
        },
        btn: {
          primary: 'hsl(var(--btn-primary))',
        },
        theme: {
          DEFAULT: 'hsl(var(--theme))',
          foreground: 'hsl(var(--theme-foreground))',
        },
        'theme-light': {
          DEFAULT: 'hsl(var(--theme-light))',
          foreground: 'hsl(var(--theme-foreground))',
        },
        'theme-interactive': {
          DEFAULT: 'hsl(var(--theme-interactive))',
          foreground: 'hsl(var(--theme-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        'border-card': 'hsl(var(--border-card))',
        domain: {
          design: 'hsla(var(--design))',
          'design-foreground': 'hsla(var(--design-foreground))',
          web: 'hsla(var(--web))',
          'web-foreground': 'hsla(var(--web-foreground))',
          programming: 'hsla(var(--programming))',
          'programming-foreground': 'hsla(var(--programming-foreground))',
          android: 'hsla(var(--android))',
          'android-foreground': 'hsla(var(--android-foreground))',
          ml: 'hsla(var(--ml))',
          'ml-foreground': 'hsla(var(--ml-foreground))',
        },

        // Card Border colors
        'domain-card': 'hsl(var(--domain-card))',
        main: 'hsl(var(--main))',

        // Journey Steps
        register: {
          DEFAULT: 'hsl(var(--register))',
          10: 'hsla(var(--register), 0.1)',
          20: 'hsla(var(--register), 0.2)',
        },
        task: {
          DEFAULT: 'hsl(var(--task))',
          10: 'hsla(var(--task), 0.1)',
          20: 'hsla(var(--task), 0.2)',
        },
        aptitude: {
          DEFAULT: 'hsl(var(--aptitude))',
          10: 'hsla(var(--aptitude), 0.1)',
          20: 'hsla(var(--aptitude), 0.2)',
        },
        interview: {
          DEFAULT: 'hsl(var(--interview))',
          10: 'hsla(var(--interview), 0.1)',
          20: 'hsla(var(--interview), 0.2)',
        },
        result: {
          DEFAULT: 'hsl(var(--result))',
          10: 'hsla(var(--result), 0.1)',
          20: 'hsla(var(--result), 0.2)',
        },
      },
      fontFamily: {
        'product-sans': ['var(--font-sans)'],
        playfair: ['Playfair Display', 'serif'],
      },
      fontSize: {
        small: [
          'var(--font-small)',
          {
            letterSpacing: 'var(--spacing-small)',
          },
        ],
        body: [
          'var(--font-body)',
          {
            letterSpacing: 'var(--spacing-body)',
          },
        ],
        'heading-2': [
          'var(--font-heading-2)',
          {
            letterSpacing: 'var(--spacing-heading-2)',
          },
        ],
        'heading-1': [
          'var(--font-heading-1)',
          {
            letterSpacing: 'var(--spacing-heading-1)',
          },
        ],
      },
      keyframes: {
        shine: {
          '0%': { 'background-position': '100%' },
          '100%': { 'background-position': '-100%' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        gradient: 'gradient 8s linear infinite',
        shine: 'shine 5s linear infinite',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
} satisfies Config;
