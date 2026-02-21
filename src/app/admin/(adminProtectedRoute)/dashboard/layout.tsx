import { Metadata } from 'next';
import { Header } from '@/components/admin/header';
import Footer from '@/components/dashboardlayout/footer';

export const metadata: Metadata = {
  title: 'Admin Panel | GDG',
  description: 'Login to GDG for recruitments 2025.',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* <Header isAdmin={true} /> */}
      <Header />
      <main className="mx-auto w-full min-w-[320px] p-4">{children}</main>
      <Footer />
    </div>
  );
}
