import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'line-gradient': 'linear-gradient(90deg, rgba(117, 120, 255, 0.46) 0%, rgba(122, 117, 136, 0) 84.43%, rgba(102, 102, 102, 0) 100%)',
        'blue-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0) 79.81%, rgba(23, 194, 229, 0.2) 110.57%), radial-gradient(189.45% 125.93% at 95.28% 90.75%, #ecf5ff 0%, #fff 40.25%)',
        'yellow-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0) 79.81%, rgba(229, 119, 23, 0.2) 110.57%), radial-gradient(189.45% 125.93% at 95.28% 90.75%, #fffdec 0%, #fff 40.25%)',
        'red-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0) 79.81%, rgba(229, 23, 23, 0.2) 110.57%), radial-gradient(189.45% 125.93% at 95.28% 90.75%, #ffefed 0%, #fff 40.25%)',
        'custom-card-gradient': 'linear-gradient(181.5deg, rgba(0, 0, 0, 0) 79.12%, rgba(65, 222, 247, 0.052) 99.35%),radial-gradient(100.83% 100.34% at 103.47% 102.91%, rgba(115, 109, 242, 0.12) 0%, rgba(255, 255, 255, 0) 100%) ',
      },
      boxShadow: {
        'blue-button': '-4px -5px 24.6px 0px rgba(0, 0, 0, 0.25) inset',
        'yellow-button': '-4px -5px 24.6px 0px rgba(94, 94, 94, 0.14) inset',
        'red-button': '-4px -5px 24.6px 0px rgba(94, 94, 94, 0.25) inset',
      },
      colors: {
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
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
