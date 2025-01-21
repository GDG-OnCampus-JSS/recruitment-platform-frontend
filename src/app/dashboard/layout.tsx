import Header from '@/components/dashboardlayout/header';
import Footer from '@/components/dashboardlayout/footer';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <main className="mx-auto max-w-7xl p-4">{children}</main>
      <Footer />
    </div>
  );
}
