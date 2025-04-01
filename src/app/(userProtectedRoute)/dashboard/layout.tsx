import Footer from '@/components/dashboardlayout/footer';
import Header from '@/components/dashboardlayout/header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header isAdmin={false}/>
      <main className="mx-auto w-full min-w-[320px] p-4">{children}</main>
      <Footer />
    </div>
  );
}
