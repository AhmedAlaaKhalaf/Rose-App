import { TCategory } from "@/lib/types/statistics";
import { cn } from "@/lib/utils/tailwind-merge";
import { useLocale, useTranslations } from "next-intl";

type CategoryItemProps = {
  category: TCategory;
};

export default function CategoryItem({ category: { name, totalProducts } }: CategoryItemProps) {
  // Translations
  const t = useTranslations("dashboard.overview.1st-row.statistics.category");

  // Hooks
  const locale = useLocale();

  //
  return (
    <div
      className={cn(
        locale === "ar" ? "font-tajawal" : "font-inter",
        "border-b border-b-black/10 flex justify-between pb-2 text-zinc-800"
      )}
    >
      {/* Text  */}
      <p>{name}</p>

      {/* Frame 375  */}
      <span className="bg-black/5 px-2 py-1 rounded-md font-medium text-sm">
        {`${totalProducts} ${t("products-count")}`}
      </span>
    </div>
  );
}
