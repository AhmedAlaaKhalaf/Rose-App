import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Flower } from "lucide-react";
import Image from "next/image";
import DashboardNavLinks from "./nav-links";
import UserInfo from "./user-info";
import DashboardBreadcrumb from "./dashboard-breadcrumb";
import MobileNavLinks from "./mobile-nav-links";
import { useTranslations } from "next-intl";

export default function DashboardSidebar() {
  // Translation
  const t = useTranslations("dashboard-layout");

  return (
    <>
      <aside className="hidden md:flex flex-col justify-between items-center col-span-2 bg-white p-6 border-black/10 border-r h-screen">
        {/* Sidebar: Logo, HomeButton, NavLinks */}
        <div className="flex flex-col items-center gap-6 w-full">
          {/* Logo */}
          <Image src="/assets/logo.png" alt="Logo" width={120} height={112} />

          {/* Home Button */}
          <Button className="w-full font-inter font-semibold">
            <Link href={"/"} className="flex items-center gap-2">
              <Flower /> {t("home-button")}
            </Link>
          </Button>

          {/* Dashboard Nav Links */}
          <DashboardNavLinks />
        </div>

        {/*Sidebar: User Info */}
        <UserInfo />
      </aside>

      {/* Mobile Screen */}
      <header className="md:hidden flex items-center gap-2 col-span-10 bg-white pr-4 pl-4">
        <Image sizes="auto" src="/assets/logo.png" alt="Logo" width={60} height={57} />

        <div className="flex-1">
          <DashboardBreadcrumb />
        </div>

        <UserInfo />

        <MobileNavLinks />
      </header>
    </>
  );
}
