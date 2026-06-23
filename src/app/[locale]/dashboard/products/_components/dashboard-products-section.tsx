import { Button } from "@/components/ui/button";
import { Plus, Rose } from "lucide-react";
import { SearchParams } from "@/lib/types/global";
import { Link } from "@/i18n/navigation";
import DashboardProductsTable from "./dashboard-products-table";
import { cn } from "@/lib/utils/tailwind-merge";
import DashboardProductSearch from "./dashboard.product.search";
import { getDashboardProducts } from "@/lib/services/product.service";
import { getLocale, getTranslations } from "next-intl/server";
type DashboardProductsSectionProps = {
  searchParams: SearchParams;
};

export default async function DashboardProductsSection({
  searchParams,
}: DashboardProductsSectionProps) {
  // Translations
  const t = await getTranslations("dashboard.products");

  // Services
  const { payload } = await getDashboardProducts(searchParams);

  // Hooks
  const locale = await getLocale();

  return (
    <section className="flex flex-col justify-between h-screen">
      {/* Products list  */}
      <section
        className={cn(
          locale === "ar" ? "font-tajawal" : "font-inter",
          "bg-white rounded-3xl space-y-4 p-6"
        )}
      >
        {/* Header  */}
        <header className="flex justify-between items-center">
          <h1 className="font-semibold text-zinc-800 text-2xl capitalize leading-none">
            {t("header")}
          </h1>
          <Button asChild>
            <Link href="/dashboard/products/add">
              <Plus size={22} strokeWidth={2.08} />
              <span className="hidden md:block"> {t("button.add")}</span>
            </Link>
          </Button>
        </header>

        {/* Search  */}
        <DashboardProductSearch />

        {/* Products list  */}
        <DashboardProductsTable searchParams={searchParams} />
      </section>

      {/* No data to display.  */}
      <div className="flex flex-col justify-end h-full">
        {!payload.data.length && (
          <div
            className={cn(
              locale === "ar" && "font-tajawal",
              "flex flex-1 flex-col justify-center items-center gap-3 py-20 font-medium text-zinc-500 text-sm capitalize leading-none"
            )}
          >
            <Rose className="size-12 text-zinc-500" strokeWidth={1.75} />
            {t("no-products-message")} &quot;{searchParams.keyword}&quot;
          </div>
        )}
        {/* Pagination  */}
        {/* <CustomPagination /> */}
      </div>
    </section>
  );
}
