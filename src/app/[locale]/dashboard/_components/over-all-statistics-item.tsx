import { TStatisticsObject } from "@/lib/types/statistics";
import { cn } from "@/lib/utils/tailwind-merge";
import { CircleDollarSign, ClipboardList, LucideIcon, Package, ReceiptText } from "lucide-react";
import { useFormatter, useLocale, useTranslations } from "next-intl";

type OverAllStatisticsItemProps = {
  statistics: {
    name: keyof TStatisticsObject;
    value: TStatisticsObject[keyof TStatisticsObject];
  };
};

export default function OverAllStatisticsItem({
  statistics: { name, value },
}: OverAllStatisticsItemProps) {
  //Translation
  const t = useTranslations("dashboard.overview.1st-row.statistics.total-over-all");

  // Hooks
  const format = useFormatter();
  const locale = useLocale();

  // Variables
  const STYLES: Record<keyof TStatisticsObject, string> = {
    totalProducts: "text-maroon-600 bg-maroon-50",
    totalOrders: "text-blue-600 bg-[#0063D00D]/5",
    totalCategories: "text-[#753CBF] bg-[#753CBF0D]/5",
    totalRevenue: "text-emerald-600 bg-[#0089610D]/5",
  };
  const CUSTOM_STYLE = STYLES[name];

  const ICONS: Record<keyof TStatisticsObject, LucideIcon> = {
    totalProducts: Package,
    totalOrders: ReceiptText,
    totalCategories: ClipboardList,
    totalRevenue: CircleDollarSign,
  };
  const CustomIcon = ICONS[name];

  return (
    <div
      className={cn(
        "flex flex-col justify-between gap-3 bg-maroon-50 p-4 rounded-3xl text-maroon-600",
        CUSTOM_STYLE
      )}
    >
      {/* lucide/package */}
      <CustomIcon className="size-7" strokeWidth={2.08} />
      {/* Text */}
      <div
        className={cn(
          locale === "ar" ? "font-tajawal" : "font-inter",
          "font-semibold text-2xl leading-none text-inherit"
        )}
      >
        {name === "totalRevenue"
          ? `${format.number(value, {
              maximumFractionDigits: 0,
            })} ${locale === "ar" ? "ج.م" : "EGP"}`
          : format.number(value)}

        <p className="mt-1 font-medium text-zinc-800 text-base capitalize leading-none">
          {t(`${name.slice(5).toLowerCase()}`)}
        </p>
      </div>
    </div>
  );
}
