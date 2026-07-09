"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const BREADCRUMB_KEYS: Record<string, string> = {
  categories: "breadcrumb-categories",
  occasions: "breadcrumb-occasions",
  products: "breadcrumb-products",
  account: "breadcrumb-account",
};

export default function DashboardBreadcrumb() {
  // Translations
  const t = useTranslations("dashboard-layout");
  // Variales
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const section = segments[0]; // e.g. "dashboard"
  const subpage = segments[1]; // e.g. "categories" | "occasions" | "products"

  const isDashboardRoot = section === "dashboard" && !subpage;

  // BreadCrumb
  return (
    <Breadcrumb className="flex items-center bg-white px-4 h-[4.38rem]">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            href={"/dashboard"}
            className="flex items-center gap-2 text-gray-500 text-sm"
          >
            {t("breadcrumb-segmentone")}
          </BreadcrumbLink>
        </BreadcrumbItem>

        {!isDashboardRoot && (
          <>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage className="flex items-center gap-2 text-maroon-600 text-sm">
                {BREADCRUMB_KEYS[subpage] ? t(BREADCRUMB_KEYS[subpage]) : subpage}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
