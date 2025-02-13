import Footer from '@/components/dashboardlayout/footer';
import Header from '@/components/dashboardlayout/header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Panel | GDG',
  description: 'Login to GDG for recruitments 2025.',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  );
}
