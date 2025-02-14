import Header from '@/components/dashboardlayout/header';
import Footer from '@/components/dashboardlayout/footer';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto p-4">{children}</main>
      <Footer />
    </div>
  );
}
