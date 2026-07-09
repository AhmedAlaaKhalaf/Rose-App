import DashboardSidebar from "./_components/dashboard-sidebar";
import DashboardBreadcrumb from "./_components/dashboard-breadcrumb";
import { Nunito_Sans } from "next/font/google";

type LayoutProps = {
  children: React.ReactNode;
};

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunitoSans",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export default function DashboardLayout({ children }: LayoutProps) {
  return (
    <div className={`${nunitoSans.variable} grid grid-cols-10 bg-zinc-50 h-screen overflow-hidden`}>
      {/* Side bar */}
      <DashboardSidebar />

      <main className="col-span-10 md:col-span-8 overflow-y-auto">
        {/* Header */}
        <div className="hidden md:block border-black/10 border-b bg-white sticky top-0 z-10">
          <DashboardBreadcrumb />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-6 mx-auto container py-6">
          {children}
        </div>
      </main>
    </div>
  );
}
