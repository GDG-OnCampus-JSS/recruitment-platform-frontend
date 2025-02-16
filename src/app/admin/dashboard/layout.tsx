import Footer from '@/components/dashboardlayout/footer';
import Header from '@/components/dashboardlayout/header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Panel | GDG',
  description: 'Login to GDG for recruitments 2025.',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto p-4">{children}</main>
      <Footer />
    </div>
  );
}
