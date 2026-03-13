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
    <div
      className={`${nunitoSans.variable} gap-4 md:gap-0 grid grid-cols-10 bg-zinc-50 font-inter`}
    >
      {/* Side bar */}
      <DashboardSidebar />

      <main className="flex flex-col gap-4 col-span-10 md:col-span-8 mx-auto container">
        {/* Header */}
        <div className="hidden md:block border-black/10 border-b">
          <DashboardBreadcrumb />
        </div>

        {/* Content */}
        {children}
      </main>
    </div>
  );
}
