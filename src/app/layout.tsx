import { type Metadata } from 'next';
import { Geist, Geist_Mono, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import Header from '@/components/common/header-landing';
import { Toaster } from '@/components/ui/toaster';

const jetBrainsMono = JetBrains_Mono({
  weight: '400',
  subsets: ['latin'],
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const productSans = localFont({
  src: [
    {
      path: '../../public/fonts/Product-Sans-Regular.ttf',
      weight: '400',
    },
    {
      path: '../../public/fonts/Product Sans Medium 500.ttf',
      weight: '500',
    },
    {
      path: '../../public/fonts/Product-Sans-Bold.ttf',
      weight: '700',
    },
  ],
  variable: '--font-product-sans',
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'GDG | JSSATEN',
  description: 'Register to GDG onCampus JSSATEN Recruitments 2025!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${productSans.variable}`}>
      <body className="font-product-sans antialiased">
        <Toaster />
        {children}
      </body>
    </html>
  );
}
